terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-2" # London - make sure this matches your current setup!
}

resource "aws_dynamodb_table" "visitor_counter" {
  name           = "visitor-counter"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# 1. The IAM Role (The "Identity" of the Lambda)
resource "aws_iam_role" "iam_for_lambda" {
  name = "visitor_counter_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

# 2. The Policy (What the Lambda is allowed to do)
resource "aws_iam_role_policy" "dynamodb_lambda_policy" {
  name = "dynamodb_lambda_policy"
  role = aws_iam_role.iam_for_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:UpdateItem",
          "dynamodb:GetItem",
          "dynamodb:PutItem"
        ]
        Effect   = "Allow"
        Resource = aws_dynamodb_table.visitor_counter.arn
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# 3. The Lambda Function itself
resource "aws_lambda_function" "visitor_counter" {
  filename      = "lambda_function.zip" # Terraform will look for this zip
  function_name = "visitor-counter-lambda"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"

  # This ensures the Lambda is only created AFTER the zip is ready
  depends_on = [data.archive_file.lambda_zip]
}

# 4. Automate the Zipping of your Python code
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda_function.py" # Look in the current folder
  output_path = "${path.module}/lambda_function.zip"
}

# 1. Create the API Gateway
resource "aws_api_gateway_rest_api" "visitor_api" {
  name        = "VisitorCounterAPI"
  description = "API for the Cloud Resume visitor counter"
}

# 2. Create the /counter resource
resource "aws_api_gateway_resource" "counter_resource" {
  rest_api_id = aws_api_gateway_rest_api.visitor_api.id
  parent_id   = aws_api_gateway_rest_api.visitor_api.root_resource_id
  path_part   = "counter"
}

# 3. Create the ANY method (Handles GET, POST, etc.)
resource "aws_api_gateway_method" "counter_method" {
  rest_api_id   = aws_api_gateway_rest_api.visitor_api.id
  resource_id   = aws_api_gateway_resource.counter_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

# 4. Integrate API Gateway with Lambda (The Proxy Handshake)
resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.visitor_api.id
  resource_id             = aws_api_gateway_resource.counter_resource.id
  http_method             = aws_api_gateway_method.counter_method.http_method
  integration_http_method = "POST" # API Gateway always uses POST to talk TO Lambda
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.visitor_counter.invoke_arn
}

# 5. Permission for API Gateway to call Lambda
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_counter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.visitor_api.execution_arn}/*/*"
}

# 6. Deploy the API
resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on  = [aws_api_gateway_integration.lambda_integration]
  rest_api_id = aws_api_gateway_rest_api.visitor_api.id
  stage_name  = "prod"
}

# 7. Output the URL so you don't have to look for it!
output "base_url" {
  value = "${aws_api_gateway_deployment.api_deployment.invoke_url}/counter"
}

# Create the S3 bucket
resource "aws_s3_bucket" "website_bucket" {
  bucket = "professional-portfolio-project-94183190aef" # Must be globally unique!
}

# Configure the bucket for static website hosting
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html" # React handles its own routing
  }
}

# Set public access block (to allow public reading)
resource "aws_s3_bucket_public_access_block" "website_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}

# CloudFront-only policy
resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.website_bucket.id
  
  depends_on = [aws_s3_bucket_public_access_block.website_access]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipalReadOnly"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.website_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })
}

# Output the website URL so you can visit it
output "website_url" {
  value = aws_s3_bucket_website_configuration.website_config.website_endpoint
}

# Create an Origin Access Control (OAC) to let CloudFront talk to S3 securely
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "s3_oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# The CloudFront Distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = "S3Origin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https" # This forces HTTPS!
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Output the CloudFront URL
output "cloudfront_url" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}
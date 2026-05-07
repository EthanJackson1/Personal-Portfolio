# Cloud Resume Challenge - Setup Instructions

This portfolio demonstrates the **Cloud Resume Challenge** architecture with all the recommended features to stand out to hiring managers.

## 🎯 What's Included

### ✅ Core Features
- **Live Visitor Counter**: Real-time visitor tracking using AWS Lambda + DynamoDB
- **Architecture Diagram**: Visual representation of the cloud infrastructure
- **Tech Stack Display**: Icons showing all technologies used
- **GitHub Source Link**: Direct link to your Terraform infrastructure code

### 🌟 Stand-Out Features
- **Cost Dashboard**: Displays monthly AWS costs (Free Tier optimized)
- **Security Headers**: Shows enterprise-grade security implementation
- **Dark Mode Design**: Professional, eye-friendly interface
- **Responsive Layout**: Works perfectly on all devices

## 🔧 Backend Setup (Required)

This is a **frontend-only** React application. You need to set up the AWS backend separately:

### Step 1: AWS Infrastructure

Create the following AWS resources (preferably with Terraform):

1. **DynamoDB Table**
   - Table name: `visitor-counter`
   - Partition key: `id` (String)
   - Initial item: `{ "id": "visitors", "count": 0 }`

2. **Lambda Function**
   ```python
   import json
   import boto3
   
   dynamodb = boto3.resource('dynamodb')
   table = dynamodb.Table('visitor-counter')
   
   def lambda_handler(event, context):
       response = table.update_item(
           Key={'id': 'visitors'},
           UpdateExpression='ADD #count :inc',
           ExpressionAttributeNames={'#count': 'count'},
           ExpressionAttributeValues={':inc': 1},
           ReturnValues='UPDATED_NEW'
       )
       
       return {
           'statusCode': 200,
           'headers': {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json'
           },
           'body': json.dumps({'count': int(response['Attributes']['count'])})
       }
   ```

3. **API Gateway**
   - Type: REST API
   - Method: POST
   - Integration: Lambda Function
   - Enable CORS

4. **S3 + CloudFront**
   - S3 bucket for static hosting
   - CloudFront distribution for CDN
   - SSL certificate (ACM)

5. **CloudFront Function (Optional - for Security Headers)**
   ```javascript
   function handler(event) {
       var response = event.response;
       var headers = response.headers;
       
       headers['strict-transport-security'] = { value: 'max-age=31536000; includeSubdomains'};
       headers['x-content-type-options'] = { value: 'nosniff'};
       headers['x-frame-options'] = { value: 'DENY'};
       headers['x-xss-protection'] = { value: '1; mode=block'};
       headers['content-security-policy'] = { value: "default-src 'self'"};
       
       return response;
   }
   ```

### Step 2: Connect Frontend to Backend

1. Open `src/app/components/VisitorCounter.tsx`
2. Replace `API_ENDPOINT` with your actual API Gateway URL:
   ```typescript
   const API_ENDPOINT = 'https://your-actual-id.execute-api.us-east-1.amazonaws.com/prod/counter';
   ```

### Step 3: Add Your Architecture Diagram

1. Create a diagram using [Lucidchart](https://www.lucidchart.com/), [Excalidraw](https://excalidraw.com/), or [draw.io](https://draw.io)
2. Include: S3, CloudFront, API Gateway, Lambda, DynamoDB, and GitHub Actions
3. Save as PNG and add to your project
4. Update `src/app/components/ArchitectureDiagram.tsx` with the image path

### Step 4: Update Your Information

Replace placeholder content in `src/app/App.tsx`:
- Your name
- Your bio/description
- GitHub repository URL
- Contact email
- LinkedIn/GitHub profile URLs
- Projects list
- Skills list

## 🚀 Deployment

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'dist'
      
      - name: Invalidate CloudFront
        uses: chetan/invalidate-cloudfront-action@v2
        env:
          DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
          PATHS: '/*'
          AWS_REGION: 'us-east-1'
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 📊 Monitoring Costs

Your architecture should cost **$0/month** if staying within AWS Free Tier:

- S3: First 5GB free
- CloudFront: 1TB data transfer free
- Lambda: 1M requests/month free
- DynamoDB: 25GB storage free
- API Gateway: 1M calls/month free

Set up AWS Budgets to alert if costs exceed $1.

## 🔒 Security Best Practices

- ✅ Enable HTTPS only
- ✅ Implement security headers via CloudFront Functions
- ✅ Use IAM roles with least privilege
- ✅ Enable CloudTrail for audit logging
- ✅ Regularly update dependencies
- ✅ Never commit AWS credentials to Git

## 📚 Resources

- [Cloud Resume Challenge](https://cloudresumechallenge.dev/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Security Headers Best Practices](https://owasp.org/www-project-secure-headers/)

## 🎓 What This Demonstrates

This project shows hiring managers that you understand:

1. **Cloud Architecture**: Serverless, scalable AWS infrastructure
2. **Infrastructure as Code**: Terraform for reproducible deployments
3. **CI/CD**: Automated deployments with GitHub Actions
4. **Cost Optimization**: Free Tier architecture design
5. **Security**: Enterprise-grade security headers
6. **Full-Stack Development**: Frontend + Backend + Infrastructure

---

**Good luck with your Cloud Resume Challenge! 🚀**

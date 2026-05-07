# Cloud-Native Serverless Portfolio & Visitor Counter

## Overview
A high-performance, professional portfolio website built with a modern **Serverless Architecture** on AWS. This project demonstrates the implementation of **Infrastructure as Code (IaC)**, **CI/CD automation**, and global content delivery, ensuring scalability, security, and cost-efficiency.

---

## Architecture
The project utilizes a decoupled frontend and backend architecture, managed entirely via **Terraform**.

- **Frontend:** React (Vite) hosted on **Amazon S3**, delivered globally via **AWS CloudFront** with **HTTPS (SSL/TLS)**.
- **Backend:** **AWS API Gateway** triggering an **AWS Lambda** function (Python).
- **Database:** **Amazon DynamoDB** for persistent visitor count tracking.
- **Security:** **Origin Access Control (OAC)** to secure S3, IAM roles for least-privilege access, and CORS management.
- **Automation:** **GitHub Actions** for automated build, test, and deployment (CI/CD).

[Image of AWS Serverless Web Application Architecture Diagram]

---

## Tech Stack
| Category | Tools |
| :--- | :--- |
| **Cloud Provider** | AWS (S3, CloudFront, Lambda, DynamoDB, API Gateway) |
| **Infrastructure** | Terraform (HCL) |
| **CI/CD** | GitHub Actions (YAML) |
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Python (Boto3) |

---

## Key Strengths & Implementation Details

### 1. **Infrastructure as Code (IaC)**
Unlike manual configuration, the entire environment is defined in **Terraform**. This ensures that the infrastructure is version-controlled, reproducible, and can be destroyed or recreated in minutes with zero manual intervention.

### 2. **Global Performance & Security**
By utilizing **AWS CloudFront**, the site is cached at edge locations worldwide, drastically reducing latency. Secure communication is enforced via **HTTPS**, and the S3 bucket is locked down using **Origin Access Control (OAC)**, meaning the files are only accessible via the CDN.

### 3. **DevOps Excellence**
The project features a full **CI/CD pipeline**. Every push to the `main` branch triggers a GitHub Action that:
1. Installs dependencies.
2. Builds the React production bundle.
3. Synchronizes the build artifacts to S3.
4. (Optional) Invalidates the CloudFront cache to ensure immediate global updates.

### 4. **Cost-Effective Scalability**
Built on a 100% **Serverless** model, the architecture follows a "pay-as-you-go" pricing structure. It stays within the **AWS Free Tier** for low traffic but can seamlessly scale to handle millions of requests without manual scaling.

---

## Future Roadmap
- [ ] Implement a custom domain name via Route 53.
- [ ] Add unit testing for the Lambda function.
- [ ] Transition Terraform state to a Remote Backend (S3 + DynamoDB locking).

---

## Contact & Portfolio
**Developed by Ethan Jackson**
- **Live Site:** https://d1koe97wkxxi4t.cloudfront.net
- **LinkedIn:** https://linkedin.com/in/ethan-jackson03
- **GitHub:** https://github.com/EthanJackson1

---
*This project was completed to demonstrate proficiency in AWS, DevOps, and Full-Stack development.*

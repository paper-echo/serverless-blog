# Deployment Guide

This guide explains how to deploy the React blog to AWS S3 + CloudFront using Terraform.

## Prerequisites

1. **AWS CLI** installed and configured with credentials
2. **Terraform** (>= 1.0) installed
3. **Node.js** and npm installed
4. **Domain configured in Route53**: `paperecho.com` must be hosted in Route53 (the parent domain)

## Setup

1. **Configure Terraform variables**:
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars if needed (defaults should work)
   ```

2. **Ensure your domain is in Route53**:
   - The parent domain `paperecho.com` must be hosted in Route53
   - Terraform will look up the hosted zone automatically and create the `blog` subdomain

## Deployment

### First-time Deployment

1. **Initialize Terraform**:
   ```bash
   cd terraform
   terraform init
   ```

2. **Review the plan**:
   ```bash
   terraform plan
   ```

3. **Apply the infrastructure**:
   ```bash
   terraform apply
   ```
   
   This will create:
   - S3 bucket for static website hosting
   - CloudFront distribution
   - ACM certificate for SSL/TLS
   - Route53 record for blog.paperecho.com subdomain
   - Origin Access Identity for secure S3 access

4. **Build and deploy the React app**:
   ```bash
   cd ../web
   npm install
   npm run build
   ```

5. **Sync files to S3**:
   ```bash
   # Get the bucket name from Terraform output
   BUCKET_NAME=$(cd ../terraform && terraform output -raw bucket_name)
   aws s3 sync dist/ s3://$BUCKET_NAME/ --delete
   ```

6. **Invalidate CloudFront cache**:
   ```bash
   # Get the CloudFront distribution ID
   CLOUDFRONT_ID=$(cd ../terraform && terraform output -raw cloudfront_distribution_id)
   aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
   ```

### Using the Deployment Script

Alternatively, you can use the provided deployment script:

```bash
./deploy.sh
```

This script will:
1. Build the React app
2. Initialize/apply Terraform
3. Sync files to S3
4. Invalidate CloudFront cache

## Updating the Website

After making changes to the React app:

1. **Build the app**:
   ```bash
   cd web
   npm run build
   ```

2. **Deploy to S3**:
   ```bash
   BUCKET_NAME=$(cd terraform && terraform output -raw bucket_name)
   aws s3 sync web/dist/ s3://$BUCKET_NAME/ --delete
   ```

3. **Invalidate CloudFront cache**:
   ```bash
   CLOUDFRONT_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)
   aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
   ```

Or simply run:
```bash
./deploy.sh
```

## Infrastructure Details

### S3 Bucket
- **Name**: `blog.paperecho.com` (configurable via `bucket_name` variable)
- **Versioning**: Enabled
- **Encryption**: AES256
- **Public Access**: Blocked (accessed only via CloudFront OAI)

### CloudFront Distribution
- **Domain**: `blog.paperecho.com`
- **SSL/TLS**: Managed by ACM certificate
- **Caching**: Optimized for static assets (JS/CSS cached for 1 year)
- **SPA Support**: 404/403 errors redirect to `index.html` for client-side routing

### Route53
- **A Record**: `blog.paperecho.com` → CloudFront

## Troubleshooting

### Certificate Validation
If certificate validation fails:
1. Check that DNS validation records were created in Route53
2. Wait a few minutes for DNS propagation
3. Re-run `terraform apply` if needed

### CloudFront Not Updating
After deploying new files:
1. Ensure you've invalidated the CloudFront cache
2. Wait 5-15 minutes for invalidation to complete
3. Clear your browser cache

### Domain Not Resolving
1. Verify Route53 hosted zone exists for `paperecho.com` (parent domain)
2. Check that A record for `blog.paperecho.com` was created correctly
3. Wait for DNS propagation (can take up to 48 hours, usually much faster)

## Cleanup

To destroy all infrastructure:

```bash
cd terraform
terraform destroy
```

**Warning**: This will delete all resources including the S3 bucket and all files.

## Cost Estimation

Approximate monthly costs:
- **S3**: ~$0.023 per GB stored + $0.005 per 1,000 requests
- **CloudFront**: ~$0.085 per GB data transfer (first 10TB)
- **Route53**: $0.50 per hosted zone
- **ACM**: Free

For a typical blog with moderate traffic, expect ~$1-5/month.


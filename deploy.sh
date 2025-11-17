#!/bin/bash

set -e

echo "Building React app..."
cd web
npm install
npm run build

echo "Deploying to S3..."
cd ../terraform
terraform init
terraform plan
terraform apply -auto-approve

BUCKET_NAME=$(terraform output -raw bucket_name)
echo "Syncing files to S3 bucket: $BUCKET_NAME"
aws s3 sync ../web/dist/ s3://$BUCKET_NAME/ --delete

CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"

echo "Deployment complete!"
echo "Website URL: $(terraform output -raw website_url)"


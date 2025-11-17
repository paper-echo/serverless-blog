variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = "blog.paperecho.com"
}

variable "bucket_name" {
  description = "Name of the S3 bucket (must be globally unique)"
  type        = string
  default     = "blog.paperecho.com"
}

variable "parent_domain" {
  description = "Parent domain for Route53 zone lookup"
  type        = string
  default     = "paperecho.com"
}


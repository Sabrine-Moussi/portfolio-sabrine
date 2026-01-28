variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "ssh_key_name" {
  description = "Name of the AWS EC2 Key Pair for SSH access"
  type        = string
}


# Serverless Blog

A modern, beautiful blog application built with React.js and deployed on AWS using a serverless architecture. The blog is accessible at [blog.paperecho.com](https://blog.paperecho.com) and features a clean, minimal design inspired by modern blog platforms.

## Features

- 🎨 Modern, minimal design with clean typography
- 📱 Fully responsive and mobile-friendly layout
- 🚀 Lightning-fast performance with CloudFront CDN
- 📝 Easy-to-manage blog posts with markdown-style content
- 🔗 Client-side routing with React Router
- 🖼️ Image support in blog posts
- ☁️ Serverless architecture on AWS
- 🔒 Secure hosting with SSL/TLS encryption
- 📊 Cost-effective static hosting solution

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
cd web
npm run build
```

The built files will be in the `web/dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Architecture

This blog is built using a serverless architecture on AWS:

```
┌─────────────┐
│   Users     │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────┐
│   CloudFront    │  ← CDN for global content delivery
│   Distribution  │  ← SSL/TLS termination
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   S3 Bucket      │  ← Static website hosting
│   (blog.paperecho.com) │  ← Origin Access Identity (private)
└─────────────────┘
       │
       ▼
┌─────────────────┐
│   Route53       │  ← DNS management
│   (blog.paperecho.com) │  ← Domain routing
└─────────────────┘
```

### Infrastructure Components

- **AWS S3**: Stores static website files (HTML, CSS, JS, images)
- **AWS CloudFront**: Global CDN for fast content delivery
  - SSL/TLS certificate via ACM
  - Optimized caching for static assets
  - SPA routing support (404/403 → index.html)
- **AWS Route53**: DNS management for `blog.paperecho.com`
- **AWS ACM**: SSL/TLS certificate management
- **Origin Access Identity**: Secure S3 access (bucket is private)

### Benefits

- **Scalability**: Automatically handles traffic spikes
- **Performance**: Global CDN ensures fast load times worldwide
- **Cost-Effective**: Pay only for what you use (~$1-5/month for typical blog)
- **Security**: Private S3 bucket with CloudFront-only access
- **Reliability**: AWS's 99.99% uptime SLA

## Project Structure

```
serverless-blog/
├── web/                      # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── BlogList.jsx      # Blog post listing page
│   │   │   ├── BlogPost.jsx      # Individual blog post page
│   │   │   ├── Header.jsx        # Navigation header
│   │   │   └── Layout.jsx        # Main layout wrapper
│   │   ├── data/
│   │   │   └── blogPosts.js      # Blog posts data
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── main.jsx              # Application entry point
│   │   └── index.css             # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── terraform/                # Infrastructure as Code
│   ├── main.tf               # Main Terraform configuration
│   ├── variables.tf          # Variable definitions
│   ├── outputs.tf            # Output values
│   └── terraform.tfvars.example
├── deploy.sh                 # Automated deployment script
├── DEPLOYMENT.md             # Detailed deployment guide
└── README.md                 # This file
```

## Deployment

This project uses **Terraform** for Infrastructure as Code (IaC) to deploy to AWS. The deployment process is fully automated and creates all necessary AWS resources.

### Prerequisites

- AWS CLI installed and configured with credentials
- Terraform (>= 1.0) installed
- Node.js (v16+) and npm
- Domain `paperecho.com` hosted in Route53

### Quick Deploy

```bash
./deploy.sh
```

This script will:
1. Build the React application
2. Initialize and apply Terraform configuration
3. Sync built files to S3
4. Invalidate CloudFront cache

### Manual Deployment

1. **Build the application**:
   ```bash
   cd web
   npm install
   npm run build
   ```

2. **Deploy infrastructure**:
   ```bash
   cd ../terraform
   terraform init
   terraform plan
   terraform apply
   ```

3. **Upload files to S3**:
   ```bash
   BUCKET_NAME=$(terraform output -raw bucket_name)
   aws s3 sync ../web/dist/ s3://$BUCKET_NAME/ --delete
   ```

4. **Invalidate CloudFront cache**:
   ```bash
   CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)
   aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
   ```

### What Gets Deployed

- **S3 Bucket**: `blog.paperecho.com` (private, versioned, encrypted)
- **CloudFront Distribution**: Global CDN with SSL/TLS
- **Route53 Record**: A record for `blog.paperecho.com`
- **ACM Certificate**: SSL/TLS certificate for the domain
- **Origin Access Identity**: Secure access to S3 bucket

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Adding New Blog Posts

Edit `web/src/data/blogPosts.js` and add new post objects with the following structure:

```javascript
{
  id: 5,
  title: "Your Post Title",
  author: "Author Name",
  date: "2024-02-15",
  excerpt: "A brief description of your post",
  content: `# Your Post Title

Your post content here. You can use markdown-style formatting:

## Headings

- Bullet points
- More items

**Bold text** and regular text.

![Image Alt Text](https://example.com/image.jpg)
`,
  category: "Category Name",
  readTime: "5 min read"
}
```

### Content Formatting

The blog supports markdown-style formatting:
- Headings: `# H1`, `## H2`, `### H3`
- Lists: `- Item`
- Bold: `**text**`
- Images: `![alt text](image-url)`

After adding posts, rebuild and redeploy:
```bash
cd web
npm run build
cd ../terraform
BUCKET_NAME=$(terraform output -raw bucket_name)
aws s3 sync ../web/dist/ s3://$BUCKET_NAME/ --delete
```

## Technologies Used

### Frontend
- **React 18**: Modern UI library
- **React Router DOM**: Client-side routing
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with CSS variables

### Infrastructure
- **Terraform**: Infrastructure as Code
- **AWS S3**: Static website hosting
- **AWS CloudFront**: Content delivery network
- **AWS Route53**: DNS management
- **AWS ACM**: SSL/TLS certificate management

## Development

### Local Development

```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:5173` to see the blog locally.

### Building for Production

```bash
cd web
npm run build
```

The production build will be in `web/dist/`.

## Cost Estimation

Approximate monthly AWS costs for this blog:
- **S3 Storage**: ~$0.023/GB (typically < $0.10)
- **CloudFront**: ~$0.085/GB data transfer (first 10TB)
- **Route53**: $0.50 per hosted zone
- **ACM**: Free

**Total**: Typically $1-5/month for a blog with moderate traffic.

## License

MIT
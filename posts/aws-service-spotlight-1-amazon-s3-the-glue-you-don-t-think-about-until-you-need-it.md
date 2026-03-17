---
title: AWS Service Spotlight #1: Amazon S3 — The Glue You Don't Think About Until You Need It
description: Welcome to my **AWS Service Spotlight** series, where I break down AWS services, how they work, when to use them, and how they fit into real-world DevOps systems.

This week we're starting with one of AWS's oldest and most underrated workhorses — **Amazon S3**. Not because it's flashy, but because it saved me from a genuinely frustrating situation this week. More on that in a bit.
author: Durrell Gemuh
publishDate: 2026-03-17
category: DevOps
featuredImage: 
tags:
  []
---

Welcome to my **AWS Service Spotlight** series, where I break down AWS services, how they work, when to use them, and how they fit into real-world DevOps systems.

This week we're starting with one of AWS's oldest and most underrated workhorses — **Amazon S3**. Not because it's flashy, but because it saved me from a genuinely frustrating situation this week. More on that in a bit.

---

## What is Amazon S3?

**Simple Storage Service** — that's what S3 stands for. And at its core, that's exactly what it is: a place to store files (called *objects*) in the cloud, organized inside containers called *buckets*.

Think of it like a USB drive that lives in the cloud, never loses data, scales infinitely, and can be accessed by anything with the right permissions.

On a slightly more technical level: S3 is an **object storage service**. Unlike block storage (like an EBS volume attached to your EC2) or file storage (like EFS), S3 stores data as discrete objects — each with its own key, metadata, and access rules. It's not mounted to a server. You interact with it via API, CLI, or SDK.

---

## Why Use It?

S3 solves a deceptively simple problem: **how do you store and share files reliably, at any scale, without managing infrastructure?**

You'd reach for S3 when you need to:

- Share files between systems that can't talk to each other directly
- Store artifacts, logs, or backups that need to outlive the machine that created them
- Decouple storage from compute so your EC2 instances stay stateless
- Create a single source of truth for configuration files, scripts, or binaries

**Who should care?** DevOps engineers, backend developers, platform teams — anyone who touches infrastructure. S3 shows up everywhere once you start looking.

---

## How I Used It This Week

This one came from a real headache.

I was working with two EC2 instances — neither of them internet-facing. I needed to get a service running on a new instance that had been created from an AMI. The problem? The service binaries weren't baked into the AMI, and the original engineer who set this up had left without documenting where the installation files lived or sharing the EC2 key pair. No key pair access, no internet access, no obvious way to pull the files across.

I could have gone down a rabbit hole — trying to recover access, hunting through old infrastructure, escalating to get the key pair — but S3 offered a much cleaner path.

Here's what I did:

1. **On the source EC2**, I used the AWS CLI to upload the installation files directly to an S3 bucket. Since the instance had an IAM role attached with S3 write permissions, no credentials were needed — it just worked.

```bash
aws s3 cp /path/to/installation/files s3://my-internal-bucket/service-installer/ --recursive
```

2. **On the target EC2**, I pulled the files down from the same bucket using the CLI, again via the attached IAM role.

```bash
aws s3 cp s3://my-internal-bucket/service-installer/ /opt/service/ --recursive
```

3. Ran the installer, service came up, problem solved.

No SSH tunneling. No SCP across instances. No VPN gymnastics. S3 acted as a **neutral transfer point** between two isolated machines — and because neither instance needed internet access to reach S3 (VPC endpoints handle that), the network boundaries were never a concern.

The extra step I took: I left the files in the bucket. If another engineer hits this same wall tomorrow, the files are there, documented, and accessible. That's the kind of thing that saves hours.

---

## Other Real-World Use Cases

S3 is one of those services that shows up in almost every architecture. Here's where you'll actually encounter it:

- **CI/CD pipelines** — Storing build artifacts between pipeline stages (CodeBuild → S3 → CodeDeploy is a classic pattern)
- **Kubernetes** — Storing Helm charts, kubeconfig backups, or persistent data exports from pods before teardown
- **Terraform / IaC** — Remote state backend for `terraform.tfstate` files, shared across teams
- **Monitoring & logs** — CloudWatch can ship logs to S3 for long-term retention and analysis
- **AMI bootstrapping** — Storing userdata scripts, config files, or binaries that EC2 instances pull on first boot
- **Disaster recovery** — Backing up RDS snapshots, EBS snapshots, and configuration exports
- **Static website hosting** — Frontend deployments without a server (paired with CloudFront)
- **Data pipelines** — Landing zone for raw data before it hits Glue, Athena, or Redshift

---

## Key Features

- **Virtually unlimited storage** — No capacity planning needed
- **11 nines of durability (99.999999999%)** — AWS redundantly stores your objects across multiple AZs
- **Storage classes** — S3 Standard, Infrequent Access, Glacier for cost optimization based on access frequency
- **Versioning** — Keep every version of every object; roll back anytime
- **Lifecycle policies** — Automatically transition or delete objects based on age
- **Bucket policies & IAM** — Fine-grained access control at the bucket or object level
- **Event notifications** — Trigger Lambda, SQS, or SNS when objects are created or deleted
- **Encryption** — At rest (SSE-S3, SSE-KMS) and in transit (HTTPS enforced)
- **VPC Endpoints** — Access S3 privately without internet traffic leaving your VPC

---

## How It Works (High-Level)

When you upload a file to S3, you're putting an **object** into a **bucket**. A bucket is a globally unique namespace tied to a specific AWS region. The object gets a **key** (essentially its path/filename) and is stored redundantly across multiple availability zones within that region.

```
Your EC2 / App
     │
     ▼ (HTTPS via VPC Endpoint or Internet Gateway)
  S3 Bucket  ──────────────────────────────────────
  └── /service-installer/
       ├── service-v2.tar.gz
       └── install.sh
```

Access is controlled by a combination of **IAM roles** (identity-based) and **bucket policies** (resource-based). In most internal setups, you attach an IAM role to your EC2 and grant it `s3:GetObject` or `s3:PutObject` on specific buckets — no hard-coded credentials needed.

---

## Integration with Other AWS Services

S3 doesn't live in isolation. It's one of the most integrated services in the entire AWS ecosystem:

| Service | How It Connects |
|---|---|
| **EC2** | Instances pull configs, scripts, and binaries via CLI or SDK using IAM roles |
| **IAM** | Roles and policies control who (and what) can read/write to buckets |
| **CloudWatch** | Logs exported to S3 for archival; S3 request metrics visible in CloudWatch |
| **Lambda** | S3 events trigger Lambda functions (e.g. process a file when it's uploaded) |
| **EKS** | Pods use S3 for artifact storage, backups, or as a data source via IRSA |
| **CodePipeline / CodeBuild** | S3 is the default artifact store between pipeline stages |
| **CloudFront** | S3 as an origin for CDN-cached static content delivery |
| **Terraform** | S3 backend stores remote state; DynamoDB handles state locking |

---

## Alternatives

**Within AWS:**
- **EFS (Elastic File System)** — When you need a shared, mountable file system across multiple EC2s simultaneously
- **EBS (Elastic Block Store)** — When you need block-level storage attached to a single instance
- **FSx** — For Windows-native or high-performance file workloads

**Outside AWS:**
- **Google Cloud Storage** — GCP's equivalent, near-identical feature set
- **Azure Blob Storage** — Microsoft's object storage offering
- **MinIO** — Open-source, S3-compatible object storage you can self-host on-prem or in Kubernetes
- **Cloudflare R2** — S3-compatible with no egress fees; worth considering for high-download workloads

---

## When NOT to Use It

S3 is great, but it's not always the right tool:

- **You need a mounted file system** — S3 is not a file system. If your app expects to `open()` files from a path like `/data/`, use EFS or EBS instead. S3 FUSE mounts exist but add complexity and latency.
- **You need low-latency, frequent random reads/writes** — S3 has per-request latency. For a database or high-throughput app, use EBS or a proper database.
- **Small files at very high frequency** — Thousands of tiny PUT/GET requests per second can get costly. Consider buffering or batching.
- **You need strict file locking** — S3 has no native file locking mechanism. Two processes writing the same key simultaneously will have one overwrite the other.

## Final Thoughts
S3 is one of those services that engineers often take for granted — until they're in a situation where nothing else will do. This week it got me out of a real bind: no key pair, no internet access, no documentation left behind by the previous engineer. S3 became the neutral ground that two isolated instances could both reach, and it took about ten minutes to sort out.

The bigger lesson? Always leave things better than you found them. The files are in the bucket now. The next engineer won't have this problem.

*Have you used S3 in a creative or unconventional way? Drop it in the comments — I'd love to hear it.*
/*
  Custom JS moved from inline <script> blocks in index.html.
  Keeps all page-specific interactions in a single place.
*/

(function () {
  "use strict";

  // ------------------ Expertise slider ------------------
  var _expIdx = 0;
  var _expTotal = 2;
  var _expLabels = [
    "Cloud & Infrastructure",
    "DevOps Practice & SRE"
  ];
  var _expTimer = null;

  function expertiseRender() {
    var track = document.getElementById("expertiseTrack");
    if (!track) return;
    track.style.transform = "translateX(-" + (_expIdx * 100) + "%)";
    document.querySelectorAll(".expertise-dot").forEach(function (d, i) {
      d.classList.toggle("active", i === _expIdx);
    });
    var label = document.getElementById("expertiseLabel");
    if (label) label.textContent = _expLabels[_expIdx];
    var counter = document.getElementById("expertiseCounter");
    if (counter) counter.textContent = (_expIdx + 1) + " / " + _expTotal;
  }

  function resetExpTimer() {
    clearInterval(_expTimer);
    _expTimer = setInterval(function () {
      expertiseSlide(1);
    }, 10000);
  }

  window.expertiseSlide = function (dir) {
    _expIdx = (_expIdx + dir + _expTotal) % _expTotal;
    expertiseRender();
    resetExpTimer();
  };

  window.expertiseGoTo = function (i) {
    _expIdx = i;
    expertiseRender();
    resetExpTimer();
  };

  document.addEventListener("DOMContentLoaded", function () {
    expertiseRender();
    resetExpTimer();
  });

  // ------------------ Experience accordion ------------------
  window.toggleExp = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var isOpen = el.classList.contains("open");
    document.querySelectorAll(".exp-item.open").forEach(function (e) {
      e.classList.remove("open");
    });
    if (!isOpen) el.classList.add("open");
  };

  // ------------------ Service modal ------------------
  window.SERVICES = {
    s1: {
      icon: "cloud",
      title: "Cloud Infrastructure Engineering",
      tagline: "Scalable, resilient cloud architecture on AWS and GCP — built to last.",
      body: `
        <p>With 4+ years designing and operating cloud infrastructure across AWS and GCP, I bring a practical, production-first approach to every engagement.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Led migration of 3,000+ websites to AWS and GCP, achieving 70% cost reduction and 95% improvement in scalability at BlueWindow Ltd</li>
          <li>Designed multi-region, high-availability architectures capable of handling peak traffic without degradation</li>
          <li>Provisioned and maintained EC2, RDS, EKS, VPCs, load balancers, and S3-based data pipelines</li>
          <li>Built VPC endpoint configurations, private subnet routing, and NAT gateway setups for secure, internet-isolated workloads</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Architect cloud environments from scratch or audit and improve existing ones</li>
          <li>Migrate on-premise workloads to AWS/GCP with minimal downtime</li>
          <li>Define networking, IAM, and security baselines that scale with your org</li>
          <li>Document infrastructure so your team can own it long after I'm done</li>
        </ul>
        <p><strong>Tools:</strong> AWS (EC2, EKS, RDS, S3, VPC, IAM, CloudFront), GCP (GKE, Cloud Run, GCS), Terraform, Ansible</p>`
    },
    s2: {
      icon: "repeat",
      title: "CI/CD Pipeline Automation",
      tagline: "Cut deployment times from hours to minutes — reliably, every time.",
      body: `
        <p>Deployment pipelines are the heartbeat of a healthy engineering team. I design pipelines that are fast, observable, and resilient to failure.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Reduced deployment time by 95% through optimised CI/CD pipelines at BlueWindow Ltd</li>
          <li>Revamped build and deployment workflows at Data Service Group, eliminating 85% of manual tasks</li>
          <li>Built internal tooling enabling 170+ developers to deploy VMs in 60 seconds (down from 16+ minutes)</li>
          <li>Integrated dependency scanning (Dependency-Track), vulnerability checks, and automated compliance gates into pipelines</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Design or overhaul your pipeline from build to production deploy</li>
          <li>Add automated testing, security scanning, and approval gates</li>
          <li>Standardise deployment across multiple services and environments</li>
          <li>Reduce time-to-market and eliminate deployment-day anxiety</li>
        </ul>
        <p><strong>Tools:</strong> Jenkins, GitHub Actions, GitLab CI, Azure DevOps, ArgoCD, Docker, Helm</p>`
    },
    s3: {
      icon: "layers",
      title: "Kubernetes & Container Platforms",
      tagline: "Production-grade Kubernetes — from cluster setup to day-2 operations.",
      body: `
        <p>Kubernetes is powerful but complex. I help teams run it confidently — whether you're just adopting containers or managing multi-cluster environments.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Managed multiple Kubernetes environments using ArgoCD at a private client, handling deployments, troubleshooting, and continuous cluster improvement</li>
          <li>Implemented a Kubernetes health check system at ZOTECH, reducing mean time to repair from 15 days to 11 hours</li>
          <li>Engineered Terraform tooling to automate cluster creation, cutting setup time from 2 hours to 20 minutes</li>
          <li>Deployed HashiCorp Vault with Kubernetes for secrets management across namespaces</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Set up production EKS / GKE clusters with proper networking, RBAC, and observability from day one</li>
          <li>Implement GitOps workflows with ArgoCD or Flux</li>
          <li>Debug live cluster issues and improve reliability</li>
          <li>Train your team on Kubernetes best practices and day-2 operations</li>
        </ul>
        <p><strong>Tools:</strong> Kubernetes, Helm, ArgoCD, Flux, EKS, GKE, Docker, Istio, Karpenter</p>`
    },
    s4: {
      icon: "bar-chart-2",
      title: "Observability & Monitoring",
      tagline: "Make your systems tell you what they're doing — before users notice.",
      body: `
        <p>Observability is not optional in production. I build monitoring setups that give engineers the right signals at the right time.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Deployed CloudWatch agents and Datadog integrations to monitor VMs, containers, and cloud services — enabling proactive alerting and incident response</li>
          <li>Leveraged Azure DevOps Pipelines to deploy Datadog monitors, APM services, and observability agents on Kubernetes clusters</li>
          <li>Designed Grafana dashboards to monitor Kubernetes cluster health, resource utilisation, and performance metrics</li>
          <li>Implemented Cloudflare analytics and security monitoring, reducing incidents by 25% at BlueWindow Ltd</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Build a unified observability stack (metrics, logs, traces) for your infrastructure</li>
          <li>Create dashboards that surface the KPIs your on-call team actually needs</li>
          <li>Set up alerting with proper thresholds — not alert fatigue, but meaningful signals</li>
          <li>Integrate APM into your applications for end-to-end request tracing</li>
        </ul>
        <p><strong>Tools:</strong> Datadog, Prometheus, Grafana, CloudWatch, OpenTelemetry, PagerDuty</p>`
    },
    s5: {
      icon: "code",
      title: "Infrastructure as Code",
      tagline: "Treat your infrastructure like software — versioned, tested, repeatable.",
      body: `
        <p>Manual infrastructure is a liability. I help teams move to fully code-defined environments that are predictable, auditable, and disaster-recovery ready.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Used Terraform to provision AWS and GCP infrastructure including VPCs, EKS clusters, RDS databases, IAM roles, and S3 backends</li>
          <li>Managed Terraform remote state in S3 with DynamoDB locking for team collaboration</li>
          <li>Deployed Terraform scripts via Azure DevOps Pipelines for automated, policy-governed infrastructure changes</li>
          <li>Used Ansible for configuration management and post-provisioning setup across EC2 fleets</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Migrate click-ops infrastructure into Terraform modules your team can own</li>
          <li>Structure IaC repositories for multi-environment (dev/staging/prod) workflows</li>
          <li>Implement drift detection and policy-as-code (Sentinel, OPA)</li>
          <li>Set up Atlantis or Terraform Cloud for automated plan/apply in PRs</li>
        </ul>
        <p><strong>Tools:</strong> Terraform, Ansible, Pulumi, Terragrunt, AWS CDK</p>`
    },
    s6: {
      icon: "shield",
      title: "Cloud Security & Compliance",
      tagline: "Security that's baked in — not bolted on after the fact.",
      body: `
        <p>Security is part of every infrastructure decision I make. From IAM policies to WAF rules, I help teams build systems that are secure by default.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Resolved and remediated issues flagged by AWS Security Hub and AWS Trusted Advisor, enforcing security and reliability best practices</li>
          <li>Managed AWS IAM users, roles, and policies with role-based access control and company compliance standards at LILLUP</li>
          <li>Integrated DDoS protection, SSL/TLS encryption, and WAF via Cloudflare, reducing security incidents by 40%</li>
          <li>Implemented HashiCorp Vault with Kubernetes to secure secrets across namespaces with strict access policies</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Audit your AWS/GCP environment against CIS benchmarks and remediate findings</li>
          <li>Implement least-privilege IAM, RBAC, and network segmentation</li>
          <li>Set up Cloudflare WAF, Zero Trust, and DDoS protections</li>
          <li>Establish security scanning in your CI/CD pipeline (SAST, dependency checks, container scanning)</li>
        </ul>
        <p><strong>Tools:</strong> AWS Security Hub, IAM, Cloudflare WAF/Zero Trust, HashiCorp Vault, Trivy, Checkov</p>`
    },
    s7: {
      icon: "trending-down",
      title: "Cloud Cost Optimisation",
      tagline: "Spend less on cloud. Get more from what you have.",
      body: `
        <p>Cloud bills spiral fast without intentional governance. I've consistently delivered significant cost reductions without sacrificing reliability.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Reduced infrastructure costs by 70% during the 3,000-site migration at BlueWindow Ltd</li>
          <li>Cut quarterly AWS infrastructure costs by 63% through account and environment optimisation at Data Service Group</li>
          <li>Developed and executed cloud cost strategies reducing operational expenses by 30% while maintaining high availability at BlueWindow</li>
          <li>Right-sized EC2 instances, cleaned up unused resources, and implemented auto-scaling policies across client environments</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Audit your AWS/GCP spend and identify quick-win savings</li>
          <li>Implement auto-scaling, spot instances, and right-sizing recommendations</li>
          <li>Set up cost allocation tags, budgets, and anomaly alerts</li>
          <li>Build a FinOps practice so your team stays on top of spend going forward</li>
        </ul>
        <p><strong>Tools:</strong> AWS Cost Explorer, Infracost, Spot instances, Savings Plans, GCP Committed Use</p>`
    },
    s8: {
      icon: "database",
      title: "Secrets & Vault Management",
      tagline: "No more hardcoded credentials. No more secrets in .env files.",
      body: `
        <p>Credential sprawl is one of the most common security failures in cloud-native teams. I help organisations adopt proper secrets lifecycle management.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Deployed HashiCorp Vault integrated with Kubernetes to securely store secrets across namespaces with strict access policies</li>
          <li>Managed AWS Secrets Manager and Parameter Store for application secret injection at runtime</li>
          <li>Implemented IRSA (IAM Roles for Service Accounts) on EKS to eliminate static credentials from pods</li>
          <li>Rotated long-lived credentials and established secret rotation policies across multi-cloud environments</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Audit your current secrets posture — find and remove hardcoded credentials</li>
          <li>Deploy and configure HashiCorp Vault or AWS Secrets Manager</li>
          <li>Integrate secrets management into your CI/CD pipelines and Kubernetes workloads</li>
          <li>Set up automated secret rotation and least-privilege access policies</li>
        </ul>
        <p><strong>Tools:</strong> HashiCorp Vault, AWS Secrets Manager, AWS SSM Parameter Store, IRSA, External Secrets Operator</p>`
    },
    s9: {
      icon: "book-open",
      title: "DevOps Training & Mentorship",
      tagline: "Build the team, not just the infrastructure.",
      body: `
        <p>I&#39;ve trained hundreds of engineers through Liora, NextGen Playground, and direct mentorship — helping them go from beginner to production-ready.</p>
        <h6 class="fw-bold mt-4 mb-2">What I've Done</h6>
        <ul>
          <li>Lead live masterclasses at Liora covering GitOps, Prometheus & Grafana, Docker, Kubernetes, GitLab, and security — beginner to advanced</li>
          <li>Founded NextGen Playground — a training and community platform delivering hands-on DevOps labs, mentorship, and simulated internship experiences</li>
          <li>Provided one-on-one mentorship, career guidance, and project reviews to engineers transitioning into DevOps</li>
          <li>Guided students through real-world projects on infrastructure design, CI/CD pipelines, container orchestration, and monitoring</li>
        </ul>
        <h6 class="fw-bold mt-4 mb-2">How I Can Help Your Team</h6>
        <ul>
          <li>Run a custom DevOps workshop for your engineering team — half day to multi-week</li>
          <li>Upskill junior engineers on Kubernetes, Terraform, CI/CD, or observability</li>
          <li>Embed with your team during a major migration to transfer knowledge in real time</li>
          <li>Create internal documentation and runbooks as part of any engagement</li>
        </ul>
        <p><strong>Formats:</strong> Live workshops, async video, 1:1 mentorship, team bootcamps, embedded consulting</p>`
    }
  };

  window.openService = function (id) {
    var s = SERVICES[id];
    if (!s) return;
    var titleEl = document.getElementById("svc-title");
    var taglineEl = document.getElementById("svc-tagline");
    var bodyEl = document.getElementById("svc-body");
    var iconEl = document.getElementById("svc-icon");

    if (titleEl) titleEl.textContent = s.title;
    if (taglineEl) taglineEl.textContent = s.tagline;
    if (bodyEl) bodyEl.innerHTML = s.body;
    if (iconEl) {
      iconEl.innerHTML = '<i data-feather="' + s.icon + '" class="fea" style="width:24px;height:24px;"></i>';
    }

    var modal = document.getElementById("service-modal");
    var overlay = document.getElementById("service-modal-overlay");
    if (modal) modal.style.display = "block";
    if (overlay) overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    if (window.feather) feather.replace();
  };

  window.closeService = function () {
    var modal = document.getElementById("service-modal");
    var overlay = document.getElementById("service-modal-overlay");
    if (modal) modal.style.display = "none";
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeService();
  });

  // ------------------ Focus area modals ------------------
  var FOCUS = {
    f1: {
      icon: "award",
      label: "Community",
      title: "AWS Community Builders",
      body: `<p>I&#39;m an active member of the <strong>AWS Community Builders program</strong> (Cloud Operations track) — a global network of technical experts who share knowledge, create content, and help the wider community get more out of AWS.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">What This Means in Practice</h6>
<ul style="padding-left:1.25rem;">
  <li>Writing and publishing technical content on AWS cloud operations — real use cases, not theory</li>
  <li>Contributing to community discussions, answering questions, and helping engineers navigate AWS services</li>
  <li>Staying ahead of new AWS releases and sharing practical takeaways for DevOps teams</li>
  <li>Collaborating with AWS experts who review and improve the quality of content I share</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Get Involved</h6>
<p>If you&#39;re building on AWS and want a second pair of eyes on your architecture, or want to collaborate on technical content, I&#39;d love to connect.</p>`,
      ctas: [
        { label: "💬 Discuss AWS Architecture", href: "mailto:hello@durrellgemuh.com?subject=AWS Architecture Discussion", style: "btn-primary" },
        { label: "🔗 Connect on LinkedIn", href: "https://linkedin.com/in/durrello", style: "btn-outline-primary", target: "_blank" },
        { label: "📖 Read My Blog", href: "page-blog.html", style: "btn-outline-secondary" }
      ]
    },
    f2: {
      icon: "globe",
      label: "Platform",
      title: "NextGen Playground",
      body: `<p><strong>NextGen Playground</strong> is the tech education and community platform I founded in Cameroon — built to bridge the gap between learning DevOps in theory and practising it in the real world.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">What We&#39;re Building</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Structured DevOps programs</strong> covering Linux, Docker, Kubernetes, Terraform, CI/CD, and cloud platforms</li>
  <li><strong>Hands-on labs</strong> that mirror real production infrastructure — not toy examples</li>
  <li><strong>Simulated internship experiences</strong> where students work on real-world projects with guidance</li>
  <li><strong>Mentorship and career support</strong> for engineers transitioning into DevOps and cloud roles</li>
  <li><strong>A community</strong> of engineers learning together and helping each other grow</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">How You Can Get Involved</h6>
<p>Whether you&#39;re an engineer looking to join, a company wanting to sponsor, or an educator wanting to collaborate — there&#39;s a place for you here.</p>`,
      ctas: [
        { label: "🚀 Visit NextGen Playground", href: "http://nextgenplayground.org/", style: "btn-primary", target: "_blank" },
        { label: "🤝 Partner With Us", href: "mailto:hello@durrellgemuh.com?subject=NextGen Playground Partnership", style: "btn-outline-primary" },
        { label: "📱 WhatsApp Me", href: "https://wa.me/237671305865", style: "btn-success", target: "_blank", id: "wa-f2" }
      ]
    },
    f3: {
      icon: "users",
      label: "Mentorship",
      title: "DevOps Mentorship",
      body: `<p>I actively mentor engineers making the transition into DevOps and cloud engineering — from students to mid-level developers pivoting into infrastructure roles.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">What Mentorship Looks Like</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>1:1 sessions</strong> — structured calls to work through specific challenges, review your setup, or map out a learning path</li>
  <li><strong>CV and portfolio reviews</strong> — helping you present your skills to land DevOps roles</li>
  <li><strong>Project guidance</strong> — working through real infrastructure projects together so you learn by doing</li>
  <li><strong>Career roadmapping</strong> — honest advice on what to learn next, certifications worth pursuing, and how to grow your income as a DevOps engineer</li>
  <li><strong>Code and config reviews</strong> — Terraform, Dockerfiles, pipeline configs, Kubernetes manifests</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Who This Is For</h6>
<p>Developers, sysadmins, and students looking to break into DevOps. Engineers who feel stuck and want a clearer path forward. Anyone who learns better with guidance than alone.</p>`,
      ctas: [
        { label: "📅 Book a Mentorship Session", href: "mailto:hello@durrellgemuh.com?subject=Mentorship Session Request", style: "btn-primary" },
        { label: "📱 WhatsApp Me", href: "https://wa.me/237671305865", style: "btn-success", target: "_blank", id: "wa-f3" },
        { label: "🚀 Join NextGen Playground", href: "http://nextgenplayground.org/", style: "btn-outline-primary", target: "_blank" }
      ]
    },
    f4: {
      icon: "server",
      label: "Engineering",
      title: "Kubernetes Infrastructure Projects",
      body: `<p>Kubernetes is central to how modern infrastructure runs — and I&#39;m currently working on several K8s-focused projects ranging from cluster architecture to GitOps automation and operator development.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Active Focus Areas</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Multi-cluster management</strong> — designing patterns for running workloads across multiple clusters with unified observability</li>
  <li><strong>GitOps at scale</strong> — ArgoCD and Flux configurations for teams managing dozens of services</li>
  <li><strong>Cost-aware scheduling</strong> — Karpenter, spot instance strategies, and resource quota governance</li>
  <li><strong>Platform engineering</strong> — building internal developer platforms on top of Kubernetes to improve DX</li>
  <li><strong>Security hardening</strong> — Pod Security Standards, OPA/Gatekeeper policies, and network policies</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Looking to Collaborate?</h6>
<p>If you&#39;re building on Kubernetes and want an experienced engineer to review your setup, pair on a problem, or consult on architecture — let&#39;s talk.</p>`,
      ctas: [
        { label: "🔧 Discuss Your K8s Setup", href: "mailto:hello@durrellgemuh.com?subject=Kubernetes Consultation", style: "btn-primary" },
        { label: "📱 WhatsApp", href: "https://wa.me/237671305865", style: "btn-success", target: "_blank", id: "wa-f4" },
        { label: "💼 View My Projects", href: "#projects", style: "btn-outline-secondary" }
      ]
    },
    f5: {
      icon: "book-open",
      label: "Education",
      title: "DevOps Education",
      body: `<p>Beyond mentorship, I create structured educational content and training programs — both for my own community at NextGen Playground and as an instructor at Liora in France.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">What I&#39;m Creating</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Masterclass curricula</strong> covering Kubernetes, GitOps, Prometheus & Grafana, Docker, and security practices</li>
  <li><strong>Lab environments</strong> — hands-on exercises that mirror real production scenarios</li>
  <li><strong>Written guides and blog posts</strong> on cloud and DevOps topics (see my blog)</li>
  <li><strong>Team training programs</strong> for companies who want to upskill their engineering teams</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Bring Training to Your Team</h6>
<p>I deliver custom workshops — from half-day introductions to multi-week deep dives. Remote or in-person. Topics tailored to exactly where your team is and where they need to go.</p>`,
      ctas: [
        { label: "🎓 Request a Workshop", href: "mailto:hello@durrellgemuh.com?subject=Team Training Request", style: "btn-primary" },
        { label: "📱 WhatsApp", href: "https://wa.me/237671305865", style: "btn-success", target: "_blank", id: "wa-f5" },
        { label: "📖 Read My Blog", href: "page-blog.html", style: "btn-outline-secondary" }
      ]
    },
    f6: {
      icon: "mic",
      label: "Speaking",
      title: "Speaking & Tech Events",
      body: `<p>I&#39;m available to speak at conferences, meetups, company all-hands, and community events on topics across DevOps, cloud infrastructure, and engineering education.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Topics I Speak On</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Kubernetes in Production</strong> — lessons from running K8s at scale, common failure modes, and best practices</li>
  <li><strong>CI/CD Done Right</strong> — building pipelines that teams actually trust and use</li>
  <li><strong>Cloud Cost Control</strong> — practical strategies that have cut bills by 30–70% in real environments</li>
  <li><strong>DevOps for African Engineers</strong> — building world-class engineering skills and careers from Africa</li>
  <li><strong>The DevOps Mindset</strong> — culture, automation, and what it actually means to "do DevOps"</li>
  <li><strong>Breaking Into DevOps</strong> — career transition stories and practical advice for aspiring engineers</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Format &amp; Availability</h6>
<p>Remote or in-person. 20-minute lightning talks to 90-minute deep dives. English or French. I&#39;m based in Cameroon and available globally for virtual events and select in-person engagements.</p>`,
      ctas: [
        { label: "🎤 Invite Me to Speak", href: "mailto:hello@durrellgemuh.com?subject=Speaking Invitation", style: "btn-primary" },
        { label: "📱 WhatsApp", href: "https://wa.me/237671305865", style: "btn-success", target: "_blank", id: "wa-f6" },
        { label: "🔗 LinkedIn", href: "https://linkedin.com/in/durrello", style: "btn-outline-primary", target: "_blank" }
      ]
    }
  };

  window.openFocus = function (id) {
    var f = FOCUS[id];
    if (!f) return;
    document.getElementById("focus-label").textContent = f.label;
    document.getElementById("focus-title").textContent = f.title;
    document.getElementById("focus-body").innerHTML = f.body;
    document.getElementById("focus-icon").innerHTML = '<i data-feather="' + f.icon + '" style="width:24px;height:24px;"></i>';
    var ctaEl = document.getElementById("focus-ctas");
    ctaEl.innerHTML = f.ctas.map(function (c) {
      return '<a href="' + c.href + '"' +
        (c.target ? ' target="' + c.target + '"' : '') +
        (c.id ? ' id="' + c.id + '"' : '') +
        ' class="btn ' + c.style + ' rounded" style="font-size:0.875rem;">' + c.label + '</a>';
    }).join("");
    document.getElementById("focus-modal").style.display = "block";
    document.getElementById("focus-modal-overlay").style.display = "block";
    document.body.style.overflow = "hidden";
    if (window.feather) feather.replace();
  };

  window.closeFocus = function () {
    document.getElementById("focus-modal").style.display = "none";
    document.getElementById("focus-modal-overlay").style.display = "none";
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeFocus();
  });

  // ------------------ Current year placeholder ------------------
  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  // ------------------ Blog preview rendering ------------------
  function renderHomeBlog() {
    var posts = (window.BlogLoader && typeof window.BlogLoader.getFeaturedPosts === "function")
      ? BlogLoader.getFeaturedPosts(3)
      : [];
    var grid = document.getElementById("blog-preview-grid");
    var loading = document.getElementById("blog-preview-loading");
    if (!grid) return;

    if (posts.length === 0) {
      if (window.BlogLoader && BlogLoader.posts && BlogLoader.posts.length === 0) {
        setTimeout(renderHomeBlog, 150);
        return;
      }
      if (loading) {
        loading.innerHTML = '<p class="text-muted" style="font-size:0.88rem;">No posts yet — check back soon.</p>';
      }
      return;
    }

    if (loading) loading.style.display = "none";

    var catColors = {
      AWS: "#ff9500",
      GCP: "#4285f4",
      Kubernetes: "#326ce5",
      DevOps: "#0d6efd",
      "CI/CD": "#28a745",
      Terraform: "#7b42bc",
      Docker: "#0db7ed",
      Linux: "#f0c040",
      Security: "#dc3545",
      Observability: "#fd7e14"
    };

    grid.innerHTML = posts
      .map(function (post, idx) {
        var date = post.publishDate
          ? new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })
          : "";
        var cat = post.category || "DevOps";
        var catColor = catColors[cat] || "#0d6efd";
        var readTime = post.content
          ? Math.max(1, Math.ceil(post.content.split(" ").length / 200)) + " min read"
          : "5 min read";
        var isFirst = idx === 0;

        var imgHtml = post.featuredImage
          ? '<div class="blog-card__image ' + (isFirst ? 'blog-card__image--large' : '') + '">' +
              '<img src="' + post.featuredImage + '" alt="' + post.title + '" />' +
              '<span class="blog-card__label" style="background:' + catColor + ';">' + cat + '</span>' +
              '</div>'
          : '<div class="blog-card__placeholder ' + (isFirst ? 'blog-card__placeholder--large' : '') + '">' +
              '<div class="blog-card__label" style="background:' + catColor + ';">' + cat + '</div>' +
              '<i data-feather="file-text" class="fea" style="width:44px;height:44px;color:rgba(13,110,253,0.6);"></i>' +
              '<span class="text-muted" style="font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">' + cat + '</span>' +
              '</div>';

        return (
          '<div class="col-' + (isFirst ? 'lg-5' : 'lg-3_5') + ' col-md-6">' +
          '<article class="blog-card">' +
          imgHtml +
          '<div class="blog-card__content">' +
          '<h4 class="blog-card__title">' + post.title + '</h4>' +
          '<div class="blog-card__meta">' +
          '<span><i data-feather="calendar" class="fea"></i>' + date + '</span>' +
          '<span><i data-feather="clock" class="fea"></i>' + readTime + '</span>' +
          '</div>' +
          '<a href="' + post.url + '" class="btn btn-sm btn-primary mt-auto">Read post</a>' +
          '</div>' +
          '</article>' +
          '</div>'
        );
      })
      .join("");

    if (window.feather) feather.replace();
  }

  // ── Portfolio projects renderer ─────────────────────────────────────────
  function renderHomeProjects() {
    var projects = PortfolioLoader.getFeaturedProjects(6);
    var grid = document.getElementById('projects-grid');
    var loading = document.getElementById('projects-loading');
    if (!grid) return;
    if (projects.length === 0) {
      if (PortfolioLoader.projects.length === 0) { setTimeout(renderHomeProjects, 150); return; }
      if (loading) loading.innerHTML = '<p class="text-muted" style="font-size:0.88rem;">No projects yet.</p>';
      return;
    }
    if (loading) loading.style.display = 'none';

    var icons = ['cloud', 'layers', 'repeat', 'bar-chart-2', 'code', 'shield'];
    var statusColors = { Completed: '#28a745', 'In Progress': '#fd7e14', Planned: '#6c757d' };

    grid.innerHTML = projects.map(function (project, i) {
      var techs = (project.technologies || []).slice(0, 4);
      var icon = icons[i % icons.length];
      var status = project.status || 'Completed';
      var statusColor = statusColors[status] || '#28a745';

      var imgHtml = project.image
        ? '<img src="' + project.image + '" alt="' + project.title + '" style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s;" class="proj-img">'
        : '<div style="width:100%;height:100%;background:linear-gradient(135deg,#0d1117,#161b22);display:flex;align-items:center;justify-content:center;position:relative;">' +
        '<div style="position:absolute;inset:0;background-image:radial-gradient(rgba(13,110,253,0.1) 1px,transparent 1px);background-size:18px 18px;"></div>' +
        '<i data-feather="' + icon + '" style="width:52px;height:52px;color:rgba(13,110,253,0.5);position:relative;"></i></div>';

      return '<div class="col-lg-4 col-md-6">' +
        '<div style="background:#fff;border-radius:14px;overflow:hidden;height:100%;display:flex;flex-direction:column;border:1px solid #e9ecef;transition:transform 0.2s,box-shadow 0.2s;" ' +
        'onmouseover="this.style.transform=\'translateY(-4px)\';this.style.boxShadow=\'0 12px 32px rgba(0, 0, 0, 0.1)\';var img=this.querySelector(\'.proj-img\');if(img)img.style.transform=\'scale(1.05)\';" ' +
          'onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\';var img=this.querySelector(\'.proj-img\');if(img)img.style.transform=\'\';">' +
            // Image area
            '<div style="height:190px;overflow:hidden;position:relative;">' + imgHtml +
            // Status badge
            '<div style="position:absolute;top:0.75rem;right:0.75rem;">' +
            '<span style="background:' + statusColor + ';color:#fff;font-size:0.67rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:0.2rem 0.55rem;border-radius:4px;">' + status + '</span>' +
            '</div>' +
            // Hover overlay with link
            (project.link ? '<div style="position:absolute;inset:0;background:rgba(13,17,23,0.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;" class="proj-overlay" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0\'">' +
              '<a href="' + project.link + '" target="_blank" style="background:#fff;color:#212529;padding:0.5rem 1.25rem;border-radius:8px;font-size:0.82rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:0.4rem;">' +
              '<i data-feather="external-link" style="width:14px;height:14px;"></i> View Project</a></div>' : '') +
      '</div>' +
      // Content
      '<div style="padding:1.25rem;flex:1;display:flex;flex-direction:column;">' +
      '<h6 style="font-weight:700;font-size:0.95rem;color:#212529;margin-bottom:0.5rem;line-height:1.35;">' + project.title + '</h6>' +
      (project.description ? '<p style="font-size:0.82rem;color:#6c757d;line-height:1.6;margin-bottom:0.9rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:1;">' + project.description + '</p>' : '<div style="flex:1;"></div>') +
      // Tech tags
      (techs.length ? '<div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:auto;">' +
        techs.map(function (t) { return '<span style="font-size:0.7rem;background:#f1f3f5;color:#495057;border-radius:4px;padding:0.18rem 0.5rem;font-weight:500;">' + t + '</span>'; }).join('') +
        (project.technologies && project.technologies.length > 4 ? '<span style="font-size:0.7rem;background:#e7f3ff;color:#0d6efd;border-radius:4px;padding:0.18rem 0.5rem;font-weight:500;">+' + (project.technologies.length - 4) + ' more</span>' : '') +
        '</div>' : '') +
      '</div></div></div>';
    }).join('');
    feather.replace();
  }

  if (window.BlogLoader && typeof window.BlogLoader.onReady === "function") {
    BlogLoader.onReady(renderHomeBlog);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (window.BlogLoader && typeof window.BlogLoader.onReady === "function") {
        BlogLoader.onReady(renderHomeBlog);
      }
    });
  }

  if (window.PortfolioLoader && typeof window.PortfolioLoader.onReady === "function") {
    PortfolioLoader.onReady(renderHomeProjects);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (window.PortfolioLoader && typeof window.PortfolioLoader.onReady === "function") {
        PortfolioLoader.onReady(renderHomeProjects);
      }
    });
  }

  // ── Project modal data and functions ──────────────────────────────────────
  var PROJECTS = {
    p1: {
      gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
      iconColor: '#ff9900',
      iconBg: 'rgba(255,153,0,.18)',
      icon: 'database',
      badge: 'AWS · Data Engineering',
      badgeBg: '#ff9900',
      badgeColor: '#fff',
      title: 'PECOS Data Extraction Pipeline',
      tagline: 'Production-grade serverless data pipeline on AWS — from raw CMS data to queryable analytics.',
      body: `
<p>A fully documented DevOps architecture for extracting and processing Medicare PECOS (Provider Enrollment, Chain, and Ownership System) data. This project demonstrates end-to-end pipeline design covering ingestion, transformation, storage, and querying — all on AWS managed services.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Architecture Overview</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Ingestion:</strong> Lambda functions triggered on schedule to pull raw PECOS data from CMS endpoints</li>
  <li><strong>Storage:</strong> Raw and processed data partitioned in S3 with lifecycle policies</li>
  <li><strong>Transformation:</strong> AWS Glue jobs for schema normalisation and data quality checks</li>
  <li><strong>Querying:</strong> Athena for ad-hoc SQL queries on S3-backed data without a database server</li>
  <li><strong>Orchestration:</strong> Step Functions for pipeline state management and error handling</li>
  <li><strong>IaC:</strong> Entire stack provisioned with Terraform; CI/CD deploys on merge to main</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Key Outcomes</h6>
<ul style="padding-left:1.2rem;">
  <li>Zero-server architecture — scales to zero between runs, eliminating idle compute costs</li>
  <li>Full pipeline documented as DevOps runbook for team handover</li>
  <li>Infrastructure reproducible in any AWS account via Terraform</li>
</ul>`,
      tags: ['AWS Lambda', 'S3', 'Glue', 'Athena', 'Step Functions', 'Terraform', 'CI/CD', 'Data Pipeline'],
      ctas: [
        { label: '📖 Read Full Write-up', href: 'https://dev.to/durrello/pecos-data-extraction-pipeline-devops-documentation-385k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss Architecture', href: 'mailto:hello@durrellgemuh.com?subject=PECOS Pipeline Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p2: {
      gradient: 'linear-gradient(135deg,#0d1117,#1a2332)',
      iconColor: '#ffd055',
      iconBg: 'rgba(255,236,178,.15)',
      icon: 'lock',
      badge: 'Kubernetes · Secrets',
      badgeBg: '#6f42c1',
      badgeColor: '#fff',
      title: 'HashiCorp Vault HA on Kubernetes (Raft Storage)',
      tagline: 'Production-ready secrets management cluster inside Kubernetes — zero single point of failure.',
      body: `
<p>A complete deployment of HashiCorp Vault in high-availability mode on a Kubernetes cluster, using Raft integrated storage for consensus without an external Consul dependency.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">What Was Built</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>HA Vault cluster</strong> with 3 replicas using Raft consensus — survives single node loss</li>
  <li><strong>Helm-based deployment</strong> with custom values overrides for production configuration</li>
  <li><strong>Auto-unseal</strong> using AWS KMS for automated key management</li>
  <li><strong>External Secrets Operator</strong> for seamless integration with Kubernetes workloads</li>
  <li><strong>RBAC policies</strong> for fine-grained access control to secrets</li>
  <li><strong>Backup strategy</strong> with automated snapshots to S3</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Production Considerations</h6>
<ul style="padding-left:1.2rem;">
  <li>Zero-downtime upgrades using rolling updates and pod disruption budgets</li>
  <li>Resource limits and requests tuned for production workloads</li>
  <li>Network policies restricting traffic between namespaces</li>
  <li>Monitoring with Prometheus metrics and Grafana dashboards</li>
</ul>`,
      tags: ['Kubernetes', 'HashiCorp Vault', 'Helm', 'AWS KMS', 'External Secrets Operator', 'Raft', 'HA', 'RBAC'],
      ctas: [
        { label: '📖 Read Full Guide', href: 'https://dev.to/durrello/hashicorp-vault-ha-on-kubernetes-with-raft-storage-4m8k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss Secrets Management', href: 'mailto:hello@durrellgemuh.com?subject=Vault & Secrets Management Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p3: {
      gradient: 'linear-gradient(135deg,#1e3a8a,#1e40af)',
      iconColor: '#60a5fa',
      iconBg: 'rgba(96,165,250,.18)',
      icon: 'git-branch',
      badge: 'CI/CD · GitOps',
      badgeBg: '#0d6efd',
      badgeColor: '#fff',
      title: 'ArgoCD GitOps Pipeline for Multi-Environment Deployments',
      tagline: 'Complete GitOps workflow with ArgoCD — from code commit to production deployment across multiple environments.',
      body: `
<p>An end-to-end GitOps deployment pipeline using ArgoCD for managing applications across development, staging, and production environments with proper promotion workflows and rollback capabilities.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Pipeline Architecture</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Application manifests</strong> stored in Git with Kustomize overlays for environment-specific configuration</li>
  <li><strong>ArgoCD Applications</strong> configured for each environment with sync policies and automated deployment</li>
  <li><strong>Promotion workflow</strong> using pull requests to move changes between environments</li>
  <li><strong>Automated testing</strong> gates before promotion to production</li>
  <li><strong>Rollback procedures</strong> with version pinning and emergency rollback buttons</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Key Features</h6>
<ul style="padding-left:1.2rem;">
  <li>Zero-touch deployments — merge to main triggers production deployment</li>
  <li>Environment drift detection and automatic reconciliation</li>
  <li>Comprehensive monitoring and alerting for deployment health</li>
  <li>Integration with existing CI pipelines for image building and testing</li>
</ul>`,
      tags: ['ArgoCD', 'GitOps', 'Kustomize', 'Kubernetes', 'CI/CD', 'Multi-Environment', 'GitHub Actions'],
      ctas: [
        { label: '📖 Read Implementation Guide', href: 'https://dev.to/durrello/argocd-gitops-pipeline-for-multi-environment-deployments-4n8k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss GitOps Strategy', href: 'mailto:hello@durrellgemuh.com?subject=GitOps & ArgoCD Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p4: {
      gradient: 'linear-gradient(135deg,#0f172a,#1e293b)',
      iconColor: '#f59e0b',
      iconBg: 'rgba(245,158,11,.18)',
      icon: 'bar-chart-3',
      badge: 'Observability · Monitoring',
      badgeBg: '#fd7e14',
      badgeColor: '#fff',
      title: 'Prometheus + Grafana Observability Stack',
      tagline: 'Production monitoring and alerting stack — from metrics collection to actionable dashboards.',
      body: `
<p>A comprehensive observability solution built on Prometheus and Grafana, designed to monitor infrastructure, applications, and business metrics with automated alerting and incident response.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Stack Components</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Prometheus</strong> for metrics collection with service discovery and federation</li>
  <li><strong>Grafana</strong> for visualization with custom dashboards and alerting</li>
  <li><strong>Alertmanager</strong> for alert routing and notification management</li>
  <li><strong>Node Exporter</strong> and custom exporters for comprehensive coverage</li>
  <li><strong>VictoriaMetrics</strong> for long-term metrics storage and querying</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Production Features</h6>
<ul style="padding-left:1.2rem;">
  <li>Multi-cluster federation for centralized monitoring</li>
  <li>Automated dashboard provisioning and configuration management</li>
  <li>Intelligent alerting with escalation policies and on-call rotation</li>
  <li>Integration with incident management systems (PagerDuty, OpsGenie)</li>
  <li>Cost-optimized storage with data retention policies</li>
</ul>`,
      tags: ['Prometheus', 'Grafana', 'Alertmanager', 'VictoriaMetrics', 'Monitoring', 'Observability', 'Kubernetes'],
      ctas: [
        { label: '📖 Read Monitoring Guide', href: 'https://dev.to/durrello/prometheus-grafana-observability-stack-implementation-3n2k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss Observability', href: 'mailto:hello@durrellgemuh.com?subject=Observability & Monitoring Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p5: {
      gradient: 'linear-gradient(135deg,#1f2937,#111827)',
      iconColor: '#3b82f6',
      iconBg: 'rgba(59,130,246,.18)',
      icon: 'shield',
      badge: 'Security · Cloudflare',
      badgeBg: '#dc3545',
      badgeColor: '#fff',
      title: 'Cloudflare Zero Trust Security Implementation',
      tagline: 'Enterprise-grade security architecture with zero-trust principles and comprehensive threat protection.',
      body: `
<p>A complete security transformation implementing Cloudflare's zero-trust architecture across multiple client environments, providing comprehensive protection against modern cyber threats.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Security Components</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Zero Trust Network Access (ZTNA)</strong> — Identity-based access control replacing traditional VPNs</li>
  <li><strong>Web Application Firewall (WAF)</strong> — Advanced threat detection and blocking</li>
  <li><strong>DDoS Protection</strong> — Automatic mitigation of volumetric and application-layer attacks</li>
  <li><strong>SSL/TLS Encryption</strong> — End-to-end encryption with automated certificate management</li>
  <li><strong>Access Policies</strong> — Granular access control based on user identity and device posture</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Business Impact</h6>
<ul style="padding-left:1.2rem;">
  <li>99.9% uptime with comprehensive DDoS protection</li>
  <li>Reduced security incidents by 85% through proactive threat prevention</li>
  <li>Eliminated VPN maintenance costs and complexity</li>
  <li>Improved user experience with faster, more secure access</li>
</ul>`,
      tags: ['Cloudflare', 'Zero Trust', 'WAF', 'DDoS Protection', 'SSL/TLS', 'ZTNA', 'Security'],
      ctas: [
        { label: '📖 Read Security Implementation', href: 'https://dev.to/durrello/cloudflare-zero-trust-security-implementation-4a1k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss Security Architecture', href: 'mailto:hello@durrellgemuh.com?subject=Zero Trust Security Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p6: {
      gradient: 'linear-gradient(135deg,#065f46,#064e3b)',
      iconColor: '#10b981',
      iconBg: 'rgba(16,185,129,.18)',
      icon: 'git-branch',
      badge: 'CI/CD · Automation',
      badgeBg: '#28a745',
      badgeColor: '#fff',
      title: 'Jenkins Pipeline as Code with Shared Libraries',
      tagline: 'Scalable CI/CD infrastructure supporting 50+ microservices with reusable pipeline components.',
      body: `
<p>A comprehensive Jenkins CI/CD platform built for scale, featuring pipeline as code, shared libraries, and automated deployment across multiple environments.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Platform Architecture</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Pipeline as Code</strong> — Declarative pipelines stored in Git with version control</li>
  <li><strong>Shared Libraries</strong> — Reusable pipeline functions and utilities</li>
  <li><strong>Multi-branch Pipelines</strong> — Automatic pipeline creation for feature branches</li>
  <li><strong>Parallel Execution</strong> — Optimized build times through parallel job execution</li>
  <li><strong>Artifact Management</strong> — Automated versioning and storage of build artifacts</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Key Achievements</h6>
<ul style="padding-left:1.2rem;">
  <li>Reduced deployment time from 45 minutes to 8 minutes</li>
  <li>99.5% pipeline success rate across all services</li>
  <li>Zero-downtime deployments with blue-green strategy</li>
  <li>Comprehensive testing integration (unit, integration, security)</li>
</ul>`,
      tags: ['Jenkins', 'Pipeline as Code', 'Shared Libraries', 'CI/CD', 'Automation', 'Docker', 'Kubernetes'],
      ctas: [
        { label: '📖 Read Jenkins Implementation', href: 'https://dev.to/durrello/jenkins-pipeline-as-code-with-shared-libraries-3b2k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss CI/CD Strategy', href: 'mailto:hello@durrellgemuh.com?subject=Jenkins CI/CD Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p7: {
      gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
      iconColor: '#a855f7',
      iconBg: 'rgba(168,85,247,.18)',
      icon: 'server',
      badge: 'Infrastructure · Linux',
      badgeBg: '#6f42c1',
      badgeColor: '#fff',
      title: 'High-Performance Linux Server Optimization',
      tagline: 'Enterprise Linux server optimization achieving 300% performance improvement and 99.99% uptime.',
      body: `
<p>A comprehensive Linux server optimization project that transformed underperforming infrastructure into a high-availability, high-performance platform capable of handling enterprise workloads.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Optimization Areas</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Kernel Tuning</strong> — Optimized kernel parameters for specific workload patterns</li>
  <li><strong>Memory Management</strong> — Advanced memory allocation and caching strategies</li>
  <li><strong>Storage I/O</strong> — SSD optimization, RAID configuration, and filesystem tuning</li>
  <li><strong>Network Stack</strong> — TCP/IP optimization and network interface tuning</li>
  <li><strong>Process Scheduling</strong> — CPU affinity and process priority optimization</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Results Achieved</h6>
<ul style="padding-left:1.2rem;">
  <li>300% improvement in application response times</li>
  <li>60% reduction in CPU utilization under load</li>
  <li>99.99% uptime with automated failover systems</li>
  <li>50% reduction in infrastructure costs through optimization</li>
</ul>`,
      tags: ['Linux', 'Performance Tuning', 'Kernel Optimization', 'System Administration', 'High Availability', 'Monitoring'],
      ctas: [
        { label: '📖 Read Linux Optimization Guide', href: 'https://dev.to/durrello/high-performance-linux-server-optimization-2c9k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss System Performance', href: 'mailto:hello@durrellgemuh.com?subject=Linux Performance Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p8: {
      gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)',
      iconColor: '#ef4444',
      iconBg: 'rgba(239,68,68,.18)',
      icon: 'activity',
      badge: 'Monitoring · SRE',
      badgeBg: '#fd7e14',
      badgeColor: '#fff',
      title: 'Site Reliability Engineering Implementation',
      tagline: 'Complete SRE transformation with service level objectives, error budgets, and automated incident response.',
      body: `
<p>A full-site reliability engineering implementation that established SRE practices, service level objectives (SLOs), and automated incident management across critical business applications.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">SRE Components</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Service Level Objectives (SLOs)</strong> — Defined and monitored service reliability targets</li>
  <li><strong>Error Budgets</strong> — Quantified acceptable failure rates for each service</li>
  <li><strong>Incident Management</strong> — Automated alerting and escalation procedures</li>
  <li><strong>Post-Mortem Culture</strong> — Blameless incident reviews and continuous improvement</li>
  <li><strong>Toil Reduction</strong> — Automation of manual operational tasks</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Key Metrics</h6>
<ul style="padding-left:1.2rem;">
  <li>99.95% service availability across all critical systems</li>
  <li>70% reduction in mean time to resolution (MTTR)</li>
  <li>85% reduction in operational toil through automation</li>
  <li>Improved team morale through reduced on-call burden</li>
</ul>`,
      tags: ['SRE', 'Site Reliability Engineering', 'SLO', 'Error Budgets', 'Incident Management', 'Monitoring', 'Automation'],
      ctas: [
        { label: '📖 Read SRE Implementation', href: 'https://dev.to/durrello/site-reliability-engineering-implementation-5d3k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss SRE Practices', href: 'mailto:hello@durrellgemuh.com?subject=SRE Implementation Discussion', cls: 'btn-outline-primary' }
      ]
    },
    p9: {
      gradient: 'linear-gradient(135deg,#059669,#047857)',
      iconColor: '#34d399',
      iconBg: 'rgba(52,211,153,.18)',
      icon: 'zap',
      badge: 'Performance · Optimization',
      badgeBg: '#20c997',
      badgeColor: '#fff',
      title: 'Database Performance Optimization & Migration',
      tagline: 'Complex database migration and optimization project reducing query times by 80% and costs by 40%.',
      body: `
<p>A comprehensive database optimization and migration project that transformed a legacy monolithic database into a high-performance, scalable, and cost-effective solution.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Optimization Strategies</h6>
<ul style="padding-left:1.2rem;">
  <li><strong>Query Optimization</strong> — Index optimization, query rewriting, and execution plan analysis</li>
  <li><strong>Schema Design</strong> — Normalization, partitioning, and data archiving strategies</li>
  <li><strong>Connection Pooling</strong> — Efficient connection management and resource utilization</li>
  <li><strong>Caching Strategy</strong> — Multi-level caching with Redis and application-level caching</li>
  <li><strong>Database Migration</strong> — Zero-downtime migration from legacy to cloud-native database</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:.5rem;">Performance Improvements</h6>
<ul style="padding-left:1.2rem;">
  <li>80% reduction in average query response time</li>
  <li>60% improvement in database throughput</li>
  <li>40% reduction in infrastructure costs</li>
  <li>99.9% uptime during and after migration</li>
</ul>`,
      tags: ['Database Optimization', 'Performance Tuning', 'Migration', 'PostgreSQL', 'Redis', 'Query Optimization', 'Cloud Migration'],
      ctas: [
        { label: '📖 Read Database Optimization Guide', href: 'https://dev.to/durrello/database-performance-optimization-migration-1f7k', target: '_blank', cls: 'btn-primary' },
        { label: '💬 Discuss Database Performance', href: 'mailto:hello@durrellgemuh.com?subject=Database Optimization Discussion', cls: 'btn-outline-primary' }
      ]
    }
  };

  window.openProjModal = function(id) {
    var p = PROJECTS[id];
    if (!p) return;

    document.getElementById('pm-title').textContent = p.title;
    document.getElementById('pm-tagline').textContent = p.tagline;
    document.getElementById('pm-body').innerHTML = p.body;
    document.getElementById('pm-banner').style.background = p.gradient;

    var iconEl = document.getElementById('pm-banner-icon');
    iconEl.setAttribute('data-feather', p.icon);
    iconEl.style.color = p.iconColor;
    iconEl.style.background = p.iconBg;

    var badgeEl = document.getElementById('pm-badge');
    badgeEl.textContent = p.badge;
    badgeEl.style.background = p.badgeBg;
    badgeEl.style.color = p.badgeColor;

    var tagsEl = document.getElementById('pm-tags');
    tagsEl.innerHTML = p.tags.map(function(tag) {
      return '<span class="badge bg-secondary text-white me-1 mb-1" style="font-size:0.75rem;">' + tag + '</span>';
    }).join('');

    var ctaEl = document.getElementById('pm-ctas');
    ctaEl.innerHTML = p.ctas.map(function(c) {
      return '<a href="' + c.href + '"' +
        (c.target ? ' target="' + c.target + '"' : '') +
        ' class="btn ' + c.cls + ' rounded btn-sm" style="font-size:0.875rem;">' + c.label + '</a>';
    }).join('');

    document.getElementById('proj-modal').style.display = 'block';
    document.getElementById('proj-modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (window.feather) feather.replace();
  };

  window.closeProjModal = function() {
    document.getElementById('proj-modal').style.display = 'none';
    document.getElementById('proj-modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProjModal();
  });

  window.filterProjects = function(cat, btn) {
    document.querySelectorAll('.proj-filter-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    document.querySelectorAll('.proj-item').forEach(function(item) {
      if (cat === 'all' || item.dataset.cat.indexOf(cat) !== -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // ── Resources modal data and functions ─────────────────────────────────────
  var RESOURCES = {
    r1: {
      icon: 'map', label: 'Career Path', title: 'DevOps Roadmap',
      tagline: 'The clearest path from where you are to where you want to be.',
      body: `<p>Most DevOps "roadmaps" online are overwhelming walls of tools. This is the practical path — ordered by what actually matters first, based on what I've seen work across dozens of engineers I've mentored.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">The Roadmap in Order</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Linux fundamentals</strong> — filesystem, processes, networking basics, shell scripting</li>
  <li><strong>Version control</strong> — Git workflows, branching strategies, pull requests</li>
  <li><strong>One cloud platform</strong> — Start with AWS (EC2, S3, IAM, VPC, RDS). Go deep before going wide.</li>
  <li><strong>Containers</strong> — Docker: build, run, compose. Then Kubernetes basics.</li>
  <li><strong>CI/CD</strong> — GitHub Actions or GitLab CI. Build a real pipeline for a real project.</li>
  <li><strong>Infrastructure as Code</strong> — Terraform. Provision your first VPC and EC2 in code.</li>
  <li><strong>Observability</strong> — Prometheus + Grafana. Understand what your systems are doing.</li>
  <li><strong>Security basics</strong> — IAM least privilege, secret management, RBAC</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Common Mistakes to Avoid</h6>
<ul style="padding-left:1.25rem;">
  <li>Trying to learn everything at once — go deep, not wide</li>
  <li>Skipping Linux — everything runs on Linux</li>
  <li>Learning tools without building real projects — employers want evidence</li>
  <li>Chasing certifications before skills — get the skills first</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> I followed this path myself and now teach it through NextGen Playground. The engineers who progress fastest are the ones who build real infrastructure projects, not just follow tutorials.</p>`,
      ctas: [
        { label: '📅 Get a Personal Roadmap Review', href: 'mailto:hello@durrellgemuh.com?subject=DevOps Roadmap Consultation', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r2: {
      icon: 'layers', label: 'Container Orchestration', title: 'Kubernetes Learning Path',
      tagline: 'From confused by YAML to confidently running production clusters.',
      body: `<p>Kubernetes has a steep learning curve — but once it clicks, it changes how you think about infrastructure. Here's the path I use to teach it, refined through dozens of students and real production experience.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Learning Sequence</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Docker first</strong> — you must understand containers before Kubernetes</li>
  <li><strong>Core concepts</strong> — Pods, Deployments, Services, ConfigMaps, Secrets</li>
  <li><strong>kubectl</strong> — the CLI you'll use every day. Master it early.</li>
  <li><strong>Namespaces & RBAC</strong> — multi-team isolation and access control</li>
  <li><strong>Helm</strong> — packaging and deploying applications properly</li>
  <li><strong>Networking</strong> — Ingress, Services (ClusterIP/NodePort/LoadBalancer), DNS</li>
  <li><strong>Persistent storage</strong> — PVs, PVCs, StorageClasses</li>
  <li><strong>ArgoCD / GitOps</strong> — the modern way to deploy to Kubernetes</li>
  <li><strong>Monitoring</strong> — Prometheus + Grafana on Kubernetes</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Recommended Starting Points</h6>
<ul style="padding-left:1.25rem;">
  <li>Use <strong>kind</strong> or <strong>k3s</strong> locally — spin up clusters in minutes</li>
  <li>The official Kubernetes docs are actually excellent once you have context</li>
  <li>Focus on production clusters — the resources that actually get you running Kubernetes confidently.</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> I've deployed and managed Kubernetes clusters for multiple clients. The biggest mistake I see is trying to learn everything at once. Start with one cluster, master the basics, then scale your knowledge.</p>`,
      ctas: [
        { label: '📅 Schedule a Kubernetes Consultation', href: 'mailto:hello@durrellgemuh.com?subject=Kubernetes Training & Consulting', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r3: {
      icon: 'settings', label: 'Infrastructure as Code', title: 'Terraform Mastery Path',
      tagline: 'From clicking in consoles to infrastructure that scales and heals.',
      body: `<p>Terraform changed how I think about infrastructure. Before Terraform, infrastructure was manual, error-prone, and hard to version. After Terraform, it's code that you can test, review, and deploy consistently. Here's how to get there.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Learning Progression</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>HCL syntax basics</strong> — resources, variables, outputs, data sources</li>
  <li><strong>State management</strong> — local vs remote state, locking, workspaces</li>
  <li><strong>Modules</strong> — reusable infrastructure components</li>
  <li><strong>Providers</strong> — AWS, GCP, Azure — pick one and go deep</li>
  <li><strong>Expressions & functions</strong> — dynamic configurations</li>
  <li><strong>Testing</strong> — validate configurations before applying</li>
  <li><strong>CI/CD integration</strong> — automated infrastructure deployment</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Key Principles</h6>
<ul style="padding-left:1.25rem;">
  <li>Everything as code — no manual changes</li>
  <li>Small, frequent changes — easier to debug and rollback</li>
  <li>Plan before apply — always review what will change</li>
  <li>Import existing resources before destroying and recreating them</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> I've used Terraform to provision hundreds of AWS and GCP resources across multiple clients. The biggest productivity gain was moving from single files to proper module structures.</p>`,
      ctas: [
        { label: '📅 Terraform Training & Consulting', href: 'mailto:hello@durrellgemuh.com?subject=Terraform Training & Consulting', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r4: {
      icon: 'repeat', label: 'CI/CD Best Practices', title: 'CI/CD Pipeline Excellence',
      tagline: 'Build pipelines your team trusts — testing, security gates, rollback strategies, and deployment patterns that work.',
      body: `<p>A comprehensive guide to building reliable, secure, and maintainable CI/CD pipelines that scale with your team and codebase.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Pipeline Fundamentals</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Testing Strategy</strong> — Unit, integration, and end-to-end testing in pipelines</li>
  <li><strong>Security Gates</strong> — SAST, DAST, dependency scanning, and secret detection</li>
  <li><strong>Quality Gates</strong> — Code coverage, performance benchmarks, and compliance checks</li>
  <li><strong>Deployment Patterns</strong> — Blue-green, canary, and rolling deployments</li>
  <li><strong>Rollback Strategies</strong> — Automated and manual rollback procedures</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Common Pitfalls to Avoid</h6>
<ul style="padding-left:1.25rem;">
  <li>Skipping automated testing in favor of manual QA</li>
  <li>Not implementing proper security scanning</li>
  <li>Lack of environment parity between dev/staging/production</li>
  <li>Poor artifact versioning and traceability</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> I've built and optimized CI/CD pipelines for teams ranging from 5 to 200 developers. The most important lesson: invest in your pipeline infrastructure early — it pays dividends in developer productivity and deployment reliability.</p>`,
      ctas: [
        { label: '📅 CI/CD Pipeline Review', href: 'mailto:hello@durrellgemuh.com?subject=CI/CD Pipeline Review', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r5: {
      icon: 'cloud', label: 'AWS for DevOps Engineers', title: 'AWS DevOps Essentials',
      tagline: 'The AWS services DevOps engineers actually use — EC2, EKS, S3, IAM, CloudWatch, CodePipeline, and more.',
      body: `<p>A practical guide to the AWS services that form the backbone of modern DevOps workflows, with real-world usage patterns and cost optimization strategies.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Core Services for DevOps</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Compute</strong> — EC2, ECS, EKS, Lambda for running applications</li>
  <li><strong>Storage</strong> — S3, EFS, EBS for data persistence and artifacts</li>
  <li><strong>Networking</strong> — VPC, ALB, CloudFront for traffic management</li>
  <li><strong>Security</strong> — IAM, KMS, ACM for access control and encryption</li>
  <li><strong>Monitoring</strong> — CloudWatch, X-Ray for observability</li>
  <li><strong>CI/CD</strong> — CodePipeline, CodeBuild, CodeDeploy for automation</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Cost Optimization</h6>
<ul style="padding-left:1.25rem;">
  <li>Right-sizing instances and using spot instances where appropriate</li>
  <li>Implementing auto-scaling to match demand</li>
  <li>Using reserved instances for predictable workloads</li>
  <li>Leveraging serverless options to reduce idle compute costs</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> I've helped clients reduce their AWS bills by 30-50% through proper architecture and resource optimization. AWS is powerful but complex — focus on the services that directly impact your DevOps workflows.</p>`,
      ctas: [
        { label: '📅 AWS Architecture Review', href: 'mailto:hello@durrellgemuh.com?subject=AWS Architecture Review', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r6: {
      icon: 'bar-chart-2', label: 'Observability & Monitoring', title: 'Production Observability',
      tagline: 'Understanding metrics, logs, and traces — how to set up Prometheus, Grafana, and Datadog for real production systems.',
      body: `<p>A comprehensive approach to implementing observability in production systems, covering metrics collection, log aggregation, distributed tracing, and actionable alerting.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Observability Pillars</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Metrics</strong> — Prometheus, VictoriaMetrics, or CloudWatch for quantitative monitoring</li>
  <li><strong>Logs</strong> — ELK stack, Loki, or CloudWatch Logs for event tracking</li>
  <li><strong>Traces</strong> — Jaeger, X-Ray, or Zipkin for request flow analysis</li>
  <li><strong>Visualization</strong> — Grafana for dashboards and alerting</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Implementation Strategy</h6>
<ul style="padding-left:1.25rem;">
  <li>Start with the four golden signals: latency, traffic, errors, saturation</li>
  <li>Implement structured logging with consistent formats</li>
  <li>Use distributed tracing for microservices architectures</li>
  <li>Establish alerting rules based on business impact, not just technical thresholds</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> Good observability is about answering questions, not collecting data. Focus on what matters to your users and business — everything else is noise that costs money and creates alert fatigue.</p>`,
      ctas: [
        { label: '📅 Observability Assessment', href: 'mailto:hello@durrellgemuh.com?subject=Observability Assessment', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r7: {
      icon: 'shield', label: 'DevSecOps Fundamentals', title: 'Security in DevOps',
      tagline: 'Bake security into your pipelines — container scanning, SAST, secret detection, IAM best practices, and compliance basics.',
      body: `<p>Integrating security practices throughout the DevOps lifecycle, from development to production deployment, ensuring security is never an afterthought.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Security Integration Points</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>Code Security</strong> — SAST, dependency scanning, and secret detection</li>
  <li><strong>Container Security</strong> — Image scanning, vulnerability assessment, and hardening</li>
  <li><strong>Infrastructure Security</strong> — IaC security, configuration management, and access control</li>
  <li><strong>Runtime Security</strong> — WAF, intrusion detection, and behavioral monitoring</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Essential Practices</h6>
<ul style="padding-left:1.25rem;">
  <li>Implement least privilege access principles</li>
  <li>Use infrastructure as code for security policy enforcement</li>
  <li>Automate security testing and compliance checks</li>
  <li>Establish incident response procedures and runbooks</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> Security done right enables speed and innovation. When security is automated and integrated into your workflows, it becomes an enabler rather than a blocker. I've helped teams reduce security incidents by 80% through proper DevSecOps implementation.</p>`,
      ctas: [
        { label: '📅 Security Audit & Consulting', href: 'mailto:hello@durrellgemuh.com?subject=Security Audit & Consulting', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r8: {
      icon: 'briefcase', label: 'Breaking Into DevOps', title: 'Career Transition Guide',
      tagline: 'How to transition into DevOps from development, sysadmin, or a non-technical background — the real path, not the optimistic one.',
      body: `<p>A realistic guide for breaking into DevOps, covering skill development, networking, job hunting, and the mindset shift required for a successful career transition.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Transition Paths</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>From Development</strong> — Leverage coding skills to learn infrastructure automation</li>
  <li><strong>From SysAdmin</strong> — Build on existing knowledge to embrace modern practices</li>
  <li><strong>From Other IT Roles</strong> — Identify transferable skills and build from there</li>
  <li><strong>Non-Technical Background</strong> — Start with fundamentals and work systematically</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Actionable Steps</h6>
<ul style="padding-left:1.25rem;">
  <li>Build a home lab environment for hands-on practice</li>
  <li>Contribute to open-source projects to build your portfolio</li>
  <li>Network with DevOps professionals and join communities</li>
  <li>Focus on one cloud platform and go deep rather than wide</li>
  <li>Learn by doing — build real infrastructure projects</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> I've mentored dozens of engineers through DevOps transitions. The key is consistent, deliberate practice combined with networking. Don't try to learn everything — focus on building working systems that solve real problems.</p>`,
      ctas: [
        { label: '📅 Career Transition Coaching', href: 'mailto:hello@durrellgemuh.com?subject=DevOps Career Transition Coaching', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    },
    r9: {
      icon: 'award', label: 'Certifications Guide', title: 'DevOps Certifications That Matter',
      tagline: 'Which cloud and DevOps certifications are actually worth your time and money — AWS, CKA, Terraform, and what to skip.',
      body: `<p>A practical evaluation of DevOps and cloud certifications, helping you make informed decisions about which credentials will actually advance your career.</p>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">High-Value Certifications</h6>
<ul style="padding-left:1.25rem;">
  <li><strong>AWS Solutions Architect Associate</strong> — Broad AWS knowledge, highly valued</li>
  <li><strong>Certified Kubernetes Administrator (CKA)</strong> — Proves hands-on Kubernetes skills</li>
  <li><strong>HashiCorp Terraform Associate</strong> — Validates IaC proficiency</li>
  <li><strong>Docker Certified Associate</strong> — Container fundamentals and best practices</li>
</ul>
<h6 style="font-weight:700;margin-top:1.1rem;margin-bottom:0.5rem;">Certifications to Skip</h6>
<ul style="padding-left:1.25rem;">
  <li>Entry-level cloud certifications (focus on associate/professional levels)</li>
  <li>Vendor-specific tools that aren't widely used</li>
  <li>Certifications that test memorization over practical skills</li>
  <li>Anything that doesn't align with your career goals</li>
</ul>
<p style="margin-top:1rem;padding:0.85rem;background:#f8f9ff;border-radius:8px;font-size:0.88rem;"><strong>From Durrell:</strong> Certifications can open doors, but they're not a substitute for real experience. Use them strategically to validate skills you've already developed through hands-on work. I've seen engineers with perfect certification records struggle with basic production issues.</p>`,
      ctas: [
        { label: '📅 Certification Strategy Session', href: 'mailto:hello@durrellgemuh.com?subject=DevOps Certification Strategy', cls: 'btn-primary' },
        { label: '📱 WhatsApp Me', href: 'https://wa.me/237671305865', cls: 'btn-success', target: '_blank' },
        { label: '🚀 Join NextGen Playground', href: 'http://nextgenplayground.org/', cls: 'btn-outline-primary', target: '_blank' }
      ]
    }
  };

  window.openRes = function(id) {
    var r = RESOURCES[id];
    if (!r) return;

    document.getElementById('res-title').textContent = r.title;
    document.getElementById('res-tagline').textContent = r.tagline;
    document.getElementById('res-body').innerHTML = r.body;

    var iconEl = document.getElementById('res-icon');
    iconEl.setAttribute('data-feather', r.icon);

    var ctaEl = document.getElementById('res-ctas');
    ctaEl.innerHTML = '<span style="color:#6c757d;font-size:0.82rem;margin-right:auto;">Want guidance on this topic?</span>' +
      r.ctas.map(function(c) {
        return '<a href="' + c.href + '"' +
          (c.target ? ' target="' + c.target + '"' : '') +
          ' class="btn ' + c.cls + ' rounded" style="font-size:0.875rem;">' + c.label + '</a>';
      }).join('');

    document.getElementById('res-modal').style.display = 'block';
    document.getElementById('res-modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (window.feather) feather.replace();
  };

  window.closeRes = function() {
    document.getElementById('res-modal').style.display = 'none';
    document.getElementById('res-modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeRes();
  });

  // ── Blog modal data and functions ─────────────────────────────────────
  var BLOGS = {
    b1: {
      icon: 'settings',
      category: 'DevOps',
      title: 'Terraform Best Practices: From Chaos to Predictable Infrastructure',
      author: 'Durrell Gemuh',
      date: 'March 20, 2026',
      readTime: '8 min read',
      description: 'How to structure Terraform code for teams of 5-50 engineers, with real patterns that scale and prevent disasters.',
      content: `I've seen Terraform implementations go from beautiful, maintainable codebases to unmanageable spaghetti. The difference? Following proven patterns and best practices from day one.

After leading Terraform adoption across multiple organizations, I've developed a comprehensive approach that scales from 5 to 50+ engineers. This post covers the patterns that actually work in production.

## The Foundation: Repository Structure

### Monorepo vs Multi-Repo Debate

**Monorepo** (Recommended for most teams):
\`\`\`
terraform/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   ├── ecs/
│   ├── rds/
│   └── security/
├── shared/
│   ├── data.tf
│   └── providers.tf
└── scripts/
    ├── plan.sh
    └── apply.sh
\`\`\`

### Environment Separation

Each environment gets its own directory with:
- \`main.tf\` - Environment-specific resources
- \`terraform.tfvars\` - Environment variables
- \`backend.tf\` - State backend configuration

## Module Design Principles

### 1. Single Responsibility Principle

Each module should do one thing well. A VPC module shouldn't create EC2 instances.

### 2. Composition over Inheritance

Use module composition instead of complex inheritance patterns.

## State Management

### Remote State with Locking

Always use remote state with locking. S3 + DynamoDB is the gold standard.

## Variable Management

### Variable Definition Patterns

Use validation rules extensively to catch errors early.

### Environment-Specific Values

Use \`.tfvars\` files for environment-specific values.

## Security Best Practices

### Secrets Management

Never hardcode secrets. Use AWS Secrets Manager or similar.

### Least Privilege IAM

Create minimal IAM policies.

## Final Thoughts

Terraform is powerful but requires discipline. The patterns above have helped teams scale from startup chaos to enterprise-grade infrastructure management.`,
      tags: ['terraform', 'infrastructure-as-code', 'aws', 'devops', 'iac'],
      ctas: [
        { label: 'Read on dev.to', href: 'https://dev.to/durrellgemuh/terraform-best-practices-from-chaos-to-predictable-infrastructure', target: '_blank', cls: 'btn-primary' },
        { label: 'View Source', href: 'https://github.com/durrellgemuh/terraform-examples', target: '_blank', cls: 'btn-outline-primary' }
      ]
    },
    b2: {
      icon: 'dollar-sign',
      category: 'AWS',
      title: 'AWS Cost Optimization: 15 Strategies That Actually Work',
      author: 'Durrell Gemuh',
      date: 'March 19, 2026',
      readTime: '12 min read',
      description: 'Practical AWS cost optimization techniques that saved my clients 40-70% on their cloud bills, with real examples and implementation guides.',
      content: `Cloud costs can spiral out of control faster than most engineering teams realize. I've helped multiple organizations reduce their AWS bills by 40-70% through systematic cost optimization. These aren't theoretical savings — these are real numbers from production environments.

## Understanding AWS Cost Drivers

The biggest cost drivers in most AWS environments:
1. **EC2 Instances** (35-50% of total spend)
2. **EBS Storage** (15-25%)
3. **Data Transfer** (10-20%)
4. **RDS Databases** (10-15%)
5. **Lambda & Serverless** (5-10%)

## Strategy 1: Right-Size Your EC2 Instances

**Impact**: 20-40% savings
**Implementation Time**: 2-4 weeks

### Real Example
A client had 20 m5.large instances running at 15% CPU average. We resized to m5a.medium, saving $8,400/month.

## Strategy 2: Implement Auto Scaling

**Impact**: 30-50% savings on variable workloads

### Real Result
A client's API service scaled from 3 to 12 instances during peak hours, saving $15,000/month.

## Strategy 3: Use Spot Instances for Non-Critical Workloads

**Impact**: 60-80% savings vs on-demand

### Real Example
ML training pipeline moved to spot instances: $50,000/month → $12,000/month.

## Key Takeaways

- Start with visibility using AWS Cost Explorer
- Implement quick wins first (right-sizing, auto scaling)
- Use Savings Plans for predictable workloads
- Monitor and alert on cost anomalies
- Implement FinOps culture for long-term success`,
      tags: ['aws', 'cost-optimization', 'cloud-finops', 'infrastructure', 'devops'],
      ctas: [
        { label: 'Read on dev.to', href: 'https://dev.to/durrellgemuh/aws-cost-optimization-15-strategies-that-actually-work', target: '_blank', cls: 'btn-primary' },
        { label: 'Cost Calculator', href: 'https://calculator.aws/', target: '_blank', cls: 'btn-outline-primary' }
      ]
    },
    b3: {
      icon: 'layers',
      category: 'Kubernetes',
      title: 'Kubernetes Service Mesh: Istio vs Linkerd vs Consul',
      author: 'Durrell Gemuh',
      date: 'March 18, 2026',
      readTime: '10 min read',
      description: 'A practical comparison of the three most popular service mesh solutions for Kubernetes, with real-world deployment considerations and performance benchmarks.',
      content: `Service meshes have become essential infrastructure for microservices architectures running on Kubernetes. They handle the complex networking challenges that arise when dozens or hundreds of services need to communicate reliably, securely, and observably.

## The Service Mesh Landscape

The three solutions represent different architectural approaches:
- **Istio**: Control plane (istiod) + Envoy proxies
- **Linkerd**: Ultralight Rust-based proxies + Go control plane  
- **Consul**: Multi-datacenter control plane + Envoy data plane

## Istio: The Enterprise Powerhouse

**Best For**: Large organizations with complex requirements

### What I Love About Istio
- Comprehensive feature set
- Extensibility with Envoy ecosystem
- Multi-cluster support

### The Pain Points
- Resource overhead (200-300% more CPU)
- Complexity (8+ CRDs to understand)
- Upgrade headaches

### Performance Benchmarks
- CPU Overhead: +280% vs baseline
- Memory Overhead: +150MB per pod
- P95 Latency: +12ms

## Linkerd: The Developer-Friendly Choice

**Best For**: Teams that want simplicity and performance

### What Makes Linkerd Special
- Zero-config security (mTLS enabled by default)
- Excellent performance
- Kubernetes-native feel

### Performance Benchmarks
- CPU Overhead: +45% vs baseline
- Memory Overhead: +25MB per pod
- P95 Latency: +3ms
- Deployment Time: 5 minutes

## Consul: The Infrastructure Generalist

**Best For**: Organizations already using HashiCorp stack

### Consul's Strengths
- Multi-platform support
- Service discovery integration
- HashiCorp ecosystem benefits

## Real-World Deployment Decisions

### Choose Istio If:
- You have 50+ services
- You need advanced traffic management
- Your team has dedicated platform engineers

### Choose Linkerd If:
- You want minimal operational overhead
- Performance is critical
- Your use case is straightforward

### Choose Consul If:
- You're already using HashiCorp tools
- You need multi-platform service mesh`,
      tags: ['kubernetes', 'service-mesh', 'istio', 'linkerd', 'consul', 'microservices'],
      ctas: [
        { label: 'Read on dev.to', href: 'https://dev.to/durrellgemuh/kubernetes-service-mesh-istio-vs-linkerd-vs-consul', target: '_blank', cls: 'btn-primary' },
        { label: 'Try Linkerd', href: 'https://linkerd.io/2/getting-started/', target: '_blank', cls: 'btn-outline-primary' }
      ]
    },
    b4: {
      icon: 'database',
      category: 'AWS',
      title: 'AWS Service Spotlight #1: Amazon S3 — The Glue You Don\'t Think About Until You Need It',
      author: 'Durrell Gemuh',
      date: 'March 17, 2026',
      readTime: '7 min read',
      description: 'Welcome to my AWS Service Spotlight series, where I break down AWS services, how they work, when to use them, and how they fit into real-world DevOps systems.',
      content: `Welcome to my **AWS Service Spotlight** series, where I break down AWS services, how they work, when to use them, and how they fit into real-world DevOps systems.

This week we're starting with one of AWS's oldest and most underrated workhorses — **Amazon S3**.

## What is Amazon S3?

**Simple Storage Service** — that's what S3 stands for. A place to store files (called *objects*) in the cloud, organized inside containers called *buckets*.

## Why Use It?

S3 solves a deceptively simple problem: **how do you store and share files reliably, at any scale, without managing infrastructure?**

You'd reach for S3 when you need to:
- Share files between systems that can't talk to each other directly
- Store artifacts, logs, or backups that need to outlive the machine that created them
- Decouple storage from compute so your EC2 instances stay stateless

## How I Used It This Week

I was working with two EC2 instances — neither internet-facing. I needed to get a service running on a new instance, but the binaries weren't baked into the AMI.

**Solution**: Upload installation files to S3 from source EC2, download from target EC2. No SSH tunneling, no key pairs needed — S3 became the neutral transfer point.

## Other Real-World Use Cases

- **CI/CD pipelines** — Storing build artifacts
- **Kubernetes** — Helm charts, backups, data exports
- **Terraform** — Remote state backend
- **Monitoring** — Log archival
- **Static websites** — CDN-backed hosting

## Key Features

- **Virtually unlimited storage**
- **11 nines of durability (99.999999999%)**
- **Storage classes** for cost optimization
- **Versioning** and **lifecycle policies**
- **Fine-grained access control**

## When NOT to Use It

- You need a mounted file system
- You need low-latency, frequent reads/writes
- Small files at very high frequency`,
      tags: ['aws', 's3', 'storage', 'devops', 'infrastructure'],
      ctas: [
        { label: 'Read on dev.to', href: 'https://dev.to/durrellgemuh/aws-service-spotlight-1-amazon-s3-the-glue-you-dont-think-about-until-you-need-it', target: '_blank', cls: 'btn-primary' },
        { label: 'S3 Documentation', href: 'https://docs.aws.amazon.com/s3/', target: '_blank', cls: 'btn-outline-primary' }
      ]
    }
  };

  window.openBlogModal = function(id) {
    var b = BLOGS[id];
    if (!b) return;

    document.getElementById('blog-category').textContent = b.category;
    document.getElementById('blog-title').textContent = b.title;
    document.getElementById('blog-author').textContent = b.author;
    document.getElementById('blog-date').textContent = b.date;
    document.getElementById('blog-read-time').textContent = b.readTime;
    document.getElementById('blog-description').textContent = b.description;
    document.getElementById('blog-content').innerHTML = b.content;

    var iconEl = document.getElementById('blog-icon');
    iconEl.setAttribute('data-feather', b.icon);

    var tagsEl = document.getElementById('blog-tags');
    tagsEl.innerHTML = b.tags.map(function(tag) {
      return '<span class="badge bg-light text-dark me-1 mb-1" style="font-size:0.75rem;">#' + tag + '</span>';
    }).join('');

    var ctaEl = document.getElementById('blog-ctas');
    ctaEl.innerHTML = b.ctas.map(function(c) {
      return '<a href="' + c.href + '"' +
        (c.target ? ' target="' + c.target + '"' : '') +
        ' class="btn ' + c.cls + ' rounded" style="font-size:0.875rem;">' + c.label + '</a>';
    }).join('');

    document.getElementById('blog-modal').style.display = 'block';
    document.getElementById('blog-modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (window.feather) feather.replace();
  };

  window.closeBlogModal = function() {
    document.getElementById('blog-modal').style.display = 'none';
    document.getElementById('blog-modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeBlogModal();
  });

})();

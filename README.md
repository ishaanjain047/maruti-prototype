# Maruti Suzuki Infrastructure Automation Prototype

An AI-powered infrastructure automation platform designed to eliminate 3-4 month delays caused by incremental service request discovery during development.

## 🎯 Core Problem Solved

**Current Issue:** Developers cannot identify all infrastructure requirements upfront from architecture diagrams, leading to incremental discovery over 3-4 months (15-20 service requests per project, each taking 3-5 days).

**Solution:** Upload architecture diagram → AI analyzes → Generates complete Infrastructure BOM including network, security, and access requirements → One-time provisioning.

## 🚀 Key Features

### Primary User Flow (Use Case A)
1. **Upload Architecture** - Upload diagram with project details
2. **AI Analysis** - 9-step thinking process with live visualization (45-60 seconds)
3. **Review Service Requests** - Approve/edit/reject AI-generated SRs across categories
4. **BOM Preview** - Comprehensive multi-tab Bill of Materials
5. **Template Selection** - Choose from 3 pre-approved templates
6. **Provisioning** - Live progress tracking with category breakdown

### Pages Implemented

#### 📊 Dashboard/Home (`/`)
- Quick stats (pending requests, active environments, in-progress tasks)
- Recent activity feed
- Primary CTA: "Create New Environment"

#### 📤 Upload Architecture (`/upload-architecture`)
- Project name and environment type selection (Dev/QA/UAT/Prod)
- Architecture diagram upload (PDF, PNG, JPG)
- Optional comments field

#### 🤖 AI Analysis (`/ai-analysis`)
- **Split-view interface:**
  - Left: 9-step AI thinking process with status indicators
  - Right: Live output showing detected components and analysis
- Steps include:
  1. Vision LLM extracting components
  2. Referring to stored knowledge
  3. Mapping to AWS services
  4. Calculating resource sizing
  5. Generating firewall rules
  6. Looking up integration endpoints
  7. Determining access requirements
  8. Adding standard DevOps stack
  9. Generating service requests

#### ✅ Review Service Requests (`/review-service-requests`)
- Tabbed interface:
  - **Infrastructure** (ECS, RDS, etc.)
  - **Network & Security** (Firewall rules, IP whitelisting)
  - **Access & Identity** (AD groups, user access)
- Actions: Approve, Edit, Reject, Add Note
- Confidence scores for each SR
- Bulk actions to generate BOM

#### 💰 BOM Preview (`/bom-preview`)
- **Multi-tab Excel-like view:**
  - **Infrastructure** - Compute, storage, database resources
  - **Network & Security** - Firewall rules, DNS, SSL
  - **Access & Identity** - AD groups, permissions
  - **Integrations** - External API endpoints
- Cost breakdown with monthly estimates (INR)
- Download Excel functionality
- Region: Asia Pacific (Mumbai) - ap-south-1

#### 🎯 Template Selection (`/template-selection`)
- 3 pre-approved templates:
  1. **Recommended** (95% match) - Full-stack web application
  2. **Cost-Optimized** (88% match) - Basic web application
  3. **Basic** (82% match) - Minimal infrastructure
- Comparison matrix showing match score, coverage, resources, compliance
- Detailed cost breakdown for each template

#### ⚙️ Provisioning Dashboard (`/provisioning`)
- Live progress tracking (updates every 5 seconds)
- Category-wise breakdown:
  - Infrastructure (6 tasks)
  - Network & Security (5 tasks)
  - Access & Identity (3 tasks)
  - Integrations (2 tasks)
- ETA calculation
- Success notification when complete

#### 🏢 All Environments (`/environments`)
- Table view with filters (status, type)
- Columns: Name, Project, Type, Status, Resources, Cost, Health, Created
- Summary stats: Active, Provisioning, Total Resources, Total Cost
- Health indicators with progress bars

#### 📋 All Service Requests (`/service-requests`)
- Table view with filters (status, type, priority)
- Columns: ID, Type, Title, Status, Priority, Pending On, Created
- Summary stats by status (Pending, Approved, In Progress, Completed)
- Detailed tracking for each SR

#### ➕ New Request (`/new-request`)
- Three options:
  1. **Upload Architecture** (Recommended)
  2. **AI Assistant** (Coming soon - chat interface)
  3. **Manual Forms** (Coming soon - traditional forms)

#### 📚 Knowledge Base (`/knowledge-base`)
- **Read-only access** to:
  - **Stored Architectures** - Previously analyzed diagrams
  - **Stored BOMs** - Generated Bill of Materials
  - **Integration Catalog** - External API endpoints with auth details

## 🎨 Design & Branding

### Maruti Suzuki Color Palette
- **Primary Red**: `#DA241C` - CTAs, important alerts
- **Primary Blue**: `#01458E` - Headers, navigation, primary buttons
- **NEXA Blue**: `#0066CC` - Premium features, AI indicators
- **Corporate Black**: `#1F1A17` - Text, headers, borders

### Status Colors
- **Success**: `#51CF66` - Active, approved, completed
- **Warning**: `#FFC107` - Pending, review needed
- **Error**: `#DA241C` - Failed, rejected, critical
- **Info**: `#4DABF7` - In progress, processing
- **Premium**: `#9775FA` - Analytics, premium features

### Design Theme
**Professional Arena** - Combines Arena's accessibility and functionality with NEXA's modern sophistication, tailored for enterprise IT professionals.

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives + shadcn/ui pattern
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge
- **Font**: System font stack (optimized for performance)

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd maruti-prototype

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 📂 Project Structure

```
maruti-prototype/
├── src/
│   ├── app/                          # Next.js app router pages
│   │   ├── page.tsx                  # Dashboard/Home
│   │   ├── upload-architecture/      # Architecture upload
│   │   ├── ai-analysis/              # AI thinking process
│   │   ├── review-service-requests/  # SR review & approval
│   │   ├── bom-preview/              # BOM multi-tab view
│   │   ├── template-selection/       # Template comparison
│   │   ├── provisioning/             # Provisioning dashboard
│   │   ├── environments/             # All environments table
│   │   ├── service-requests/         # All SRs table
│   │   ├── new-request/              # Request creation options
│   │   ├── knowledge-base/           # Knowledge base view
│   │   ├── layout.tsx                # Root layout with sidebar
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── layout/                   # Layout components
│   │   │   └── sidebar.tsx           # Navigation sidebar
│   │   └── ui/                       # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── tabs.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   └── mock-data.ts              # Mock data for demo
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🎭 Mock Data

The prototype uses realistic mock data to demonstrate functionality:

### Environments
- **Project Alpha - Development** (Active, 12 resources, ₹485.67/month, 98% health)
- **Project Beta - QA** (Provisioning, 8 resources, ₹320.45/month, 85% health)
- **Project Gamma - Production** (Active, 24 resources, ₹1,250.89/month, 99% health)
- **Project Delta - UAT** (Partial, 10 resources, ₹425.30/month, 75% health)

### Service Requests
- Infrastructure provisioning (ECS cluster, RDS database)
- Firewall rules (payment gateway, application servers)
- Access management (AD groups, user permissions)
- Network configuration (NAT gateway, load balancers)

### Infrastructure BOM Items
Standard DevOps stack always included:
- **Prifunl VPN** (t3a.micro, 50GB) - ₹9.09/month
- **Jenkins** (t4g.medium, 100GB) - ₹27.08/month
- **Terraform** (t4g.small, 50GB) - ₹12.74/month
- **ELK** (t4g.medium, 100GB) - ₹22.52/month
- **Airflow** (t4g.medium, 50GB) - ₹17.96/month

Plus application-specific resources:
- Application servers (ECS, EC2)
- Databases (RDS PostgreSQL)
- Cache (ElastiCache Redis)
- Network infrastructure (ALB, NAT Gateway, Route 53)
- Storage (S3)

### Integration Catalog
- **Payment Gateway** - Razorpay (https://api.razorpay.com:443, API Key)
- **SMS Provider** - Twilio (https://api.twilio.com:443, OAuth 2.0)
- **Email Service** - SendGrid (https://api.sendgrid.com:443, API Key)
- **CRM** - Salesforce (https://api.salesforce.com:443, OAuth 2.0)

## 🎬 Demo User Flow

1. **Start**: Navigate to Dashboard (`/`)
2. **Click**: "Create New Environment" button
3. **Upload**: Fill form and upload architecture diagram
4. **Watch**: AI analysis process (9 steps, ~45 seconds)
5. **Review**: Approve/edit service requests across 3 tabs
6. **Generate**: Click "Generate Infrastructure BOM"
7. **Preview**: Review BOM across 4 tabs (Infrastructure, Network, Access, Integrations)
8. **Select**: Choose from 3 matched templates
9. **Submit**: Submit for approval
10. **Monitor**: Track provisioning progress in real-time
11. **Complete**: View active environment in environments list

## 🌟 Key Highlights

### AI Thinking Process Visualization
- **Transparent AI**: Users see exactly what AI is doing at each step
- **Live Updates**: Real-time output display as AI analyzes
- **Confidence Scores**: Each generated SR shows AI confidence (88-96%)

### Comprehensive BOM
Goes beyond traditional infrastructure:
- ✅ Compute, storage, database resources
- ✅ Firewall rules and network security
- ✅ IP whitelisting requirements
- ✅ AD groups and access controls
- ✅ External integration endpoints
- ✅ DNS and SSL certificates

### Pre-Approved Templates
- Matched using AI based on architecture
- Shows compliance status
- Cost comparison
- Coverage analysis

### Real-Time Provisioning
- Live progress updates
- Category-wise breakdown
- ETA calculation
- Activity logs

## 📊 Business Impact

### Before (Manual Process)
- **Time**: 3-4 months of delays
- **SRs**: 15-20 incremental service requests
- **Approval Time**: 3-5 days per SR
- **Visibility**: No end-to-end tracking
- **Cost Overruns**: Unpredictable due to delays

### After (AI-Powered)
- **Time**: 45-60 seconds for complete BOM
- **SRs**: All requirements identified upfront
- **Approval**: Batch approval possible
- **Visibility**: Complete traceability
- **Cost**: Predictable with upfront estimates

### Metrics
- ⏱️ **99% faster** BOM generation (45 seconds vs 2-4 hours)
- 📉 **90% reduction** in timeline variance
- ✅ **100% completeness** - no incremental discoveries
- 💰 **Cost estimates** upfront in INR

## 🔮 Future Enhancements

### Phase 2 (Not in POC)
- **AI Chat Interface**: Conversational SR creation
- **Manual Forms**: Traditional SR forms for all types
- **iSERV Integration**: Auto-fill and submit to actual SR system
- **Approval Workflows**: Integrate with actual approval matrix
- **Provisioning Automation**: Actual AWS resource creation
- **Release Orchestration**: Coordinated deployment automation

### Production Requirements
- Real architecture diagram analysis using Vision LLM
- Integration with Maruti's systems:
  - Demand Governance Portal
  - JIRA
  - iSERV
  - Active Directory
  - Firewall devices
  - DNS systems
- Actual AWS provisioning with Terraform
- Authentication & authorization
- Audit logging
- Notification system

## 📝 Notes

- This is a **prototype/POC** demonstrating the core concept
- All data is **mock data** for demonstration purposes
- No actual provisioning or external API calls are made
- Focus is on **UX/UI and workflow** validation
- Designed based on comprehensive discovery calls with Maruti Suzuki

## 🤝 Contributing

This is a prototype project. For production implementation, please contact the development team.

## 📄 License

Proprietary - Maruti Suzuki Limited

---

**Built with ❤️ for Maruti Suzuki by UnifyApps**

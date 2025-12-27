import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, FileCode } from "lucide-react"

const templates = [
  {
    id: "maruti-standard-vpc-v2.0.0",
    category: "Network",
    name: "maruti-standard-vpc-v2.0.0",
    approval: "Pre-Approved",
    version: "2.0.0",
    lastUpdated: "2025-01-15",
    description:
      "Creates Maruti standard VPC with 8 subnets: Public subnets for Load Balancers, Private subnets for Applications, Database subnets for RDS/Aurora, Cache subnets for ElastiCache",
    parameters: [
      { name: "vpc_id", type: "number", required: true, description: "VPC ID (0-255)" },
      { name: "environment", type: "string", required: true, description: "prod/uat/dev/sandbox" },
      { name: "project_name", type: "string", required: true, description: "Project identifier" },
    ],
  },
  {
    id: "maruti-rds-postgres-v3.1.0",
    category: "Database",
    name: "maruti-rds-postgres-v3.1.0",
    approval: "Requires DBA Approval",
    version: "3.1.0",
    lastUpdated: "2025-01-10",
    description:
      "Provisions PostgreSQL RDS instance with Multi-AZ support, automated backups, and encryption at rest.",
    parameters: [
      { name: "instance_class", type: "string", required: true, description: "db.t4g.small, db.t4g.medium, etc." },
      { name: "storage_gb", type: "number", required: true, description: "Storage size in GB" },
      { name: "multi_az", type: "boolean", required: false, description: "Enable Multi-AZ deployment" },
    ],
  },
  {
    id: "maruti-rds-mysql-v2.8.0",
    category: "Database",
    name: "maruti-rds-mysql-v2.8.0",
    approval: "Requires DBA Approval",
    version: "2.8.0",
    lastUpdated: "2024-12-20",
    description:
      "Provisions MySQL RDS instance with Multi-AZ support, automated backups, and encryption at rest.",
    parameters: [
      { name: "instance_class", type: "string", required: true, description: "db.t4g.small, db.t4g.medium, etc." },
      { name: "storage_gb", type: "number", required: true, description: "Storage size in GB" },
    ],
  },
  {
    id: "maruti-alb-standard-v1.9.0",
    category: "Network",
    name: "maruti-alb-standard-v1.9.0",
    approval: "Pre-Approved",
    version: "1.9.0",
    lastUpdated: "2025-01-12",
    description:
      "Creates Application Load Balancer with SSL/TLS termination, health checks, and target groups.",
    parameters: [
      { name: "scheme", type: "string", required: true, description: "internet-facing or internal" },
      { name: "certificate_arn", type: "string", required: false, description: "ACM certificate ARN" },
    ],
  },
  {
    id: "maruti-ecs-fargate-v2.5.0",
    category: "Compute",
    name: "maruti-ecs-fargate-v2.5.0",
    approval: "Pre-Approved",
    version: "2.5.0",
    lastUpdated: "2025-01-08",
    description:
      "Provisions ECS Fargate cluster with auto-scaling, service discovery, and CloudWatch logging.",
    parameters: [
      { name: "cpu", type: "number", required: true, description: "CPU units (256, 512, 1024, etc.)" },
      { name: "memory", type: "number", required: true, description: "Memory in MB" },
      { name: "desired_count", type: "number", required: true, description: "Number of tasks" },
    ],
  },
  {
    id: "maruti-redis-v1.8.0",
    category: "Cache",
    name: "maruti-redis-v1.8.0",
    approval: "Pre-Approved",
    version: "1.8.0",
    lastUpdated: "2024-12-15",
    description:
      "Creates ElastiCache Redis cluster with automatic failover and encryption in transit.",
    parameters: [
      { name: "node_type", type: "string", required: true, description: "cache.t4g.micro, cache.t4g.small, etc." },
      { name: "num_cache_nodes", type: "number", required: false, description: "Number of cache nodes" },
    ],
  },
  {
    id: "maruti-firewall-app-to-db-v1.0.0",
    category: "Firewall",
    name: "maruti-firewall-app-to-db-v1.0.0",
    approval: "Pre-Approved Pattern",
    version: "1.0.0",
    lastUpdated: "2024-11-20",
    description:
      "Creates security group rule allowing application servers to access database instances.",
    parameters: [
      { name: "source_sg_id", type: "string", required: true, description: "Source security group ID" },
      { name: "dest_sg_id", type: "string", required: true, description: "Destination security group ID" },
    ],
  },
  {
    id: "maruti-iam-ecs-secrets-v1.2.0",
    category: "IAM",
    name: "maruti-iam-ecs-secrets-v1.2.0",
    approval: "Requires Security Approval",
    version: "1.2.0",
    lastUpdated: "2025-01-05",
    description:
      "Creates IAM policy allowing ECS tasks to read secrets from Secrets Manager.",
    parameters: [
      { name: "role_name", type: "string", required: true, description: "IAM role name" },
      { name: "secret_arns", type: "list", required: true, description: "List of secret ARNs" },
    ],
  },
  {
    id: "maruti-razorpay-v1.2.0",
    category: "Integration",
    name: "maruti-razorpay-v1.2.0",
    approval: "Pre-Approved Integration",
    version: "1.2.0",
    lastUpdated: "2024-12-10",
    description:
      "Configures Razorpay payment gateway integration with webhook endpoints and firewall rules.",
    parameters: [
      { name: "webhook_path", type: "string", required: true, description: "Webhook endpoint path" },
      { name: "alb_arn", type: "string", required: true, description: "ALB ARN for webhook" },
    ],
  },
]

export default function TemplatesPage() {
  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  }, {} as Record<string, typeof templates>)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">
          Terraform Templates Reference
        </h1>
        <p className="mt-2 text-gray-600">
          Browse all available Terraform templates and their configurations
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search templates..." className="pl-10" />
        </div>
      </div>

      {/* Templates by Category */}
      <div className="space-y-8">
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <div key={category}>
            <h2 className="mb-4 text-xl font-bold text-maruti-black bg-gray-100 p-3 rounded">
              {category === "Network" && "🌐"} {category === "Database" && "💾"}{" "}
              {category === "Compute" && "🖥️"} {category === "Cache" && "🔄"}{" "}
              {category === "Firewall" && "🔥"} {category === "IAM" && "🔐"}{" "}
              {category === "Integration" && "🔌"} {category.toUpperCase()}{" "}
              TEMPLATES
            </h2>

            <div className="space-y-4">
              {categoryTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-mono">
                          {template.name}
                        </CardTitle>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              template.approval.includes("Pre-Approved")
                                ? "success"
                                : "warning"
                            }
                          >
                            {template.approval}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Version: {template.version}
                          </span>
                          <span className="text-sm text-gray-500">
                            Last Updated: {template.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-sm">Description:</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {template.description}
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-2">Parameters:</p>
                      <div className="space-y-2">
                        {template.parameters.map((param, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg bg-gray-50 p-3 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-maruti-blue">
                                {param.name}
                              </code>
                              <Badge variant="outline" className="text-xs">
                                {param.type}
                              </Badge>
                              {param.required && (
                                <Badge variant="error" className="text-xs">
                                  required
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1 text-gray-600">
                              {param.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileCode className="mr-2 h-4 w-4" />
                        View Source
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Award,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Globe,
  FileText,
} from "lucide-react";

interface CertificateTableProps {
  searchQuery?: string;
}

const CertificateTable = ({ searchQuery = "" }: CertificateTableProps) => {
  type CertificateItem = {
    id: number;
    image: string;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    verificationUrl?: string;
    skills: string[];
    status: "active" | "expired" | "pending";
  };

  // Sample certificate data
  const data: CertificateItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      credentialId: "AWS-ASA-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      verificationUrl: "https://verify.aws.amazon.com/cert/123456",
      skills: ["Cloud Computing", "AWS", "Architecture", "DevOps"],
      status: "active",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud Platform",
      issueDate: "2023-08-20",
      expiryDate: "2025-08-20",
      credentialId: "GCP-PD-789012",
      credentialUrl: "https://cloud.google.com/credentials",
      verificationUrl: "https://cloud.google.com/verify/789012",
      skills: ["Google Cloud", "Development", "Kubernetes", "APIs"],
      status: "active",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592210454359-801627e67647?w=800&h=600&fit=crop",
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      issueDate: "2022-12-10",
      expiryDate: "2024-12-10",
      credentialId: "MS-AZ-345678",
      credentialUrl: "https://learn.microsoft.com/certifications",
      verificationUrl: "https://learn.microsoft.com/verify/345678",
      skills: ["Azure", "Cloud Basics", "Networking", "Security"],
      status: "expired",
    },
  ];

  // Filter certificates based on search query
  const filteredCertificates = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (certificate) =>
        certificate.title.toLowerCase().includes(query) ||
        certificate.issuer.toLowerCase().includes(query) ||
        certificate.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        ) ||
        certificate.status.toLowerCase().includes(query) ||
        (certificate.credentialId &&
          certificate.credentialId.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "expired":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Certificate
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Issuer
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Issue Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Expiry Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Skills
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <tr
                  key={certificate.id}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={certificate.image}
                          alt={certificate.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{certificate.title}</div>
                        {certificate.credentialId && (
                          <div className="text-xs text-muted-foreground font-mono">
                            {certificate.credentialId}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{certificate.issuer}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant="secondary"
                      className={`flex items-center gap-1 w-fit ${getStatusBadgeVariant(
                        certificate.status
                      )}`}
                    >
                      {getStatusIcon(certificate.status)}
                      {certificate.status.charAt(0).toUpperCase() +
                        certificate.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {certificate.issueDate}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-1 text-sm">
                      {certificate.expiryDate ? (
                        <>
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span
                            className={
                              certificate.status === "expired"
                                ? "text-red-600 dark:text-red-400"
                                : "text-muted-foreground"
                            }
                          >
                            {certificate.expiryDate}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">No expiry</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.slice(0, 2).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {certificate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{certificate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Certificate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        {certificate.verificationUrl && (
                          <DropdownMenuItem>
                            <Globe className="w-4 h-4 mr-2" />
                            Verify Online
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Certificate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Certificate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No certificates found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Try adjusting your search criteria or add a new
                      certificate.
                    </p>
                    <Button size="sm">Add Certificate</Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateTable;

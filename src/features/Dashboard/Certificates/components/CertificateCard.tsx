import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Award,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface CertificateCardProps {
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
}

const CertificateCard = ({
  image,
  title,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  verificationUrl,
  skills,
  status,
}: CertificateCardProps) => {
  const certificateVariants: any = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />;
      case "expired":
        return <Clock className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      default:
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  return (
    <motion.div variants={certificateVariants}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
        {/* Certificate Image with Overlay */}
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                {credentialUrl && (
                  <Button size="sm" variant="secondary" className="h-8 px-3">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                )}
                {verificationUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verify
                  </Button>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className={`bg-black/50 text-white border-none flex items-center gap-1`}
            >
              {getStatusIcon(status)}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          {/* Options Menu */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Certificate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Certificate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="p-5">
          {/* Title and Issuer */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Award className="w-3 h-3" />
              {issuer}
            </p>
          </div>

          {/* Date Information */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Issued: {issueDate}</span>
            </div>
            {expiryDate && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Expires: {expiryDate}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{skills.length - 3}
              </Badge>
            )}
          </div>

          {/* Credential ID and Links */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex gap-3">
              {credentialId && (
                <span className="font-mono">ID: {credentialId}</span>
              )}
              {verificationUrl && (
                <a
                  href={verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe className="w-3 h-3" />
                  Verify
                </a>
              )}
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>Certificate</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;

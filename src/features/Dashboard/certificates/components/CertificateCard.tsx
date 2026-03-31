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
  Star,
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
import { Link } from "@/i18n/navigation";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

interface CertificateCardProps {
  id: string;
  image: string;
  title: string;
  lecture: string;
  url: string;
  complete_date: string;
  technologies: string;
  is_featured?: boolean;
}

const CertificateCard = ({
  id,
  image,
  title,
  lecture,
  url,
  complete_date,
  technologies,
  is_featured = false,
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

  const { mutate } = useSWRConfig();

  const deleteCertificate = async () => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) {
      return;
    }
    try {
      await api.delete(`/certificate/${id}`);
      toast.success("Certificate deleted successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "certificate");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };
 
  const handleToggleFeatured = async () => {
    try {
      await api.put(`/certificate/featured/${id}`);
      toast.success("Certificate featured status updated successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "certificate");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
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
                {url && (
                  <Link href={url} target="_blank">
                    <Button size="sm" variant="secondary" className="h-8 px-3">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

 
          {/* Featured Toggle */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 rounded-full shadow-lg transition-all duration-300 ${
                is_featured 
                ? "bg-yellow-400 text-white hover:bg-yellow-500 scale-110" 
                : "bg-black/50 text-white hover:bg-black/70"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFeatured();
              }}
            >
              <Star className={`w-4 h-4 ${is_featured ? "fill-current" : ""}`} />
            </Button>
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
                <Link href={`/dashboard/certificates/edit/${id}`}>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Certificate
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={deleteCertificate}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Certificate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="p-5 pb-0">
          {/* Title and Issuer */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Award className="w-3 h-3" />
              {lecture}
            </p>
          </div>

          {/* Date Information */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Issued: {complete_date}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {technologies.split("/").map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;

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
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Switch } from "@/components/ui/switch";

interface CertificateTableProps {
  data: any[];
  isLoading: boolean;
}

const CertificateTable = ({ data, isLoading }: CertificateTableProps) => {
  const { mutate } = useSWRConfig();

  const deleteCertificate = async (id: string) => {
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

  const handleToggleFeatured = async (id: string) => {
    try {
      await api.put(`/certificate/featured/${id}`);
      toast.success("Certificate featured status updated successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "certificate");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const router = useRouter();

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
                Issue Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Skills
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Is Featured
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((certificate) => (
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
                      <span className="text-base font-medium ">
                        {certificate.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{certificate.lecture}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {certificate.complete_date}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {certificate.technologies
                        .split("/")
                        .slice(0, 3)
                        .map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      {certificate.technologies.split("/").length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{certificate.technologies.split("/").length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Switch
                      checked={certificate.is_featured}
                      onCheckedChange={() =>
                        handleToggleFeatured(certificate.id)
                      }
                    />
                  </td>
                  <td className="p-4 align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={certificate.url} target="_blank">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Certificate
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link
                          href={`/dashboard/certificates/edit/${certificate.id}`}
                        >
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Certificate
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => deleteCertificate(certificate.id)}
                        >
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
                    <Button
                      onClick={() =>
                        router.push("/dashboard/certificates/create")
                      }
                      size="sm"
                    >
                      Add Certificate
                    </Button>
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

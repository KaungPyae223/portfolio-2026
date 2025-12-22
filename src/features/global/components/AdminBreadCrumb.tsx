"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadCrumbStore } from "@/store/useBreadCrumbStroe";

const AdminBreadCrumb = () => {
  const { breadCrumbContent } = useBreadCrumbStore();

  if (breadCrumbContent.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbContent.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {index === breadCrumbContent.length - 1 ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadCrumbContent.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadCrumb;

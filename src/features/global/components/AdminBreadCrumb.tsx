"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDashboardStore } from "@/store/useDashboardStroe";

const AdminBreadCrumb = () => {
  const { breadCrumbContent, title } = useDashboardStore();

  console.log(title);

  return (
    <>
      {breadCrumbContent.length > 2 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumbContent.map((item, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {index === breadCrumbContent.length - 1 ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.link}>
                      {item.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadCrumbContent.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <p className="text-lg font-semibold ms-auto">{title}</p>
    </>
  );
};

export default AdminBreadCrumb;

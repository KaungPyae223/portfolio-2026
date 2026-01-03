import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { api, formApi } from "@/services/api";
import { mutate } from "swr";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";

interface CVFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}

const CVInfo = ({ cvURL }: { cvURL: string }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadCV = async (url: string, filename = "kaung pyae aung cv.pdf") => {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);

    try {
      const form = new FormData();
      form.set("cv", file);

      await formApi.patch("/home-management/upload-cv", form);

      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success("CV uploaded successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to upload CV";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your CV?")) {
      return;
    }

    setIsDeleting(true);

    try {
      await api.delete("/home-management/delete-cv");

      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success("CV deleted successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete CV";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">CV Management</h2>
        <p className="text-sm text-muted-foreground">
          Upload and manage your CV documents
        </p>
      </div>

      {/* Current CV */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Current CV</h3>
          {cvURL && (
            <Badge variant="outline" className="text-xs">
              Active
            </Badge>
          )}
        </div>

        {cvURL ? (
          <Item
            variant="muted"
            className="bg-linear-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 transition-all duration-200"
          >
            <ItemContent className="flex-1">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  {(isUploading || isDeleting) && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 rounded-md flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                    </div>
                  )}
                  <div className="w-32 h-32 rounded-md object-cover border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105 bg-green-100 flex items-center justify-center">
                    <FileText className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {isUploading && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="text-sm text-blue-600">
                          Uploading...
                        </span>
                      </>
                    )}
                    {isDeleting && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                        <span className="text-sm text-red-600">
                          Deleting...
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </ItemContent>
            <ItemActions className="flex gap-2">
              <Button
                onClick={() => downloadCV(cvURL)}
                variant="outline"
                size="icon"
                className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                disabled={isUploading || isDeleting}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                onClick={handleDelete}
                disabled={isUploading || isDeleting}
                aria-label="Delete CV"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </ItemActions>
          </Item>
        ) : (
          <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium mb-1">No CV uploaded</p>
            <p className="text-sm text-gray-500">
              Upload your CV to showcase your qualifications
            </p>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
          {cvURL ? "Change CV" : "Upload CV"}
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 relative ${
            isDragging
              ? "border-green-400 bg-green-50 scale-[1.02]"
              : isUploading
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
              <p className="text-sm font-medium text-blue-600 mb-2">
                Uploading CV...
              </p>
            </div>
          )}

          <Upload
            className={`mx-auto h-12 w-12 mb-4 transition-colors ${
              isUploading
                ? "text-blue-400"
                : isDragging
                ? "text-green-500"
                : "text-gray-400"
            }`}
          />
          <p
            className={`text-sm mb-2 ${
              isUploading
                ? "text-blue-600"
                : isDragging
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {isUploading
              ? "Processing your CV..."
              : isDragging
              ? "Drop your CV here"
              : "Drag and drop your CV here, or click to browse"}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            PDF files only (Max 10MB)
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mb-2"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Choose CV
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default CVInfo;

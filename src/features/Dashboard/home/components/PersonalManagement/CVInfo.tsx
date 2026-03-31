import React, { useState, useRef, Ref } from "react";
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

const CVInfo = ({ allCVs }: { allCVs: any }) => {
  const japaneseCV = allCVs?.find(
    (data: any) => data.category == "cv-Japanese",
  );

  const englishCV = allCVs?.find((data: any) => data.category == "cv-English");

  const [isDragging, setIsDragging] = useState<{
    Japanese: boolean;
    English: boolean;
  }>({ Japanese: false, English: false });
  const [isUploading, setIsUploading] = useState<{
    Japanese: boolean;
    English: boolean;
  }>({ Japanese: false, English: false });
  const [isDeleting, setIsDeleting] = useState<{
    Japanese: boolean;
    English: boolean;
  }>({ Japanese: false, English: false });
  const JapaneseFileInputRef = useRef<HTMLInputElement>(null);
  const EnglishFileInputRef = useRef<HTMLInputElement>(null);

  const downloadCV = async (
    url: string,
    filename = "kaung pyae aung cv.pdf",
  ) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (
    files: FileList | null,
    language: "Japanese" | "English",
  ) => {
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

    setIsUploading((prev) => ({ ...prev, [language]: true }));

    try {
      const form = new FormData();
      form.set("cv", file);
      form.set("language", language);

      await formApi.patch("/home-management/upload-cv", form);

      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success(
        `${
          language === "Japanese" ? "Japanese" : "English"
        } CV uploaded successfully`,
      );
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to upload CV";
      toast.error(message);
    } finally {
      setIsUploading((prev) => ({ ...prev, [language]: false }));
    }
  };

  const handleDragOver = (
    e: React.DragEvent,
    language: "Japanese" | "English",
  ) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [language]: true }));
  };

  const handleDragLeave = (
    e: React.DragEvent,
    language: "Japanese" | "English",
  ) => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [language]: false }));
  };

  const handleDrop = (e: React.DragEvent, language: "Japanese" | "English") => {
    e.preventDefault();
    setIsDragging((prev) => ({ ...prev, [language]: false }));
    handleFileUpload(e.dataTransfer.files, language);
  };

  const handleDelete = async (language: "Japanese" | "English") => {
    if (
      !window.confirm(
        `Are you sure you want to delete your ${
          language === "Japanese" ? "Japanese" : "English"
        } CV?`,
      )
    ) {
      return;
    }

    setIsDeleting((prev) => ({ ...prev, [language]: true }));

    try {
      await api.delete(`/home-management/delete-cv/${language}`);

      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success(
        `${
          language === "Japanese" ? "Japanese" : "English"
        } CV deleted successfully`,
      );
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete CV";
      toast.error(message);
    } finally {
      setIsDeleting((prev) => ({ ...prev, [language]: false }));
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

      {/* Japanese CV */}

      <CvContent
        title="🇯🇵 Japanese CV"
        cvData={japaneseCV}
        isUploading={isUploading}
        isDeleting={isDeleting}
        downloadCV={downloadCV}
        handleDelete={handleDelete}
        language={"Japanese"}
      />

      {/* English CV */}

      <CvContent
        title="🇺🇸 English CV"
        cvData={englishCV}
        isUploading={isUploading}
        isDeleting={isDeleting}
        downloadCV={downloadCV}
        handleDelete={handleDelete}
        language={"Japanese"}
      />

      {/* Upload Areas */}
      <div className="space-y-6">
        {/* Japanese Upload Area */}
        <UploadArea
          cv={englishCV}
          isDragging={isDragging}
          isUploading={isUploading}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          fileInputRef={JapaneseFileInputRef}
          handleFileUpload={handleFileUpload}
          language="Japanese"
        />

        {/* English Upload Area */}

        <UploadArea
          cv={englishCV}
          isDragging={isDragging}
          isUploading={isUploading}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          fileInputRef={EnglishFileInputRef}
          handleFileUpload={handleFileUpload}
          language="English"
        />
      </div>
    </div>
  );
};

const UploadArea = ({
  cv,
  isDragging,
  isUploading,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  fileInputRef,
  handleFileUpload,
  language,
}: {
  cv: any;
  isDragging: any;
  isUploading: any;
  handleDragOver: (
    e: React.DragEvent,
    language: "Japanese" | "English",
  ) => void;
  handleDragLeave: (
    e: React.DragEvent,
    language: "Japanese" | "English",
  ) => void;
  handleDrop: (e: React.DragEvent, language: "Japanese" | "English") => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (
    files: FileList | null,
    language: "Japanese" | "English",
  ) => void;
  language: "Japanese" | "English";
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 space-y-4">
      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
        {cv?.url ? `Change ${language} CV` : `Upload ${language} CV`}
      </h3>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 relative ${
          isDragging[language]
            ? "border-blue-400 bg-blue-50 scale-[1.02]"
            : isUploading[language]
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onDragOver={(e) => handleDragOver(e, language)}
        onDragLeave={(e) => handleDragLeave(e, language)}
        onDrop={(e) => handleDrop(e, language)}
      >
        {isUploading[language] && (
          <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
            <p className="text-sm font-medium text-blue-600 mb-2">
              Uploading {language} CV...
            </p>
          </div>
        )}

        <Upload
          className={`mx-auto h-12 w-12 mb-4 transition-colors ${
            isUploading[language]
              ? "text-blue-400"
              : isDragging[language]
                ? "text-blue-500"
                : "text-gray-400"
          }`}
        />
        <p
          className={`text-sm mb-2 ${
            isUploading[language]
              ? "text-blue-600"
              : isDragging[language]
                ? "text-blue-600"
                : "text-gray-600"
          }`}
        >
          {isUploading[language]
            ? `Processing your ${language} CV...`
            : isDragging[language]
              ? `Drop your ${language} CV here`
              : `Drag and drop your ${language} CV here, or click to browse`}
        </p>
        <p className="text-xs text-gray-500 mb-4">PDF files only (Max 10MB)</p>
        <Button
          variant="outline"
          onClick={() => fileInputRef?.current?.click()}
          className="mb-2"
          disabled={isUploading.English}
        >
          {isUploading.English ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Choose English CV
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileUpload(e.target.files, language)}
          className="hidden"
        />
      </div>
    </div>
  );
};

const CvEmptyState = ({ language }: { language: string }) => {
  return (
    <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
      <p className="text-gray-600 font-medium mb-1">
        No {language} CV uploaded
      </p>
      <p className="text-sm text-gray-500">
        Upload your {language} CV to showcase your qualifications
      </p>
    </div>
  );
};

const CvCard = ({
  cvData,
  isUploading,
  isDeleting,
  downloadCV,
  handleDelete,
  language,
}: {
  cvData: any;
  isUploading: any;
  isDeleting: any;
  downloadCV: (url: string, filename: string) => void;
  handleDelete: (language: "Japanese" | "English") => void;
  language: "Japanese" | "English";
}) => {
  return (
    <Item
      variant="muted"
      className="bg-linear-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300 transition-all duration-200"
    >
      <ItemContent className="flex-1">
        <div className="flex items-center gap-4">
          <div className="relative group">
            {(isUploading[language] || isDeleting[language]) && (
              <div className="absolute inset-0 bg-white bg-opacity-80 rounded-md flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              </div>
            )}
            <div className="w-32 h-32 rounded-md object-cover border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105 bg-red-100 flex items-center justify-center">
              <FileText className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {isUploading[language] && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-600">Uploading...</span>
                </>
              )}
              {isDeleting[language] && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                  <span className="text-sm text-red-600">Deleting...</span>
                </>
              )}
            </div>
          </div>
        </div>
      </ItemContent>
      <ItemActions className="flex gap-2">
        <Button
          onClick={() => downloadCV(cvData?.url!, language + "-cv.pdf")}
          variant="outline"
          size="icon"
          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
          disabled={isUploading[language] || isDeleting[language]}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
          onClick={() => handleDelete(language)}
          disabled={isUploading[language] || isDeleting[language]}
          aria-label="Delete CV"
        >
          {isDeleting.Japanese ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </ItemActions>
    </Item>
  );
};

const CvContent = ({
  cvData,
  isUploading,
  isDeleting,
  downloadCV,
  handleDelete,
  language,
  title,
}: {
  cvData: any;
  isUploading: any;
  isDeleting: any;
  downloadCV: (url: string, filename: string) => void;
  handleDelete: (language: "Japanese" | "English") => void;
  language: "Japanese" | "English";
  title: string;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {title}
        </h3>
        {cvData?.url && (
          <Badge variant="outline" className="text-xs">
            Active
          </Badge>
        )}
      </div>

      {cvData?.url ? (
        <CvCard
          cvData={cvData}
          isUploading={isUploading}
          isDeleting={isDeleting}
          downloadCV={downloadCV}
          handleDelete={handleDelete}
          language={language}
        />
      ) : (
        <CvEmptyState language={language} />
      )}
    </div>
  );
};

export default CVInfo;

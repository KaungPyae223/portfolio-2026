import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Trash2, Download } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface CVFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}

const CVInfo = () => {
  const [cvFiles, setCvFiles] = useState<CVFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    const newCV: CVFile = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toLocaleDateString(),
    };

    setCvFiles([...cvFiles, newCV]);
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

  const handleDelete = (id: string) => {
    setCvFiles(cvFiles.filter((cv) => cv.id !== id));
  };

  const formatFileSize = (size: string) => {
    return size;
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

      {/* Existing CV Files */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Uploaded CVs</h3>

        {cvFiles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p>No CV files uploaded yet</p>
          </div>
        ) : (
          cvFiles.map((cv) => (
            <Item
              key={cv.id}
              variant="muted"
              className="bg-linear-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 transition-colors"
            >
              <ItemContent className="flex-1">
                <ItemTitle className="text-gray-900 font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {cv.name}
                </ItemTitle>
                <ItemDescription className="text-gray-600 text-sm">
                  {formatFileSize(cv.size)} • Uploaded {cv.uploadDate}
                </ItemDescription>
              </ItemContent>
              <ItemActions className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                  onClick={() => handleDelete(cv.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </ItemActions>
            </Item>
          ))
        )}
      </div>

      {/* Upload Area */}
      <div className="rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
          Upload New CV
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your CV here, or click to browse
          </p>
          <p className="text-xs text-gray-500 mb-4">
            PDF files only (Max 10MB)
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mb-2"
          >
            Choose File
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

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Upload,
  Camera,
  Trash2,
  User,
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

const ProfilePicture = ({ profileURL }: { profileURL: string }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPEG, PNG, or WebP image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const form = new FormData();
      form.set("image", file);

      await formApi.patch("/home-management/upload-profile-image", form);

      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success("Profile picture uploaded successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to upload image";
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
    if (
      !window.confirm("Are you sure you want to delete your profile picture?")
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      await api.delete("/home-management/delete-profile-image");

      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success("Profile picture deleted successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete image";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Profile Picture</h2>
        <p className="text-sm text-muted-foreground">
          Upload and manage your profile picture
        </p>
      </div>

      {/* Current Profile Picture */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Current Picture</h3>
          {profileURL && (
            <Badge variant="outline" className="text-xs">
              Active
            </Badge>
          )}
        </div>

        {profileURL ? (
          <Item
            variant="muted"
            className="bg-linear-to-r from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 transition-all duration-200"
          >
            <ItemContent className="flex-1">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  {(isUploading || isDeleting) && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 rounded-md flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                    </div>
                  )}
                  <img
                    src={profileURL}
                    alt="Profile"
                    className="w-32 h-32 rounded-md object-cover border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                  />
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
            <ItemActions>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                onClick={handleDelete}
                disabled={isUploading || isDeleting}
                aria-label="Delete profile picture"
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
            <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium mb-1">No profile picture</p>
            <p className="text-sm text-gray-500">
              Upload a picture to personalize your profile
            </p>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
          {profileURL ? "Change Profile Picture" : "Upload Profile Picture"}
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 relative ${
            isDragging
              ? "border-purple-400 bg-purple-50 scale-[1.02]"
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
                Uploading picture...
              </p>
            </div>
          )}

          <Camera
            className={`mx-auto h-12 w-12 mb-4 transition-colors ${
              isUploading
                ? "text-blue-400"
                : isDragging
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          />
          <p
            className={`text-sm mb-2 ${
              isUploading
                ? "text-blue-600"
                : isDragging
                ? "text-purple-600"
                : "text-gray-600"
            }`}
          >
            {isUploading
              ? "Processing your image..."
              : isDragging
              ? "Drop your picture here"
              : "Drag and drop your picture here, or click to browse"}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            JPEG, PNG, or WebP (Max 5MB, Recommended: 400x400px)
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
                <Camera className="mr-2 h-4 w-4" />
                Choose Picture
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;

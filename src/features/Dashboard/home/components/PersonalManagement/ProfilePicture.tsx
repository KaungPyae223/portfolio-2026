import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Upload, Camera, Trash2, User } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface ProfilePictureFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  url: string;
}

const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] =
    useState<ProfilePictureFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPEG, PNG, or WebP image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newProfilePicture: ProfilePictureFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadDate: new Date().toLocaleDateString(),
        url: e.target?.result as string,
      };
      setProfilePicture(newProfilePicture);
    };
    reader.readAsDataURL(file);
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

  const handleDelete = () => {
    setProfilePicture(null);
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
        <h3 className="text-sm font-medium text-gray-700">Current Picture</h3>

        {profilePicture ? (
          <Item
            variant="muted"
            className="bg-linear-to-r from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 transition-colors"
          >
            <ItemContent className="flex-1">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={profilePicture.url}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>
                <div>
                  <ItemTitle className="text-gray-900 font-semibold">
                    {profilePicture.name}
                  </ItemTitle>
                  <ItemDescription className="text-gray-600 text-sm">
                    {profilePicture.size} • Uploaded {profilePicture.uploadDate}
                  </ItemDescription>
                </div>
              </div>
            </ItemContent>
            <ItemActions>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </ItemActions>
          </Item>
        ) : (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p>No profile picture uploaded</p>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
          {profilePicture ? "Change Profile Picture" : "Upload Profile Picture"}
        </h3>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-purple-400 bg-purple-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your picture here, or click to browse
          </p>
          <p className="text-xs text-gray-500 mb-4">
            JPEG, PNG, or WebP (Max 5MB, Recommended: 400x400px)
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mb-2"
          >
            <Camera className="mr-2 h-4 w-4" />
            Choose Picture
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

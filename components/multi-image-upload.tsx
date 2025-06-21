"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/services/upload";
import { File, X } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef } from "react";

// --- Types ---
interface MultiImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
  name?: string;
  imageRegex?: RegExp;
  accept?: string;
}

interface UploadedFile {
  id: string;
  url: string;
  progress: number;
  fileType: string;
  isUploading: boolean;
}

interface ImagePreviewProps {
  src: string;
  alt?: string;
  onDelete?: () => void;
  isUploading?: boolean;
  progress?: number;
  fileType: string;
}

// --- Image Preview Component ---
export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = "File preview",
  onDelete,
  isUploading = false,
  progress = 0,
  fileType,
}) => {
  const t = useTranslations("Basic");
  const isImage = fileType.startsWith("image/");
  return (
    <div
      className={cn(
        "duration-600 relative h-20 w-20 flex-shrink-0 rounded-md transition-all ease-in-out sm:h-24 sm:w-24",
      )}
    >
      {isImage ? (
        <img
          src={src}
          className="h-full w-full rounded-md object-cover transition-opacity duration-500 ease-in-out"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100">
          <File className="h-8 w-8 text-gray-500 sm:h-10 sm:w-10" />
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50">
          <span className="text-xs text-white sm:text-sm">{progress}%</span>
        </div>
      )}
      {onDelete && !isUploading && (
        <button
          onClick={onDelete}
          className="absolute right-1 top-1 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 focus:outline-none"
          aria-label={t("removeFile")}
          type="button"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      )}
    </div>
  );
};

// --- MultiImageUpload Component ---
export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  value = [],
  onChange,
  maxImages = 3,
  className,
  name,
  imageRegex = /\.(jpeg|jpg|png|gif|webp|avif)$/i,
  accept = "image/*",
}) => {
  const t = useTranslations("Basic");
  // Initialize state with value directly
  const [files, setFiles] = React.useState<UploadedFile[]>(() =>
    value.map((url, index) => ({
      id: `${index}-${Date.now()}`,
      url,
      deleteUrl: url,
      progress: 100,
      fileType: imageRegex.test(url)
        ? `image/${url.split(".").pop()?.toLowerCase() || "jpeg"}`
        : "application/octet-stream",
      isUploading: false,
    })),
  );

  const prevValueRef = useRef<string[]>(value);

  // Helper to map URLs to UploadedFile objects
  const mapToFiles = (urls: string[]): UploadedFile[] =>
    urls.map((url, index) => {
      const existing = files.find((f) => f.url === url);
      return (
        existing || {
          id: `${index}-${Date.now()}`,
          url,
          deleteUrl: url,
          progress: 100,
          fileType: imageRegex.test(url)
            ? `image/${url.split(".").pop()?.toLowerCase() || "jpeg"}`
            : "application/octet-stream",
          isUploading: false,
        }
      );
    });

  // Sync state with parent value and form state
  useEffect(() => {
    const valueChanged =
      JSON.stringify(value) !== JSON.stringify(prevValueRef.current);
    if (valueChanged) {
      setFiles(mapToFiles(value));
      prevValueRef.current = value;
    }

    const fileUrls = files.map((f) => f.url);
    if (JSON.stringify(fileUrls) !== JSON.stringify(prevValueRef.current)) {
      onChange(fileUrls);
      prevValueRef.current = fileUrls;
    }
  }, [value, files, onChange, imageRegex]);

  // Handle file upload
  const handleUpload = useCallback(
    (filesList: FileList) => {
      const fileArray = Array.from(filesList).slice(
        0,
        maxImages ? maxImages - files.length : undefined,
      );

      if (fileArray.length === 0 && maxImages) {
        console.warn(t("maxFilesAllowed", { maxImages: maxImages }));
        return;
      }

      const newFiles: UploadedFile[] = fileArray.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        url: URL.createObjectURL(file),
        progress: 0,
        fileType: file.type || "application/octet-stream",
        isUploading: true,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((newFile, index) => {
        const file = fileArray[index];

        const upload = async () => {
          try {
            const formData = new FormData();
            formData.append("for", "report-image");
            formData.append("file", file!);
            const res = await uploadImage(formData);
            if (res?.success) {
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === newFile.id ? { ...f, progress: 29 } : f,
                ),
              );
              setTimeout(() => {
                setFiles((prev) =>
                  prev.map((f) =>
                    f.id === newFile.id
                      ? {
                          ...f,
                          url: res?.data?.url!,
                          deleteUrl: res?.data?.url!,
                          isUploading: false,
                          progress: 100,
                        }
                      : f,
                  ),
                );
              }, 100);
            }
          } catch (error) {
            setFiles((prev) => prev.filter((f) => f.id !== newFile.id));
          } finally {
            if (newFile.url.startsWith("blob:"))
              URL.revokeObjectURL(newFile.url);
          }
        };
        upload();
      });
    },
    [files.length, maxImages, t],
  );

  // Handle file deletion
  const handleDeleteImage = useCallback(
    (id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [files],
  );

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.url.startsWith("blob:")) URL.revokeObjectURL(file.url);
      });
    };
  }, [files]);

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div className="flex flex-wrap gap-4">
        {(maxImages === undefined || files.length < maxImages) && (
          <Button
            type="button"
            variant="outline"
            className="h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24"
          >
            <label className="flex h-full w-full cursor-pointer items-center justify-center text-sm">
              {t("upload")}
              <input
                type="file"
                accept={accept}
                multiple
                className="hidden"
                max={maxImages}
                name={name}
                onChange={(e) =>
                  // is web and is webview do sth...
                  e.target.files?.length && handleUpload(e.target.files)
                }
              />
            </label>
          </Button>
        )}
        {files.map((file) => (
          <ImagePreview
            key={file.id}
            src={file.url}
            alt={`File ${file.id}`}
            fileType={file.fileType}
            isUploading={file.isUploading}
            progress={file.progress}
            onDelete={() => handleDeleteImage(file.id)}
          />
        ))}
      </div>
    </div>
  );
};

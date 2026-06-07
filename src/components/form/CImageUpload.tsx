import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Upload, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { ImageItem } from "@/types/CImageUploadTypes";
type ExistingImage = {
  preview: string;
  url: string;
  name?: string;
};
type Props = {
  name: string;
  label?: string;
  required?: boolean;
  imagesUrl?: ExistingImage[];
};

export default function CImageUpload({
  name,
  label,
  required,
  imagesUrl,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const addFiles = (
    files: FileList | File[],
    value: ImageItem[],
    onChange: (val: ImageItem[]) => void,
  ) => {
    const incoming: File[] = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );

    const updated: ImageItem[] = [...value, ...incoming];

    onChange(updated);
  };
  const getImageSrc = (img: ImageItem) => {
    if (img instanceof File) {
      return URL.createObjectURL(img);
    }

    return img.url;
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const images: ImageItem[] = imagesUrl || field.value || [];
        // console.log(images);

        const removeImage = (index: number) => {
          const updated = images.filter((_, i) => i !== index);
          field.onChange(updated);
        };

        return (
          <div className="space-y-3">
            {/* LABEL */}
            <div className="mb-1">
              {label && (
                <label className="text-sm font-medium">
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
            </div>

            {/* DROP ZONE */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);

                if (e.dataTransfer.files) {
                  addFiles(e.dataTransfer.files, images, field.onChange);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition min-h-[180px]
                ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/30 hover:border-primary/40"
                }`}
            >
              {/* INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files) {
                    addFiles(e.target.files, images, field.onChange);
                  }
                  e.target.value = "";
                }}
              />

              {/* EMPTY STATE */}
              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 h-[100px]">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Drag & drop images here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse
                    </p>
                  </div>
                </div>
              ) : (
                /* PREVIEW INSIDE DROP AREA */
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={getImageSrc(file)}
                        alt="preview"
                        fill
                        className="object-cover"
                      />

                      {/* REMOVE */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}

                  {/* ADD MORE */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-muted/40"
                  >
                    <ImagePlus />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}

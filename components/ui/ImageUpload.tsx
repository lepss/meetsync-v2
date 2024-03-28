import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export type ImageUploadProps = {
  onFormDataReady: (file: File | null) => void;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFormDataReady,
}) => {
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (file) {
      onFormDataReady(file);
    } else {
      onFormDataReady(null);
    }
  }, [file, onFormDataReady]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps({
          className:
            "w-full p-4 h-32 border-4 border-dashed border-muted-input rounded-lg  bg-muted flex justify-center items-center",
        })}
      >
        <input
          name="image"
          aria-describedby="image-error"
          {...getInputProps({})}
        />
        <p className="text-center text-sm text-muted-foreground">
          Drag &apos;n&apos; drop image here, or click to select image
        </p>
      </div>
      <div>
        <p className=" text-sm text-muted-foreground">
          Supported formats: *.png, *.gif, *.jpeg, *.jpg
        </p>
        {file && file.type.includes("image") && (
          <Image
            src={URL.createObjectURL(file)}
            alt="image preview"
            width="0"
            height="0"
            sizes="100vw"
            className="mt-2 h-auto w-1/3"
          />
        )}
      </div>
    </div>
  );
};

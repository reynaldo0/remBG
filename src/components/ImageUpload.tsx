// src/components/ImageUploader.tsx
import { CloudUploadIcon } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onDrop: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({ className: 'w-full max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-transform transform hover:scale-105 cursor-pointer' })}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon className="h-12 w-12 mx-auto mb-2 text-gray-600" />
      <p className="text-gray-600">Drag & drop your image here, or click to select</p>
    </div>
  );
};

export default ImageUploader;

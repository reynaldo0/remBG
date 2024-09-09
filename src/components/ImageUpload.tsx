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
    <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-300 p-6 rounded-lg bg-white shadow-md hover:border-blue-500 transition-colors' })}>
      <input {...getInputProps()} />
      <div className="text-center">
        <CloudUploadIcon className="h-12 w-12 mx-auto mb-2 text-gray-600" />
        <p className="text-gray-600">Drag & drop your image here, or click to select</p>
      </div>
    </div>
  );
};

export default ImageUploader;

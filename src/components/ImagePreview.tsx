// src/components/ImagePreview.tsx
import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <img src={imageUrl} alt="Preview" className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105" />
    </div>
  );
};

export default ImagePreview;

// src/components/RemoveBg.tsx
import ImagePreview from '@/components/ImagePreview';
import ImageUploader from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const RemoveBg: React.FC = () => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageBlob(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveBg = async () => {
    if (imageBlob) {
      const formData = new FormData();
      formData.append('image_file', imageBlob);

      setLoading(true);

      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': import.meta.env.VITE_REMOVE_BG_API_KEY as string,
          },
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          setResultUrl(URL.createObjectURL(blob));
        } else {
          console.error('Failed to remove background');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-6">
        {/* Upload Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <ImageUploader onDrop={handleDrop} />
          {imageUrl && (
            <div className="mt-6">
              <ImagePreview imageUrl={imageUrl} />
              <Button
                onClick={handleRemoveBg}
                className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 transition-all py-2"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Remove Background'}
              </Button>
            </div>
          )}
        </div>

        {/* Result Section */}
        {resultUrl && (
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md mt-6 md:mt-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Result</h2>
            <div className="w-full max-w-md mx-auto">
              <img
                src={resultUrl}
                alt="Result"
                className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBg;

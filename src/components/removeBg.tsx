import React, { useState, useRef } from 'react';
import { FaUpload, FaDownload, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const BackgroundRemover: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [removalLevel, setRemovalLevel] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setOriginalImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image_file', fileInputRef.current.files[0]);

      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        formData,
        {
          headers: {
            'X-Api-Key': import.meta.env.VITE_REMOVE_BG_API_KEY,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            size: 'auto',
            bg_removal_level: removalLevel,
          },
          responseType: 'blob', 
        }
      );

      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setEditedImage(imageUrl);  
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (editedImage) {
      const link = document.createElement('a');
      link.href = editedImage;
      link.download = 'edited-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetImage = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setRemovalLevel(50);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Remove Background</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div
            className="border-4 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition duration-300"
            onClick={() => fileInputRef.current?.click()}
            onKeyPress={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            tabIndex={0}
            role="button"
            aria-label="Upload image"
          >
            {originalImage ? (
              <img src={originalImage} alt="Original" className="max-w-full h-auto rounded" />
            ) : (
              <div className="py-16">
                <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-500">Click or drag to upload an image</p>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
            aria-label="Upload image"
          />
        </div>
        <div className="flex-1">
          <div className="border-4 border-dashed border-gray-300 rounded-lg p-4 text-center h-full flex items-center justify-center">
            {editedImage ? (
              <img src={editedImage} alt="Edited" className="max-w-full h-auto rounded" />
            ) : (
              <p className="text-gray-500">Edited image will appear here</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={removeBackground}
          disabled={!originalImage || isLoading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          aria-label="Remove background"
        >
          {isLoading ? 'Processing...' : 'Remove Background'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!editedImage}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          aria-label="Download edited image"
        >
          <FaDownload className="mr-2" /> Download
        </button>
        <button
          onClick={resetImage}
          disabled={!editedImage && !originalImage}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          aria-label="Reset image"
        >
          <FaTrash className="mr-2" /> Reset
        </button>
      </div>
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Use arrow keys to navigate. Press Enter to select. Use space bar to activate buttons.</p>
      </div>
    </div>
  );
};

export default BackgroundRemover;


import React from 'react';
import { Loader } from 'lucide-react';

interface PreloaderProps {
  fullScreen?: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center flex-col gap-4">
        <div className="animate-spin">
          <Loader className="h-12 w-12 text-blue-600" />
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin">
        <Loader className="h-8 w-8 text-blue-600" />
      </div>
    </div>
  );
};

export default Preloader;

import { AnimatePresence, easeIn, easeOut, motion } from "framer-motion";
import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ProjectDetailsImageExpand = ({
  selectedImage,
  setSelectedImage,
  images,
}: {
  selectedImage: number | null;
  setSelectedImage: (index: number | null) => void;
  images: any[];
}) => {
  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1,
      );
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1,
      );
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  return (
    <AnimatePresence>
      {selectedImage !== null && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]?.url}
              alt={`Image ${selectedImage + 1}`}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
            />

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-1 rounded-full">
                {images.map((_, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === selectedImage
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsImageExpand;

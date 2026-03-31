import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Tag } from "lucide-react";
import { useDetailsStore } from "@/store/useDetailsStore";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

const HomeProjectDetails = () => {
  const detailContainer = useRef<HTMLDivElement>(null);

  const { detailsContent } = useDetailsStore();

  useEffect(() => {
    const moveContainerX = gsap.quickTo(detailContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });

    const moveContainerY = gsap.quickTo(detailContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!detailContainer.current) return;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const { clientX, clientY } = e;

      if (clientX < windowWidth / 2) {
        moveContainerX(clientX + 20);
      } else {
        moveContainerX(clientX - detailContainer.current.clientWidth - 20);
      }

      if (clientY < windowHeight / 2) {
        moveContainerY(clientY + 20);
      } else {
        moveContainerY(clientY - detailContainer.current.clientHeight - 20);
      }

      if (clientY < detailContainer.current.clientHeight / 2) {
        moveContainerY(20);
      } else if (
        clientY >
        windowHeight - detailContainer.current.clientHeight / 2
      ) {
        moveContainerY(
          windowHeight - detailContainer.current.clientHeight - 20
        );
      } else {
        moveContainerY(clientY - detailContainer.current.clientHeight / 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [detailsContent]);

  const detailsVariants = {
    hidden: { opacity: 0, scale: 0.8, height: "300px" },
    visible: {
      opacity: 1,
      scale: 1,
      height: "auto",
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  if (!detailsContent) return null;

  return (
    <motion.div
      ref={detailContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={detailsVariants}
      onAnimationComplete={(variant) => {
        if (variant === "visible") {
          console.log("Details fully shown!");
        }
      }}
      className="fixed z-50 pointer-events-none w-[450px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={detailsContent.image}
          alt={detailsContent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white">
            {detailsContent.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {detailsContent.description}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {detailsContent.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Key Features
          </h4>
          <ul className="space-y-2">
            {detailsContent.features.map((feature: string) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-600 font-semibold dark:text-gray-300 text-center">
          Click to see more project details
        </p>
      </div>
    </motion.div>
  );
};

export default HomeProjectDetails;

"use client";
import gsap from "gsap";
import React, { useEffect } from "react";

const CertificateIntro = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".certificateIntro", {
        y: 50,
        duration: 1,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  });

  const title = "My Professional";

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-5xl flex items-center gap-4 font-medium text-center">
        {title.split(" ").map((word, index) => (
          <span key={index} className="certificateIntro">
            {word}
          </span>
        ))}
        <span className="rounded-lg certificateIntro p-3 px-6 font-medium bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
          Certificates
        </span>{" "}
      </div>
    </section>
  );
};

export default CertificateIntro;

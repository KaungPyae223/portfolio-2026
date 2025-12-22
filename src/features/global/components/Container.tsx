"use client";

import React, { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: 2,
      smoothTouch: 0.1,
      effects: true,
    });
  }, []);

  return (
    <div ref={wrapperRef}>
      <div
        className={`container mx-auto px-5 md:px-12 ${className} `}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;

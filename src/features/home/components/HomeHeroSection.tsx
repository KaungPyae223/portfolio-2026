"use client";

import gsap from "gsap";
import { Database, Layers, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type HomeHeroSectionProps = {
  prefix: string;
  name: string;
  title: string;
  content: string;
};

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
  prefix,
  name,
  title,
  content,
}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".name", { opacity: 0, y: 50 });
      gsap.set(".title", { opacity: 0, y: 50 });
      gsap.set(".content", { opacity: 0, y: 30 });
      gsap.set(".button", { opacity: 0, y: 30 });

      const tl = gsap.timeline();
      tl.to(".name", {
        delay: 0.3,
        duration: 0.5,
        stagger: 0.4,
        y: 0,
        opacity: 1,
        ease: "power3.out",
      })
        .to(".title", {
          delay: 0.1,
          duration: 0.5,
          stagger: 0.3,
          y: 0,
          opacity: 1,
          ease: "power3.out",
        })
        .to(".content", {
          delay: 0.2,
          duration: 0.3,
          stagger: 0.1,
          y: 0,
          opacity: 1,
          ease: "power3.out",
        })
        .to(".button", {
          delay: 0.2,
          duration: 0.3,
          stagger: 0.1,
          y: 0,
          opacity: 1,
          ease: "power3.out",
        });
    });

    return () => ctx.revert();
  }, []);

  const nameAnimate = useRef<GSAPTimeline>(null);

  useEffect(() => {
    nameAnimate.current = gsap
      .timeline({ repeat: -1, paused: true })
      .to(".name-word", {
        y: -10,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      })
      .to(".name-word", {
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.in",
      });
  }, []);

  const [aboutHover, setAboutHover] = useState(false);
  const [projectsHover, setProjectsHover] = useState(false);
  const [contentHover, setContentHover] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-16 mx-5 transition-colors duration-300">
      <div className="flex text-3xl md:text-5xl flex-col md:flex-row items-center">
        <p className="name p-5 dark:text-white font-semibold">{prefix}</p>
        <div
          onMouseEnter={() => nameAnimate.current?.play()}
          onMouseLeave={() => nameAnimate.current?.pause(0)}
          className="name space-x-3 flex flex-row  p-5 rounded-xl bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 font-semibold transition-colors duration-300"
        >
          {name.split(" ").map((word, index) => (
            <span key={index} className="inline-block name-word ">
              {word}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        animate={{
          fontSize: contentHover ? "2.3rem" : "3rem",
        }}
        className="space-x-3.5 career-info font-semibold  mt-9 mb-6 hidden md:block  dark:text-gray-100 transition-colors duration-300"
      >
        {title.split(" ").map((word, index) => (
          <span key={index} className="inline-block title ">
            {word}
          </span>
        ))}
      </motion.div>

      <motion.div
        onMouseEnter={() => setContentHover(true)}
        onMouseLeave={() => setContentHover(false)}
        animate={{
          fontSize: contentHover ? "1.3rem" : "1.125rem",
        }}
        className="md:w-2/3 content-container mx-auto hover:bg-gray-200 dark:hover:bg-gray-800 space-x-2 md:mt-3 mt-8 text-center  dark:text-gray-300 transition-colors duration-300 rounded-xl px-4 py-3"
      >
        {content.split(" ").map((word, index) => (
          <span key={index} className="inline-block content">
            {word}
          </span>
        ))}
      </motion.div>

      <div className=" mt-10 flex flex-wrap justify-center gap-6">
        <Link
          href={"/about"}
          onMouseEnter={() => setAboutHover(true)}
          onMouseLeave={() => setAboutHover(false)}
          className="bg-yellow-300 flex items-center button hover:text-white hover:bg-yellow-600  text-black  font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: aboutHover ? 1 : 0,
              width: aboutHover ? "auto" : 0,
            }}
            transition={{
              opacity: { duration: 0.2, delay: aboutHover ? 0.2 : 0 },
              width: { duration: 0.2, delay: aboutHover ? 0 : 0.2 },
            }}
          >
            <User className="mr-2" />
          </motion.div>
          About Me
        </Link>
        <Link
          href={"/"}
          onMouseEnter={() => setProjectsHover(true)}
          onMouseLeave={() => setProjectsHover(false)}
          className="flex items-center button font-semibold py-3 px-6 rounded-lg transition-all duration-300 bg-gray-100 text-gray-800 border border-gray-300 hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: projectsHover ? 1 : 0,
              width: projectsHover ? "auto" : 0,
            }}
            transition={{
              opacity: { duration: 0.2, delay: projectsHover ? 0.2 : 0 },
              width: { duration: 0.2, delay: projectsHover ? 0 : 0.2 },
            }}
          >
            <Layers className="mr-2" />
          </motion.div>
          View My Projects
        </Link>
      </div>
    </section>
  );
};

export default HomeHeroSection;

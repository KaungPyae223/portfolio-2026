import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const AboutIntro = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const aboutIntroTimeLine = gsap.timeline();

      aboutIntroTimeLine
        .from(
          ".left",
          {
            delay: 0.5,
            x: -100,
            opacity: 0,
            duration: 1.2,
          },
          0
        )
        .from(
          ".right",
          {
            x: 100,
            opacity: 0,
            duration: 1.2,
            delay: 1,
          },
          0
        );
    });

    return () => ctx.revert();
  }, []);
  return (
    <div className="min-h-screen items-center lg:mx-28 mx-5  grid md:grid-cols-2 grid-cols-1 gap-10 overflow-hidden">
      <div className="left">
        <p className="text-5xl pt-3 dark:text-white mb-10 leading-[5rem] ">
          <span className="p-3 px-6  font-medium rounded-xl bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
            Introduction
          </span>{" "}
          of My Story
        </p>
        <p className="text-justify dark:text-white mt-10 mb-5">
          <span className="ms-16"></span>Hi my name is Kaung Pyae Aung and
          currently finished the Bachelor of Computing in University of
          Greenwich. I also have completed the NCC Level 5, Level 4. I have
          focused on full stack web development, starting my studies at MMSIT,
          2023. I also have an work experience from MMSIT work shop program
          under the control of Sayar Hein Htet Zan.
        </p>
        <p className="text-justify dark:text-white mt-10 mb-5">
          <span className="ms-16"></span>Throughout my developer journey, I have
          worked on various assignments, self-initiated projects, workshop
          programs and gaining practical experience in HTML, CSS, JavaScript,
          Tailwind CSS, React, Next.js and Laravel. While I acknowledge that my
          current coding practices need refinement to meet real-world standards,
          I am eager to improve through junior positions or internships. I am
          passionate about learning and tackling new challenges, continually
          striving to create and innovate.
        </p>
      </div>
      <div className="flex justify-center right">
        <Image
          className="rounded-2xl shadow-xl w-full max-w-sm object-cover"
          src="https://res.cloudinary.com/dzkoc2zf7/image/upload/v1746976058/cropped-Kaung_Pyae_Aung-removebg-preview_1_1_oefxf8.png"
          alt="Profile"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default AboutIntro;

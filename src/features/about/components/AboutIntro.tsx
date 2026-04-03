import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const AboutIntro = ({
  title,
  subtitle,
  firstParagraph,
  secondParagraph,
  profileURL,
}: {
  title: string;
  subtitle: string;
  firstParagraph: string;
  secondParagraph: string;
  profileURL: string;
}) => {
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
          0,
        )
        .from(
          ".right",
          {
            x: 100,
            opacity: 0,
            duration: 1.2,
            delay: 1,
          },
          0,
        );
    });

    return () => ctx.revert();
  }, []);
  return (
    <div className="min-h-screen items-center xl:mx-28 mx-5  grid lg:grid-cols-2 grid-cols-1 gap-10 overflow-hidden">
      <div className="left">
        <p className="text-5xl pt-3 dark:text-white mb-10 leading-[5rem] ">
          <span className="p-3 px-6  font-medium rounded-xl bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
            {title}
          </span>{" "}
          {subtitle}
        </p>
        <p className="text-justify dark:text-white mt-10 mb-5">
          <span className="ms-16"></span>
          {firstParagraph}
        </p>
        <p className="text-justify dark:text-white mt-10 mb-5">
          <span className="ms-16"></span>
          {secondParagraph}
        </p>
      </div>
      <div className="flex justify-center right">
        {profileURL && (
          <Image
            className="rounded-2xl shadow-xl w-full max-w-sm object-cover"
            src={profileURL}
            alt="Profile"
            width={500}
            height={500}
          />
        )}
      </div>
    </div>
  );
};

export default AboutIntro;

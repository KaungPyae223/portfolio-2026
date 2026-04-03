import React, { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
import AboutEducationTimeLine from "./AboutEducationTimeline";

const AboutEducation = ({ educationData }: { educationData: any }) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const educationTimeLine = gsap.timeline({
        scrollTrigger: {
          trigger: ".educationContainer",
          start: "center 65%",
        },
      });

      educationTimeLine
        .from(
          ".educationleft",
          {
            x: -100,
            opacity: 0,
            duration: 1.2,
          },
          0,
        )
        .from(
          ".educationUp",
          {
            y: -70,
            opacity: 0,
            duration: 0.5,
            stagger: 0.5,
            delay: 0.3,
          },
          0,
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden  min-h-screen pb-6 mx-5 items-center flex lg:flex-row flex-col-reverse  gap-16 lg:gap-10  pt-3  educationContainer">
      <div className="flex-1 justify-center educationleft">
        <Image
          width={500}
          height={500}
          alt="Skill Photo"
          className="xl:w-2/3 mx-auto h-full object-cover rounded-lg shadow-lg"
          src={"/Education.png"}
        />
      </div>
      <div className="px-3 flex-1">
        <p className="text-5xl dark:text-white mb-10 educationUp leading-[5rem]">
          My{" "}
          <span className="p-3 px-6 font-medium rounded-xl  bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
            Education
          </span>{" "}
          Journey
        </p>
        <AboutEducationTimeLine educationData={educationData} />
      </div>
    </div>
  );
};

export default AboutEducation;

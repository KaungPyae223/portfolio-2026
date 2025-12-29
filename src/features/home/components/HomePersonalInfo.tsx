"use client";

import gsap from "gsap";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Briefcase,
  Download,
  User,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

type HomePersonalInfoProps = {
  name: string;
  dob: string;
  location: string;
  email: string;
  phone: string;
  educations: any[];
  experiences: any[];
};

const HomePersonalInfo: React.FC<HomePersonalInfoProps> = ({
  name,
  dob,
  location,
  email,
  phone,
  educations,
  experiences,
}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".profileContainer",
          start: "top center",
        },
      });

      tl.from(".left", {
        x: -100,
        opacity: 0,
        duration: 1.2,
      }).from(
        ".right",
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
        },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative flex justify-center lg:col-span-1 order-1 lg:order-1">
              <div className="relative">
                {/* Decorative arch background */}
                <div className="absolute inset-0 bg-linear-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-[3rem] transform rotate-6 scale-110"></div>

                {/* Profile image */}
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                  <Image
                    src="https://res.cloudinary.com/dzkoc2zf7/image/upload/v1746976058/cropped-Kaung_Pyae_Aung-removebg-preview_1_1_oefxf8.png"
                    alt="Profile"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="space-y-8 lg:col-span-1 order-3 lg:order-2">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold flex flex-wrap items-center justify-center gap-3 text-gray-900 dark:text-white">
                  My short{" "}
                  <span className="bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 p-1.5 rounded-md ">
                    Personal Information
                  </span>
                </h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Name
                      </p>
                      <p className="font-medium">{name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date of Birth
                      </p>
                      <p className="font-medium">{dob}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p className="font-medium">{location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="font-medium">{email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Phone className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="font-medium">{phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Education & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="space-y-8 lg:col-span-1 order-2 lg:order-3">
              {/* Education */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Education
                  </h3>
                </div>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div
                      key={edu.id}
                      className="border-l-2 border-yellow-600 dark:border-yellow-400 pl-4"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">
                        {edu.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Experience
                  </h3>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-l-2 border-yellow-600 dark:border-yellow-400 pl-4"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">
                        {exp.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={
                  "https://drive.google.com/file/d/1M81-zCYb8K5r5W-jUa7XeWvkae1G6r6h/view?usp=sharing"
                }
                className="group inline-flex items-center justify-center gap-3 w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download CV
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomePersonalInfo;

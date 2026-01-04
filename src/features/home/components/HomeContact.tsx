import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Facebook,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

type HomeContractProps = {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  phone: string;
  profileURL: string;
};

const HomeContact: React.FC<HomeContractProps> = ({
  profileURL,
  name,
  title,
  location,
  linkedin,
  email,
  github,
  facebook,
  phone,
}) => {
  const t = useTranslations("home");

  const leftVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const upVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
      },
    },
  };

  return (
    <section className="contactContainer relative min-h-screen flex items-center justify-center ">
      <div className="relative z-10 container mx-auto p-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
          <motion.div
            className="contactLeft"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.75 }}
            variants={leftVariants}
          >
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {t("get_in_touch")}
                <span className="block text-yellow-500 dark:text-yellow-400">
                  {t("with_me")}
                </span>
                <span className="p-3 inline-block px-6 mt-3 font-medium rounded-xl bg-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-300">
                  {t("anytime")}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Mail className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-lg">{t("always_open")}</p>
            </div>
          </motion.div>

          {/* Right Section - Contact Information */}
          <motion.div
            className="space-y-8"
            variants={upVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.75 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("contact_info")}
              </h3>

              {/* Personal Info Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  {profileURL ? (
                    <Image
                      src={profileURL}
                      alt="Profile"
                      width={600}
                      height={600}
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                      <User className="size-6" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{title}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 group">
                    <Mail className="w-5 h-5 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <Phone className="w-5 h-5 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {phone}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <MapPin className="w-5 h-5 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <Calendar className="w-5 h-5 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {t("open")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("connect_with_me")}
                </h4>
                <div className="flex gap-4">
                  <a
                    href={github}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
                  </a>
                  <a
                    href={facebook}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
                  </a>
                  <a
                    href={linkedin}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;

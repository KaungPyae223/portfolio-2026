"use client";

import { Sun, Moon, Github } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Certificates", href: "/certificates" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const previousScroll = useRef<number>(0);

  // Sync initial state from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialMode = storedTheme || (prefersDark ? "dark" : "light");

    setDarkMode(initialMode === "dark");
    document.documentElement.classList.toggle("dark", initialMode === "dark");
  }, []);

  const handleScroll = () => {
    if (!navRef.current) return;

    const currentScroll = window.scrollY;
    const previousScrollValue = previousScroll.current;

    if (
      currentScroll > previousScrollValue &&
      currentScroll > navRef.current.offsetHeight
    ) {
      navRef.current.classList.add("-translate-y-full");
    } else {
      navRef.current.classList.remove("-translate-y-full");
    }

    previousScroll.current = currentScroll;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Adjust container height based on nav height
  useEffect(() => {
    if (navRef.current && containerRef.current) {
      containerRef.current.style.height = `${navRef.current.offsetHeight}px`;
    }
  }, []);

  const pathName = usePathname();

  useEffect(() => {
    navRef.current?.classList.remove("-translate-y-full");
  }, [pathName]);

  const toggleDarkMode = () => {
    const newMode = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  return (
    <div ref={containerRef} className="h-28">
      <div
        ref={navRef}
        className="py-10 md:py-5 h-28 fixed duration-700 flex justify-center w-full z-50"
      >
        <div className="bg-white dark:bg-gray-800 border border-white/50 shadow-lg p-3 rounded-full flex items-center gap-5 transition-colors">
          <p className="font-medium px-5 text-lg hidden md:block text-gray-800 dark:text-gray-100">
            Kaung Pyae&apos;s portfolio
          </p>
          <div className="border-e border-gray-300 dark:border-gray-600 h-full hidden md:block" />

          <div className="flex flex-row relative items-center gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  scroll={false}
                  className="relative px-6 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-yellow-600 dark:bg-gray-600 rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`${isActive ? "text-white" : ""} relative z-10`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="border-e border-gray-300 dark:border-gray-600 h-full hidden md:block" />

          <button
            onClick={toggleDarkMode}
            className="cursor-pointer p-3 me-3 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun strokeWidth={1} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon strokeWidth={1} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

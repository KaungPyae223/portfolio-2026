import React from "react";

const educationData = [
  {
    title: "KMD software development class",
    description:
      "After that my cousin has not time to teach me. So, I join the KMD software development class. From this class, I know the about SQL database, C# and Java. From this class I get the experience of making the window application development and I know my self I am very interested in software developing and I decided my carrier.",
  },
  {
    title: "KMD diploma",
    description:
      "From KMD class, I know about the KMD's NCC international diploma. When I decided to make developer, I think I should have any diploma related with them and attend it.",
  },
  {
    title: "MMSIT",
    description:
      "During attending the diploma, I knew the web development class called MMSIT. MMSIT gives basic website development class free and so I attended it. Because of MMSIT's teacher Hein Htet Zan teaching, I am very interested in web development and I decided to make web developer. After basic class, I join the Special web development class and Web application development class and from that I studied the React and Laravel development. After SWD, and WAD, I Joined the coding work shop from it and have an real world experience under the control of the Sayar Hein Htet Zan",
  },
];

const AboutEducationTimeLine = () => {
  return (
    <div className="mt-16 max-w-2xl mx-auto educationUp">
      {" "}
      <div className="relative  border-l border-gray-300 dark:border-gray-700">
        {" "}
        {educationData.map((item, index) => (
          <div
            key={index}
            className={`ml-6 ${
              index === educationData.length - 1 ? "" : "mb-8"
            }  `}
          >
            <div className="absolute w-3 h-3 bg-yellow-500 dark:bg-gray-400 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 "></div>{" "}
            <h6 className="text-xl font-semibold text-blue-gray-900 dark:text-white leading-none">
              {item.title}
            </h6>
            <p className="mt-3 text-base text-justify font-normal text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutEducationTimeLine;

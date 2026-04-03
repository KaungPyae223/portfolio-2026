const AboutEducationTimeLine = ({ educationData }: { educationData: any }) => {
  return (
    <div className="mt-16 max-w-2xl mx-auto educationUp">
      {" "}
      <div className="relative  border-l border-gray-300 dark:border-gray-700">
        {" "}
        {educationData.map((item: any, index: number) => (
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

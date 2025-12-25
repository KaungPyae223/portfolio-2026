"use client";

const HomeHeroManagementPreview = ({form}: {form: any}) => {

    
  return (
    <section className="flex flex-col items-center h-full justify-center py-16 mx-5 transition-colors duration-300">
      <div className="flex text-xl md:text-3xl flex-col md:flex-row items-center">
        <p className="name p-5 dark:text-white font-semibold">{form.watch("prefix")}</p>
        <div className="name space-x-3 flex flex-row  p-5 rounded-xl bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 font-semibold transition-colors duration-300">
          {form.watch("name")}
        </div>
      </div>

      <div className="space-x-3.5 text-2xl career-info font-semibold  mt-9 mb-6 hidden md:block  dark:text-gray-100 transition-colors duration-300">
        {form.watch("title")}
      </div>

      <div className="content-container mx-auto hover:bg-gray-200 dark:hover:bg-gray-800 space-x-2 md:mt-3 mt-8 text-center  dark:text-gray-300 transition-colors duration-300 rounded-xl px-4 py-3">
        {form.watch("content")}
      </div>

      
    </section>
  );
};

export default HomeHeroManagementPreview;

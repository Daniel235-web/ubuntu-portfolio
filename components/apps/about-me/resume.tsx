const Resume = () => {
  return (
    <div className="h-full w-full p-5">
      <div className="mb-10 text-center text-2xl font-bold text-orange-600 md:text-3xl">
        CV
      </div>
      <div className="h-full w-full">
        <iframe
          className="h-full w-full border-none"
          src="/about-me/resume/Samuel Emmanuel D Resume.pdf"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export { Resume };

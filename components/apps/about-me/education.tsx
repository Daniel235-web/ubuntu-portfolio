import { educations } from '@/data/educations';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col overflow-y-auto p-6 font-sans text-zinc-100">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight">
          <GraduationCap className="h-8 w-8 text-orange-500" />
          Education
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          My academic background and milestones
        </p>
      </div>

      <div className="relative ml-3 space-y-8 border-l border-zinc-800 pl-6 md:ml-6 md:pl-8">
        {educations.map((item) => (
          <div key={item.id} className="relative">
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-4 border-zinc-950 bg-orange-600 shadow-lg shadow-orange-500/20 md:-left-[39px]" />

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-md backdrop-blur transition duration-300 hover:border-zinc-700">
              {/* Header */}
              <div className="mb-3 flex flex-col justify-between gap-2 border-b border-zinc-800/50 pb-3 md:flex-row md:items-center">
                <h3 className="text-lg font-bold leading-tight text-zinc-100">
                  {item.degree}
                </h3>
                <span className="flex items-center gap-1 self-start whitespace-nowrap rounded-full border border-orange-900/30 bg-orange-950/40 px-2.5 py-1 text-xs font-semibold text-orange-400 md:self-center">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.timeLine}
                </span>
              </div>

              {/* Sub-details */}
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="text-base font-semibold text-zinc-300">
                  {item.school}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    {item.location}
                  </span>
                  {item.gpa && (
                    <span className="flex items-center gap-1 text-teal-400">
                      <Award className="h-3.5 w-3.5 text-teal-500" />
                      GPA: {item.gpa}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Education };

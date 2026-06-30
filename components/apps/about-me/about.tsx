import Image from 'next/image';
import { Award, Code2, Cpu, Users } from 'lucide-react';

const About = () => {
  const yearsOfExperience = new Date().getFullYear() - 2020;

  const cards = [
    {
      icon: <Code2 className="h-5 w-5 text-orange-500" />,
      title: 'Polyglot Stack Advocate',
      desc: 'Expertise in TypeScript, Python, Solidity, and Rust to build scalable architectures.',
    },
    {
      icon: <Cpu className="h-5 w-5 text-teal-400" />,
      title: 'Innovation Driven',
      desc: 'Building at the cutting edge of Web2 and Web3 platforms (Ethereum, Polkadot, Polygon).',
    },
    {
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      title: 'Problem Solver',
      desc: 'Embracing complex algorithms and logic-heavy challenges to deliver optimized code.',
    },
    {
      icon: <Users className="h-5 w-5 text-blue-400" />,
      title: 'Reliable Collaborator',
      desc: 'Combining strict code quality standards with excellent communication and team support.',
    },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-col overflow-y-auto p-6 font-sans text-zinc-100">
      {/* Profile Header */}
      <div className="mb-6 flex flex-col items-center gap-6 border-b border-zinc-800 pb-6 md:flex-row">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-orange-500 shadow-xl shadow-orange-950/20 md:h-32 md:w-32">
          <Image
            src="/myImage.jpeg"
            alt="Emmanuel"
            fill
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Hi, I&apos;m <span className="text-orange-500">Emmanuel</span> 👋
          </h1>
          <p className="mt-1 text-lg font-medium text-zinc-400">
            Full Stack Engineer
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
              📍 Lagos, Nigeria
            </span>
            <span className="rounded-full border border-orange-900/30 bg-orange-950/40 px-2.5 py-1 text-xs text-orange-400">
              💼 {yearsOfExperience}+ Years Experience
            </span>
            <span className="rounded-full border border-teal-900/30 bg-teal-950/40 px-2.5 py-1 text-xs text-teal-400">
              🚀 Open to Work
            </span>
          </div>
        </div>
      </div>

      {/* Intro text */}
      <div className="space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
        <p>
          I am a specialized software engineer dedicated to building
          high-performance, decentralised"(web3)", and user-centric web applications"(web2)". My
          core expertise spans the modern web ecosystem and smart contract
          development across Ethereum, Polkadot, and Polygon ecosystems.
        </p>
        <p>
          I focus on writing clean, maintainable code, implementing robust
          system architectures, and engineering intuitive user interfaces that
          solve real-world problems.
        </p>
      </div>

      {/* Specialization Cards */}
      <h2 className="mb-4 mt-8 text-xl font-bold text-zinc-200">Key Pillars</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur transition duration-300 hover:border-zinc-700"
          >
            <div className="mt-0.5 rounded bg-zinc-800/80 p-2">{card.icon}</div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-200">
                {card.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { About };

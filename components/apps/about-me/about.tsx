import Image from 'next/image';
import { Award, Code2, Cpu, Users } from 'lucide-react';

const About = () => {
  const yearsOfExperience = new Date().getFullYear() - 2020;

  const cards = [
    {
      icon: <Code2 className="h-5 w-5 text-orange-500" />,
      title: 'Web2 Product Engineering',
      desc: 'Architecting robust enterprise Web2 platforms, support ticketing systems, and web apps with Golang, Nuxt.js, React/Next.js, and Python/Django.',
    },
    {
      icon: <Cpu className="h-5 w-5 text-teal-400" />,
      title: 'Cloud & Infrastructure',
      desc: 'Deploying AWS cloud infrastructure (e.g., University of Ibadan) and configuring physical enterprise servers (NIMC, NELFUND).',
    },
    {
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      title: 'Database & Systems Design',
      desc: 'Engineering scalable PostgreSQL & MySQL database architectures, REST APIs, and microservices for high-volume operations.',
    },
    {
      icon: <Users className="h-5 w-5 text-blue-400" />,
      title: 'Web3 & Decentralized Tech (Plus Skill)',
      desc: 'Leveraging smart contract engineering (Ethereum, Polkadot, Solidity, Rust) as a specialized complementary skill asset.',
    },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-col overflow-y-auto p-6 font-sans text-zinc-100">
      {/* Profile Header */}
      <div className="mb-6 flex flex-col items-center gap-6 border-b border-zinc-800 pb-6 md:flex-row">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-orange-500 shadow-xl shadow-orange-950/20 md:h-32 md:w-32">
          <Image
            src="/myImage.jpeg"
            alt="Samuel Emmanuel"
            fill
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Hi, I&apos;m <span className="text-orange-500">Samuel Emmanuel</span> 👋
          </h1>
          <p className="mt-1 text-lg font-medium text-zinc-400">
            Full Stack Software Engineer (Web2 & Enterprise Solutions)
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
              📍 Abuja / Lagos, Nigeria
            </span>
            <span className="rounded-full border border-orange-900/30 bg-orange-950/40 px-2.5 py-1 text-xs text-orange-400">
              💼 {yearsOfExperience}+ Years Experience
            </span>
            <span className="rounded-full border border-teal-900/30 bg-teal-950/40 px-2.5 py-1 text-xs text-teal-400">
              🚀 Web3 as Added Advantage
            </span>
          </div>
        </div>
      </div>

      {/* Intro text */}
      <div className="space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
        <p>
          I am a dedicated Software Engineer specializing in Web2 product development,
          enterprise application engineering, and scalable cloud & physical server infrastructure. My primary technical focus centers on crafting high-performance, user-friendly solutions using <strong>Golang</strong>, <strong>Nuxt.js</strong>, <strong>Vue.js</strong>, <strong>React/Next.js</strong>, <strong>Python/Django</strong>, and <strong>Node.js</strong>.
        </p>
        <p>
          From engineering customer support and ticketing platforms at eSupport NG Ltd to setting up AWS infrastructure for institutions like the University of Ibadan and deploying physical server installations for NIMC and NELFUND, I focus on clean code, database optimization (PostgreSQL & MySQL), and seamless operational performance.
        </p>
        <p className="text-xs text-zinc-400 italic">
          * Note: I also possess secondary expertise in Web3 & decentralized smart contract development (Ethereum, Substrate/Polkadot, Solidity, Rust) as an added technical advantage.
        </p>
      </div>

      {/* Specialization Cards */}
      <h2 className="mb-4 mt-8 text-xl font-bold text-zinc-200">Core Expertise & Pillars</h2>
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

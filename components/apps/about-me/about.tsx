import Image from 'next/image';
import {
  Award,
  Briefcase,
  Code2,
  Cpu,
  MapPin,
  Rocket,
  Server,
  Cloud,
  Database,
} from 'lucide-react';

const About = () => {
  const yearsOfExperience = new Date().getFullYear() - 2020;

  const cards = [
    {
      icon: <Server className="h-6 w-6 text-orange-500" />,
      title: 'Physical Enterprise Server Deployments',
      desc: 'Hands-on installation, hardware racking, networking, and server OS deployment for premier national institutions including NIMC (National Identity Management Commission) and NELFUND (Nigerian Education Loan Fund).',
    },
    {
      icon: <Cloud className="h-6 w-6 text-teal-400" />,
      title: 'AWS Cloud Infrastructure Architecture',
      desc: 'Architecting scalable, resilient cloud environments on AWS (EC2, S3, RDS, CloudFront, VPC) for high-traffic institutions such as the University of Ibadan (UI).',
    },
    {
      icon: <Code2 className="h-6 w-6 text-yellow-400" />,
      title: 'Web2 Product & Software Engineering',
      desc: 'Engineering robust customer support and ticketing engines at eSupport NG Ltd using Golang, Nuxt.js, Vue.js, React/Next.js, Python/Django, and Node.js.',
    },
    {
      icon: <Database className="h-6 w-6 text-blue-400" />,
      title: 'Database & Enterprise Systems Design',
      desc: 'Designing high-throughput PostgreSQL & MySQL schemas, fault-tolerant database clusters, REST APIs, and microservices for enterprise operations.',
    },
    {
      icon: <Award className="h-6 w-6 text-purple-400" />,
      title: 'High-Availability IT Infrastructure',
      desc: 'Managing full lifecycle IT infrastructure from physical hardware assembly & server room configuration to automated cloud deployment pipelines.',
    },
    {
      icon: <Rocket className="h-6 w-6 text-emerald-400" />,
      title: 'Web3 & Decentralized Tech (Plus Skill)',
      desc: 'Leveraging smart contract engineering (Ethereum, Polkadot, Solidity, Rust) as a specialized complementary technical asset.',
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
            Hi, I&apos;m{' '}
            <span className="text-orange-500">Samuel Emmanuel</span>
          </h1>
          <p className="mt-1 text-lg font-medium text-zinc-300">
            Full Stack Software Engineer & Enterprise Infrastructure Specialist
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              Abuja / Lagos, Nigeria
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-orange-900/30 bg-orange-950/40 px-2.5 py-1 text-xs text-orange-400">
              <Briefcase className="h-3.5 w-3.5 text-orange-400" />
              {yearsOfExperience}+ Years Experience
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-teal-900/30 bg-teal-950/40 px-2.5 py-1 text-xs text-teal-400">
              <Cloud className="h-3.5 w-3.5 text-teal-400" />
              AWS Cloud Infrastructure
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-900/30 bg-yellow-950/40 px-2.5 py-1 text-xs text-yellow-400">
              <Server className="h-3.5 w-3.5 text-yellow-400" />
              Physical Server Installations (NIMC & NELFUND)
            </span>
          </div>
        </div>
      </div>

      {/* Intro text */}
      <div className="space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
        <p>
          I am a versatile Software Engineer & Infrastructure Specialist with proven expertise in <strong>enterprise cloud environments (AWS)</strong>, <strong>physical server hardware installations</strong>, and <strong>Web2 product engineering</strong>. My career focuses on building mission-critical IT infrastructure and high-performance applications that empower organizations across Nigeria.
        </p>
        <p>
          At <strong>eSupport NG Ltd</strong>, I engineer efficient customer support and ticketing platforms built on <strong>Golang</strong>, <strong>Nuxt.js</strong>, <strong>Vue.js</strong>, <strong>React/Next.js</strong>, and <strong>PostgreSQL/MySQL</strong>. On the infrastructure front, I have deployed full <strong>AWS Cloud Infrastructure</strong> for major institutions like the <strong>University of Ibadan (UI)</strong> and executed complex <strong>physical server hardware installations, racking, and network setups</strong> for national agencies including <strong>NIMC (National Identity Management Commission)</strong> and <strong>NELFUND (Nigerian Education Loan Fund)</strong>.
        </p>
        <p className="text-xs italic text-zinc-400">
          * Note: I also maintain specialized secondary expertise in Web3 & decentralized smart contract engineering (Ethereum, Polkadot, Solidity, Rust) as a complementary technical value-add.
        </p>
      </div>

      {/* Specialization Cards */}
      <h2 className="mb-4 mt-8 text-xl font-bold text-zinc-200">
        Core Pillars & Flagship Infrastructure Expertise
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4.5 backdrop-blur transition duration-300 hover:border-orange-500/50 hover:bg-zinc-900/90"
          >
            <div className="mt-0.5 shrink-0 rounded-lg bg-zinc-800/80 p-2.5">{card.icon}</div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">
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

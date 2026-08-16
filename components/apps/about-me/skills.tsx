import cls from 'classnames';
import { Rocket, Zap, Code, Sparkles } from 'lucide-react';

import { frontend, backend, databaseCloud, web3Skills } from '@/data/skills';

interface SectionProps {
  title: string;
  gradientFrom: string;
  gradientTo: string;
  items: { id: string; name: string; image: string }[];
}

const Section = ({ title, gradientFrom, gradientTo, items }: SectionProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cls(
          'mb-3 text-lg font-extrabold text-transparent text-center',
          `bg-gradient-to-r from-[${gradientFrom}] to-[${gradientTo}] bg-clip-text`,
        )}
      >
        {title}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {items.map((item) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
          />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 font-sans">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center text-2xl font-bold text-orange-500 md:text-3xl">
          Skills & Technical Stack
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Rocket className="h-4 w-4 mt-0.5 text-orange-500 shrink-0" />
              <div>
                <strong>Primary Web2 Focus:</strong> Production engineering with{' '}
                <span className="text-orange-400 font-semibold">Golang</span>,{' '}
                <span className="text-orange-400 font-semibold">Nuxt.js / Vue.js</span>,{' '}
                <span className="text-orange-400 font-semibold">React / Next.js</span>, and{' '}
                <span className="text-orange-400 font-semibold">Python / Django / Node.js</span>.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 mt-0.5 text-yellow-400 shrink-0" />
              <div>
                <strong>Infrastructure & Databases:</strong> Architecting enterprise backend systems with{' '}
                <span className="text-orange-400 font-semibold">PostgreSQL</span>,{' '}
                <span className="text-orange-400 font-semibold">MySQL</span>,{' '}
                <span className="text-orange-400 font-semibold">AWS Cloud Infrastructure</span>, and configuring{' '}
                <span className="text-orange-400 font-semibold">Physical Enterprise Servers</span> (NIMC, NELFUND, UI).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Code className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />
              <div>
                <strong>Product Quality:</strong> Emphasizing clean, scalable code architecture, reliable ticketing & support engines, and intuitive UX design.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 mt-0.5 text-purple-400 shrink-0" />
              <div>
                <strong>Web3 Advantage (Plus Skill):</strong> Hands-on proficiency in smart contract engineering (<span className="text-teal-400 font-semibold">Solidity, Rust, Ethereum, Polkadot</span>) as a complementary value-add.
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg">
            <Section
              title="Frontend Development"
              gradientFrom="rgb(255,87,34)"
              gradientTo="rgb(255,193,7)"
              items={frontend}
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg">
            <Section
              title="Backend & Languages"
              gradientFrom="rgb(76,175,80)"
              gradientTo="rgb(139,195,74)"
              items={backend}
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg">
            <Section
              title="Database & Infrastructure"
              gradientFrom="rgb(33,150,243)"
              gradientTo="rgb(3,169,244)"
              items={databaseCloud}
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg">
            <Section
              title="Web3 & Blockchain (Plus Skill)"
              gradientFrom="rgb(156,39,176)"
              gradientTo="rgb(233,30,99)"
              items={web3Skills}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Skills };

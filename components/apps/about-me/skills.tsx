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
          'mb-3 text-center text-lg font-extrabold text-transparent',
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
              <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <strong>Primary Web2 Focus:</strong> Production engineering with{' '}
                <span className="font-semibold text-orange-400">Golang</span>,{' '}
                <span className="font-semibold text-orange-400">
                  Nuxt.js / Vue.js
                </span>
                ,{' '}
                <span className="font-semibold text-orange-400">
                  React / Next.js
                </span>
                , and{' '}
                <span className="font-semibold text-orange-400">
                  Python / Django / Node.js
                </span>
                .
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
              <div>
                <strong>Infrastructure & Databases:</strong> Architecting
                enterprise backend systems with{' '}
                <span className="font-semibold text-orange-400">
                  PostgreSQL
                </span>
                , <span className="font-semibold text-orange-400">MySQL</span>,{' '}
                <span className="font-semibold text-orange-400">
                  AWS Cloud Infrastructure
                </span>
                , and configuring{' '}
                <span className="font-semibold text-orange-400">
                  Physical Enterprise Servers
                </span>{' '}
                (NIMC, NELFUND, UI).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Code className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <div>
                <strong>Product Quality:</strong> Emphasizing clean, scalable
                code architecture, reliable ticketing & support engines, and
                intuitive UX design.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
              <div>
                <strong>Web3 Advantage (Plus Skill):</strong> Hands-on
                proficiency in smart contract engineering (
                <span className="font-semibold text-teal-400">
                  Solidity, Rust, Ethereum, Polkadot
                </span>
                ) as a complementary value-add.
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

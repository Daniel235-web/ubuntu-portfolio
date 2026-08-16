import cls from 'classnames';
import { Rocket, Zap, Code, Sparkles, Server, Cloud } from 'lucide-react';

import { frontend, backend, infrastructureCloud, web3Skills } from '@/data/skills';

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
          Skills & Enterprise Stack
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Server className="h-5 w-5 mt-0.5 text-orange-500 shrink-0" />
              <div>
                <strong>Physical Server Infrastructure & Racking:</strong> Hands-on physical server installation, OS provisioning, networking setup, and hardware deployment for enterprise agencies (<span className="text-orange-400 font-semibold">NIMC</span> & <span className="text-orange-400 font-semibold">NELFUND</span>).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Cloud className="h-5 w-5 mt-0.5 text-teal-400 shrink-0" />
              <div>
                <strong>AWS Cloud Architecture:</strong> Designing scalable cloud backend systems with <span className="text-teal-400 font-semibold">AWS EC2, S3, RDS, CloudFront & VPCs</span> for institutional platforms (<span className="text-teal-400 font-semibold">University of Ibadan</span>).
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Code className="h-5 w-5 mt-0.5 text-yellow-400 shrink-0" />
              <div>
                <strong>Web2 Full Stack Engineering:</strong> Building scalable software applications at eSupport NG Ltd using <span className="text-yellow-400 font-semibold">Golang, Nuxt.js, Vue.js, React/Next.js, Python/Django, Node.js, PostgreSQL</span>, and <span className="text-yellow-400 font-semibold">MySQL</span>.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
              <div>
                <strong>Database & Systems Design:</strong> Schema architecture, high-availability database clustering, load balancing, and RESTful API microservices.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 mt-0.5 text-purple-400 shrink-0" />
              <div>
                <strong>Web3 Advantage (Plus Skill):</strong> Smart contract development (<span className="text-purple-400 font-semibold">Solidity, Rust, Ethereum, Polkadot</span>) as a specialized complementary skill.
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-orange-500/30 bg-zinc-900/80 p-5 shadow-lg md:col-span-2">
            <Section
              title="AWS Cloud & Physical Enterprise Server Infrastructure"
              gradientFrom="rgb(255,153,0)"
              gradientTo="rgb(255,87,34)"
              items={infrastructureCloud}
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg">
            <Section
              title="Frontend Engineering"
              gradientFrom="rgb(0,220,130)"
              gradientTo="rgb(79,192,141)"
              items={frontend}
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg">
            <Section
              title="Backend & Languages"
              gradientFrom="rgb(0,173,216)"
              gradientTo="rgb(51,153,51)"
              items={backend}
            />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg md:col-span-2">
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

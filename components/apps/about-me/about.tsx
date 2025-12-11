import Image from 'next/image';

const About = () => {
  const yearsOfExperience = new Date().getFullYear() - 2020;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-4 w-20  md:w-28">
        <Image
          src="/myImage.jpeg"
          alt="Emmanuel"
          className="w-full rounded-full"
          height={200}
          width={200}
          priority
        />
      </div>
      <div className="mb-6 mt-4 px-1 text-center text-lg md:mt-8 md:text-2xl">
        <div>
          Hi there, I&apos;m <span className="font-bold">Emmanuel</span>
        </div>
        <div className="ml-1 font-normal">
          A{' '}
          <span className="font-bold text-orange-600">
            Full Stack and Blockchain Engineer
          </span>{' '}
        </div>
      </div>
      <ul className="emoji-list mt-4 w-5/6 text-sm leading-tight tracking-tight md:w-3/4 md:text-base">
        <li className="list-alumnus">
          I’m a <span className="font-medium">Software Engineer </span>{' '}
          specialized in the{' '}
          <span className="font-medium">
            Node.js/React.js/Django/PostgreSQL and ethereum/polkadot/polygon
            ecosystem
          </span>{' '}
          with
          <span className="text-orange-600">
            {' '}
            {yearsOfExperience}+ years of professional experience in web2 and
            web3
          </span>
          . I am committed to continuously enhancing my skills to effectively
          solve{' '}
          <span className="text-orange-600">
            real-world problems through technology
          </span>
          . Here are my key specializations:
          <ul className="mt-2 list-inside list-disc">
            <li>
              <span className="text-orange-600">
                JavaScript, python and Rust Stacks Advocate:
              </span>{' '}
              Specializing in JavaScript, Python, Solidity and Rust with a
              willingness to learn additional languages.
            </li>
            <li>
              <span className="text-orange-600">Continuous Improvement:</span>{' '}
              Committed to learning and adapting to new technologies.
            </li>
            <li>
              <span className="text-orange-600">
                Passionate about Innovation:
              </span>{' '}
              Enjoy working with the latest tools to develop innovative
              solutions ⚙️.
            </li>
            <li>
              <span className="text-orange-600">Problem Solver at Heart:</span>{' '}
              Embrace challenges that push me to grow and improve .
            </li>
            <li>
              <span className="text-orange-600">Reliable Team Player:</span>{' '}
              Offering exceptional analytical and time management skills and the
              important ability to think critically and solve complex promblems
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export { About };

import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className="bg-primary-light dark:bg-primary-dark py-6 shadow fixed bottom-0 w-full border-t-2 border-secondary-light dark:border-secondary-dark">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-start items-center">
        <p className="text-text-light dark:text-text-dark space-x-2.5 px-5">
          <span>Copyright © 2024</span>
          <Link href="/">Hersan Space</Link>
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

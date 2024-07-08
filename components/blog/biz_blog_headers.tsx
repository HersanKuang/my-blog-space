import Link from 'next/link';
import Image from 'next/image';
import userSVG from '@/assets/images/touxiang.svg';
import { headerRouteMap } from '@/config/static_route';

const BizHeadersLayout = () => {
  return (
    <header className="bg-primary-light dark:bg-primary-dark shadow flex-shrink-0">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center px-4 hover:bg-secondary-light dark:hover:bg-secondary-dark">
              <Link
                href="/"
                className="flex items-center space-x-2 text-lg font-semibold text-text-light dark:text-text-dark"
              >
                <Image
                  width={27}
                  height={27}
                  src={userSVG}
                  alt="Logo"
                  className="w-8 h-8 mr-1 rounded-full hover:opacity-75"
                />
                <span>Hersan&apos;s Blog</span>
              </Link>
            </div>
            <div className="hidden sm:ml-14 sm:flex">
              {headerRouteMap.map(route => (
                <Link
                  href={route.path}
                  key={route.path}
                  className="inline-flex items-center px-4 pt-1 border-b-2 border-transparent text-sm font-medium text-text-light dark:text-text-dark hover:border-secondary-light dark:hover:border-secondary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-background-light dark:bg-background-dark p-1 rounded-full text-text-light dark:text-text-dark hover:text-secondary-light dark:hover:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark">
              <span className="sr-only">View notifications</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BizHeadersLayout;

import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { headerRouteLinks, headerMediaLinks } from '@/config/route_links';
import SwitchIcons from '@/app/(blog)/blog/@header/switch_icons';
import Github from '@/public/assets/svgs/github.svg';
import Juejin from '@/public/assets/svgs/juejin.svg';

type HeaderMediaLinkName = (typeof headerMediaLinks)[number]['name'];

const mediaMap: Record<HeaderMediaLinkName, ReactNode> = {
  juejin: <Juejin className="w-4.5 h-4.5 !fill-text-light dark:!fill-text-dark" />,
  github: <Github className="w-4.5 h-4.5 !fill-text-light dark:!fill-text-dark" />
};

const HeaderSection = () => {
  return (
    <header className="bg-sec-bgc-light dark:bg-sec-bgc-dark shadow flex-shrink-0">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 h-full">
          <Link
            href="/"
            className="flex items-center h-full text-lg font-semibold text-text-light dark:text-text-dark px-5 hover:bg-secondary-light dark:hover:bg-secondary-dark"
          >
            Hersan Space
          </Link>
          <nav className="hidden sm:flex pl-8 space-x-2 h-full">
            {headerRouteLinks.map(route => (
              <Link
                href={route.path}
                key={route.path}
                className="inline-flex items-center px-4 pt-1 border-b-2 border-transparent text-sm font-medium text-text-light dark:text-text-dark hover:border-secondary-light dark:hover:border-secondary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark"
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4 mr-6 h-full">
          <SwitchIcons />
          {headerMediaLinks.map(item => (
            <Link key={item.path} href={item.path} aria-label={item.ariaLabel}>
              {mediaMap[item.name]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;

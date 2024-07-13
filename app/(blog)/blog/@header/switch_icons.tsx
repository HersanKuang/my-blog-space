/* eslint-disable react/no-danger */
import Moon from '@/assets/svgs/moon.svg';
import Sun from '@/assets/svgs/sun.svg';

const SwitchIcons = () => {
  return (
    <div
      id="theme-toggle-button"
      className="w-10 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition-colors duration-300 bg-gray-200 dark:bg-gray-600"
    >
      <div
        id="theme-toggle-icon"
        className="w-4 h-4 rounded-full transform transition-transform duration-300 translate-x-0 dark:translate-x-5 bg-primary-light dark:bg-primary-dark flex items-center justify-center"
      >
        <span id="theme-icon">
          <Sun id="theme-icon-sun" className="w-3 h-3 fill-current text-yellow-500 dark:hidden" />
          <Moon
            id="theme-icon-moon"
            className="w-3 h-3 fill-current text-gray-800 hidden dark:block"
          />
        </span>
      </div>
    </div>
  );
};

export default SwitchIcons;

import { useTheme as useNextTheme } from 'next-themes';

const useTheme = <T extends string>() => {
  const { theme: nextTheme, setTheme: setNextTheme, systemTheme } = useNextTheme();

  return { theme: nextTheme as T, setTheme: setNextTheme };
};

export default useTheme;

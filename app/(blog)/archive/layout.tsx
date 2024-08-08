interface ArchiveLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

const ArchiveLayout = ({ header, footer, children }: ArchiveLayoutProps) => {
  return (
    <div className="w-full text-text-light dark:text-text-dark relative min-w-[280px] bg-background-light dark:bg-background-dark">
      {header}
      <main className="py-10 h-blog-body overflow-hidden">{children}</main>
      {footer}
    </div>
  );
};

export default ArchiveLayout;

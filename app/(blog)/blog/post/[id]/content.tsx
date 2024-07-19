import '@/public/assets/css/github-markdown-light.css';

interface MarkdownContentProps {
  htmlContent: string;
}

const MarkdownContent = ({ htmlContent }: MarkdownContentProps) => {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="markdown-body" />;
};

export default MarkdownContent;

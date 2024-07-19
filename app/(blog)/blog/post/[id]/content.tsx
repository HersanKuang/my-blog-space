interface MarkdownContentProps {
  htmlContent: string;
}

const MarkdownContent = ({ htmlContent }: MarkdownContentProps) => {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="markdown-body" />
    </>
  );
};

export default MarkdownContent;

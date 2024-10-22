import { CSSProperties, FC, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ListChildComponentProps } from 'react-window';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

const iconStyle: CSSProperties = {
  background: 'rgb(33, 150, 243)',
  color: '#fff'
};

const contentStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: '88%',
  marginRight: '1rem'
};
const borderTopStyle: CSSProperties = {
  borderTop: '3px solid #2196f3'
};

const BizTimelineItem: FC<ListChildComponentProps> = ({ index, style, data }) => {
  const blog = data[index];
  return (
    <div style={style}>
      <VerticalTimelineElement
        id={blog.isNewYear ? blog.createAt.slice(0, 4) : undefined}
        className="flex justify-around !mt-4"
        dateClassName="!py-0"
        date={blog.createAt}
        contentStyle={
          blog.isNewYear || index === 0 ? { ...contentStyle, ...borderTopStyle } : contentStyle
        }
        iconClassName="!right-10"
        iconStyle={iconStyle}
        visible
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col flex-1 justify-between space-y-2 mr-4">
            <Link href={`/post/${blog.id}`} className="cursor-pointer" prefetch={false}>
              <h2 className="text-md line-clamp-2 font-bold text-sec-text-light dark:text-sec-text-dark">
                {blog.title}
              </h2>
            </Link>
            <div className="line-clamp-2 text-0.9 font-normal color-scheme-light">
              {blog.summary}
            </div>
          </div>
          <Image
            src={blog.album}
            width="0"
            height="0"
            className="w-52 h-auto max-w-full"
            style={{ aspectRatio: '208/106' }}
            sizes="100vw"
            priority
            quality={75}
            alt="album"
          />
        </div>
      </VerticalTimelineElement>
    </div>
  );
};

export default memo(BizTimelineItem);

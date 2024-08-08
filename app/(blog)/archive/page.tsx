'use client';

import React, { useEffect } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const events = [
  {
    date: '2023-01-01',
    title: '项目启动',
    description: '项目正式启动，团队成员开始进行需求分析和规划工作。'
  },
  {
    date: '2023-02-15',
    title: '初步设计完成',
    description: '设计团队完成了初步设计文档，并提交给客户进行审查。'
  },
  {
    date: '2023-03-10',
    title: '开发阶段开始',
    description: '开发团队开始编写代码，搭建初步的项目框架。'
  },
  {
    date: '2023-05-01',
    title: '初步版本发布',
    description: '发布项目的第一个可用版本，进行内部测试和反馈收集。'
  },
  {
    date: '2023-06-20',
    title: '用户测试',
    description: '邀请一部分用户进行测试，并收集他们的反馈和改进建议。'
  },
  {
    date: '2023-08-15',
    title: '改进和优化',
    description: '根据用户反馈，对项目进行改进和性能优化。'
  },
  {
    date: '2023-10-01',
    title: '正式发布',
    description: '项目正式上线，并向所有用户开放。'
  },
  {
    date: '2023-11-10',
    title: '版本更新',
    description: '发布第一个版本更新，修复了一些已知问题，并增加了一些新功能。'
  },
  {
    date: '2024-01-01',
    title: '周年庆祝',
    description: '项目运行一周年，举办庆祝活动并感谢所有用户的支持。'
  }
];

const TimelineItem: React.FC<ListChildComponentProps> = ({ index, style }) => (
  <div style={style}>
    <VerticalTimelineElement
      className="flex justify-center"
      date={events[index].date}
      contentStyle={{ width: '80%', marginRight: 0 }}
      iconClassName="!right-10"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      visible
    >
      <h3 className="vertical-timeline-element-title">{events[index].title}</h3>
      <p>{events[index].description}</p>
    </VerticalTimelineElement>
  </div>
);

const ArchivePage = () => {
  useEffect(() => {
    return () => {
      // 页面组件卸载时移除 VerticalTimelineComponent 这个库给 html 标签添加的 style
      document.documentElement.removeAttribute('style');
    };
  }, []);
  return (
    <VerticalTimeline layout="1-column-right" className="overflow-hidden">
      <List
        height={600} // 设定显示区域的高度
        itemCount={events.length}
        itemSize={250} // 每个时间线元素的高度
        width="100%"
        className="!overflow-x-hidden"
      >
        {TimelineItem}
      </List>
    </VerticalTimeline>
  );
};

export default ArchivePage;

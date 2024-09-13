import dayjs from 'dayjs';

// 使用东八区的时间
export const localizedDayjs = (date?: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).tz('Asia/Shanghai');
};

/**
 * 获取更新时间距离当前时间的差值
 * @param timestamp 更新时间戳
 * @returns 返回更新时间距离当前时间的差值
 */
export const getTimeDifference = (timestamp: number): string => {
  const updateDate = dayjs(timestamp);
  const currentDate = localizedDayjs();

  const diffYears = currentDate.diff(updateDate, 'year');
  if (diffYears > 0) {
    return `${diffYears}年前更新`;
  }

  const diffMonths = currentDate.diff(updateDate, 'month');
  if (diffMonths > 0) {
    return `${diffMonths}个月前更新`;
  }

  const diffDays = currentDate.diff(updateDate, 'day');
  if (diffDays > 0) {
    return `${diffDays}天前更新`;
  }

  const diffHours = currentDate.diff(updateDate, 'hour');
  if (diffHours > 0) {
    return `${diffHours}小时前更新`;
  }

  const diffMinutes = currentDate.diff(updateDate, 'minute');
  if (diffMinutes > 0) {
    return `${diffMinutes}分钟前更新`;
  }

  return '刚刚更新';
};

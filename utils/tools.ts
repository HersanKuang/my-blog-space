/**
 * 获取更新时间距离当前时间的差值
 * @param updateAt 更新时间
 * @returns 返回更新时间距离当前时间的差值
 */
export const getTimeDifference = (updateAt: string): string => {
  const updateDate = new Date(updateAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - updateDate.getTime());

  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  if (diffYears > 0) {
    return `${diffYears}年前更新`;
  }

  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  if (diffMonths > 0) {
    return `${diffMonths}个月前更新`;
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${diffDays}天前更新`;
  }

  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours > 0) {
    return `${diffHours}小时前更新`;
  }

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  if (diffMinutes > 0) {
    return `${diffMinutes}分钟前更新`;
  }

  return '刚刚更新';
};

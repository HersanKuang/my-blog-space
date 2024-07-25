import Image from 'next/image';
import User from '@/public/assets/images/profile.jpg';
import { blogListData } from '@/app/(blog)/blog/page';

const albumImage = ['0960', '9232', '7069', '3542'];

const { NEXT_PUBLIC_FILE_VISIT_URL: FILE_URL } = process.env;

const BaseBlogProfile = () => {
  // 获取当前日期的时间戳
  const currentDate = new Date().toISOString().split('T')[0]; // 只保留日期部分
  const seed = Number(currentDate.split('-').join('')); // 将日期部分转换为数字

  // 使用固定的随机数来选择图片
  const selectedImage = albumImage[seed % albumImage.length];

  const options = [
    { label: '文章', value: blogListData?.totalCount },
    { label: '标签', value: 0 },
    { label: '分类', value: 0 }
  ];

  return (
    <>
      <div className="common-box-warp relative h-52 overflow-hidden !rounded-b-none">
        <Image
          src={`${FILE_URL}user/image/IMG_${selectedImage}.webp`}
          sizes="(max-width: 600px) 100vw, (min-width: 768px) 24rem, 14.4rem"
          quality="20"
          alt="album"
          priority
          fill
        />
      </div>
      <div className="common-box-warp relative h-52 !rounded-t-none">
        <div className="flex items-center justify-center flex-col mt-4 space-y-2.5">
          <Image
            src={User}
            alt="profile"
            quality={50}
            width={75}
            height={75}
            className="widget-author-avatar rounded-full"
          />
          <span className="text-lg font-medium text-text-light dark:text-text-dark">Hersan</span>
          <p className="text-sm text-[#6a7485] dark:text-[#cfcfd1]">热爱编程，开源社区活跃参与者</p>
        </div>
        <div className="flex justify-evenly flex-row mt-8">
          {options.map(item => (
            <div key={item.label} className="col-center-text">
              <span>{item.value}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BaseBlogProfile;
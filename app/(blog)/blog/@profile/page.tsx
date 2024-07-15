import Image from 'next/image';
import User from '@/public/assets/images/profile.jpg'

const options = [
  { label: '文章', value: 1 },
  { label: '标签', value: 0 },
  { label: '分类', value: 0 }
]

const coverImage = [
  '0960',
  '9232',
  '7069',
  '3542'
]

const { NEXT_PUBLIC_FILE_VISIT_URL: FILE_URL } = process.env;

const Profile = () => {
  const randomIndex = Math.floor(Math.random() * coverImage.length);
  return (
    <>
      <div className="common-box-warp relative h-52 overflow-hidden !rounded-b-none">
        <Image
          src={`${FILE_URL}user/image/IMG_${coverImage[randomIndex]}.webp`}
          sizes="(max-width: 600px) 100vw, (min-width: 768px) 24rem, 14.4rem"
          quality="20"
          alt="cover"
          priority
          fill
        />
      </div>
      <div className="common-box-warp relative h-52 !rounded-t-none">
        <div className="flex items-center justify-center flex-col mt-4 space-y-2.5">
          <Image src={User} alt="profile" quality={75} width={75} height={75} className="widget-author-avatar rounded-full" />
          <h4 className="text-lg text-text-light dark:text-text-dark">Hersan</h4>
          <p className="text-sm text-text-light dark:text-text-dark opacity-60">热爱编程，开源社区活跃参与者</p>
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

export default Profile;

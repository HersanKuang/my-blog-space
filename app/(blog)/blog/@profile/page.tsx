import Image from 'next/image';
import User from '@/assets/images/profile.jpg'

const options = [
  { label: '文章', value: 1 },
  { label: '标签', value: 0 },
  { label: '分类', value: 0 }
]

const Profile = () => {
  return (
    <div className="common-box-warp h-64">
      <div className="flex items-center justify-center flex-col space-y-2">
        <Image src={User} alt="profile" quality={75} width={75} height={75} className="rounded-full" />
        <h4 className="text-lg text-text-light dark:text-text-dark">Hersan</h4>
        <p className="text-sm text-text-light dark:text-text-dark opacity-60">热爱编程，开源社区活跃参与者</p>
      </div>
      <div className="flex justify-evenly flex-row mt-4">
        {options.map(item => (
          <div key={item.label} className="col-center-text">
            <span>{item.value}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

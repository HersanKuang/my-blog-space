const Profile = () => {
  return (
    <div className="flex-none bg-primary-light dark:bg-primary-dark p-4 shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <div>
          <h4 className="text-lg font-bold text-text-light dark:text-text-dark">nullcache</h4>
          <p className="text-text-light dark:text-text-dark">此处应有一句格言</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-text-light dark:text-text-dark">2 文章数</p>
        <a href="https://github.com/" className="text-text-light dark:text-text-dark block mt-2">
          github
        </a>
        <a href="https://juejin.cn/" className="text-text-light dark:text-text-dark block mt-2">
          掘金
        </a>
      </div>
    </div>
  );
};

export default Profile;

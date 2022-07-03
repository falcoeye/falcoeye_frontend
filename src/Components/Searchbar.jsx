import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import AutoComplete from './AutoComplete';
const Searchbar = () => {
  const pathString = window.location.pathname;
  const [paths, setPaths] = useState();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    pathString !== null && setPaths(pathString.split('/'));
  }, [pathString]);
  useEffect(() => {
    console.log(paths);
  }, [paths]);
  /* const handleRedirect = (idx) => {
    let redirectPathArray = [];
    paths.forEach((item, index) => {
      if (index <= idx) {
        redirectPathArray.push(item);
      }
    });
    const redirectPath = `${redirectPathArray.join("/")}`;
    console.log("check redirect", redirectPath);
    navigate(`${redirectPath}`);
  }; */
  const handleActionChange = (id) => {
    if ('logout' === id) {
      localStorage.removeItem('user');
      window.location.pathname = '/login';
    }
  };
  return (
    <div className="main-container pt-6 md:block hidden">
      <div className="flex md:flex-row flex-col flex-wrap lg:flex-nowrap justify-between rounded-lg lg:rounded-full gap-y-3  bg-white px-4 md:px-8 lg:px-5 py-3 lg:py-1 min-h-[42px]">
        <div className="flex items-center justify-between gap-x-4 flex-1 lg:basis-1/4 w-full lg:pr-5 lg:border-r border-gray-300">
          <p className="capitalize text-xs sm:text-sm w-max">searching for ?</p>
          <select
            className="text-primary max-w-[140px] bg-white text-sm  w-full"
            placeholder="Camera Name"
          >
            <option>Camera Man</option>
          </select>
        </div>
        <div className=" w-full lg:basis-2/3 lg:order-none order-last flex items-center px-4 lg:border-r border-gray-300">
          <span className="text-primary text-xl mr-4">
            <AiOutlineSearch />
          </span>
          <AutoComplete
            data={suggestions}
            placeholder={`Search AI Model, Camera, Videos, snapshot analysis ...`}
          />
        </div>
        <div className="flex-1 md:justify-end md:order-none order-first lg:basis-1/6 bas flex items-center px-3 gap-x-4">
          <span className="text-primary">
            <AiOutlineSetting />
          </span>
          <div className="flex gap-x-2 items-center">
            <img
              className="rounded-full w-7 h-7 overflow-hidden"
              src=""
              alt=""
            />

            <p className="text-xs text-primary capitalize"></p>
            <span className="text-xs text-primary cursor-pointer">
              <select
                className="text-primary max-w-[140px] bg-white text-sm  w-full"
                placeholder="="
                onChange={(e) => {
                  handleActionChange(e.target.value);
                }}
              >
                <option value={user.user.name}>{user.user.name}</option>
                <option value="logout">Log out</option>
              </select>
            </span>
          </div>
        </div>
      </div>
      {paths && paths[1] !== '' && (
        <div className="flex items-center">
          {paths?.map((path, index) => console.log(path))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;

const suggestions = ['aaa', 'sasdf', 'askdf'];

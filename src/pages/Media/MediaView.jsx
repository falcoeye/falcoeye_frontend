import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMedia } from '../../store/media';
import MediaGrid from './MediaGrid';
import { BsFillGrid1X2Fill, BsListUl } from 'react-icons/bs';
import MediaList from './MediaList';
import FilterBar from './FilterBar';

const MediaView = (props) => {
  const dispatch = useDispatch();
  const [isGridView, setIsGridView] = useState(true);

  const [ term, setTerm ] = useState('');
  const [ type, setType ] = useState('');
  const [ date, setDate ] = useState('');
  const [ order, setOrder ] = useState('')

  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="main-container mt-6 ">
          <div className=" bg-white mx-1 pt-4 px-4 md:px-7 pb-7 rounded-sm">
            <div className="flex justify-between sm:flex-row flex-co pb-4 mb-5 border-b border-[#f5f5f5] ">
              <h2 className="text-gray-900 text-lg capitalize">media</h2>
              <div className="flex">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`transition duration-300 p-2 rounded-full inline-flex items-center mr-4 text-primary ${
                    isGridView && 'bg-primary text-white'
                  }`}
                >
                  <BsFillGrid1X2Fill />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`transition duration-300 p-2 rounded-full inline-flex items-center text-primary ${
                    !isGridView && 'bg-primary text-white'
                  }`}
                >
                  <BsListUl />
                </button>
              </div>
            </div>
            <FilterBar />
            <div className="mt-6 rounded-xl bg-white p-3 md:p-6 shadow">
                { isGridView ? <MediaGrid /> : <MediaList />  }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaView;

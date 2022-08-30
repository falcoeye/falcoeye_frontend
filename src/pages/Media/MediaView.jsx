import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia } from '../../store/media';
import MediaGrid from './MediaGrid';
import { BsFillGrid1X2Fill, BsListUl } from 'react-icons/bs';
import MediaList from './MediaList';
import FilterBar from './FilterBar';
import { useCallback } from 'react';
import UploadMedia from '../Modals/UploadMedia';

const MediaView = (props) => {
  const dispatch = useDispatch();
  const [isGridView, setIsGridView] = useState(true);

  const media = useSelector((state) => state.media);
  const { data, page, lastPage } = media;

  const [filteredMedia, setFilteredMedia] = useState(data);
  const [uploadMediaImage, setUploadMediaImage] = useState(false);

  const [term, setTerm] = useState('');
  const [type, setType] = useState('all');
  const [date, setDate] = useState('');
  const [order, setOrder] = useState('');

  const termChangeHandler = useCallback((e) => {
    setTerm(e.target.value);
  }, []);
  const typeChangeHandler = useCallback((e) => {
    setType(e.target.value);
  }, []);
  const dateChangeHandler = useCallback((e) => {
    setDate(e.target.value);
  }, []);
  const orderChangeHandler = useCallback((e) => {
    setOrder(e.target.value);
  }, []);

  const closeModalHandler = () => setUploadMediaImage(false);

  useEffect(() => {
    !lastPage && dispatch(fetchMedia(page));
  }, [dispatch, lastPage, page]);

  const searchFilter = (term, items) => {
    if (term.length === 0) return items;
    const searchFilteredData = items.filter((item) => {
      return item.tags.toLowerCase().includes(term.toLowerCase());
    });
    return searchFilteredData;
  };

  const typeFilter = (type, items) => {
    switch (type) {
      case 'all':
        return items;
      default:
        return items.filter((item) => item.media_type === type);
    }
  };

  const dateFilter = (val, items) => {
    switch (val) {
      case 'oldest':
        return items.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      case 'newest':
        return items.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      default:
        return items;
    }
  };

  const orderFilter = (val, items) => {
    switch (val) {
      case 'a-z':
        return items.sort((a, b) => a.note.localeCompare(b.note));
      case 'z-a':
        return items.sort((a, b) => b.note.localeCompare(a.note));
      default:
        return items;
    }
  };

  const filterationHandler = useCallback(() => {
    let filteredData = [...data];
    const searchFilteredResults = searchFilter(term, filteredData);
    const typeFiltersResults = typeFilter(type, searchFilteredResults);
    const dateFiltersResults = dateFilter(date, typeFiltersResults);
    const orderFilterResults = orderFilter(order, dateFiltersResults);
    setFilteredMedia(orderFilterResults);
  }, [data, date, order, term, type]);

  useEffect(() => {
    if (data.length >= 0) {
      filterationHandler();
    }
  }, [data, filterationHandler]);

  return (
    <>
      <div className=" mx-1 pt-4 px-4 md:px-7 pb-7 rounded-sm">
        <div className="flex justify-between items-center sm:flex-row flex-co pb-4 mb-5 border-b border-[#f5f5f5] ">
          <h2 className="text-gray-900 text-lg capitalize dark:text-white">
            media
          </h2>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setUploadMediaImage(true)}
              className="text-white bg-primary/90 hover:bg-primary focus:ring-4 mr-5 focus:ring-blue-100 font-medium rounded-lg  px-4 py-2  focus:outline-none"
            >
              Upload
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`transition duration-300 p-2 rounded-full inline-flex items-center mr-4 text-primary dark:text-white ${
                isGridView && 'bg-primary text-white'
              }`}
            >
              <BsFillGrid1X2Fill />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`transition duration-300 p-2 rounded-full inline-flex items-center text-primary dark:text-white ${
                !isGridView && 'bg-primary text-white'
              }`}
            >
              <BsListUl />
            </button>
          </div>
        </div>
        <FilterBar
          term={term}
          type={type}
          date={date}
          order={order}
          termHandler={termChangeHandler}
          typeHandler={typeChangeHandler}
          dateHandler={dateChangeHandler}
          orderHandler={orderChangeHandler}
        />
        <div className="mt-6 rounded-xl shadow">
          {isGridView ? (
            <MediaGrid data={filteredMedia} />
          ) : (
            <MediaList data={filteredMedia} />
          )}
        </div>
      </div>
      {uploadMediaImage && (
        <UploadMedia handleClose={closeModalHandler} open={uploadMediaImage} />
      )}
    </>
  );
};

export default MediaView;

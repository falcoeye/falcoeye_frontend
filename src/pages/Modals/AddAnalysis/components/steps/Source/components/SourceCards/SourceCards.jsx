import Lottie from 'lottie-react';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noDataAnimation from '../../../../../../../../assets/animations/no-data.json';
import Loader from '../../../../../../../../Components/UI/Loader/Loader';
import {
  fetchSources,
  handlePage
} from '../../../../../../../../store/sources';
import SourceCard from './components/SourceCard';

const SourceCards = (props) => {
  const { selectedSource, updateSource } = props;

  const dispatch = useDispatch();

  const sources = useSelector((state) => state.sources);
  const { fetchingSources, data, page, lastPage } = sources;

  useEffect(() => {
    dispatch(fetchSources(page));
  }, [dispatch, page]);

  const ovserver = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (fetchingSources) return;
      if (ovserver.current) ovserver.current.disconnect();
      ovserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !lastPage) {
          dispatch(handlePage(page + 1));
        }
      });
      if (node) ovserver.current.observe(node);
    },
    [dispatch, fetchingSources, lastPage, page]
  );

  if (fetchingSources && data.length) {
    return <Loader height="h-[300px]" />;
  }
  if (data.length === 0 && !fetchingSources) {
    return (
      <div className="h-96">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  const sourcesCards = data.map((source, index) => {
    if (sources.data.length - 1 === index) {
      return (
        <SourceCard
          key={source.id}
          source={source}
          selectedSourceId={selectedSource}
          handleClick={updateSource}
          lastElementRef={lastElementRef}
        />
      );
    }
    return <SourceCard key={source.id} source={source} handleClick={updateSource} selectedSourceId={selectedSource} />;
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sourcesCards}
      </div>
    </Fragment>
  );
};
export default SourceCards;

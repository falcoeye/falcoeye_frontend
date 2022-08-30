import { Tab } from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSources, handlePage } from "../../store/sources";
import AddSource from "../Modals/AddSource";
import SourcesGrid from "./SourcesGrid";
import SourcesMap from "./SourcesMap";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SourcesView = (props) => {
  const [addSourceOpened, setAddSourceOpened] = useState(false);

  const dispatch = useDispatch();
  const sources = useSelector((state) => state.sources);
  const { fetchingSources, page, lastPage } = sources;

  useEffect(() => {
    dispatch(fetchSources(page));
  }, [dispatch, page]);

  const addSourceModalChangeHandler = useCallback((val) => {
    setAddSourceOpened(val);
  }, []);

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

  return (
    <>
      <AddSource
        open={addSourceOpened}
        handleClose={addSourceModalChangeHandler}
      />

      <div className="mx-1 pt-3 px-4 md:px-7 pb-7 rounded-sm">
        <div className="flex justify-between sm:flex-row flex-col">
          <div>
            <h2 className="text-gray-900 text-lg capitalize dark:text-white">
              My sources
            </h2>
          </div>
          <button type="button" className="flex gap-5 sm:pt-0 pt-4">
            <span
              onClick={() => setAddSourceOpened(true)}
              className="bg-primary text-white text-sm py-2  flex justify-center items-center md:px-4 px-3 rounded-md"
            >
              <span className="capitalize"> Add source</span>
            </span>
          </button>
        </div>
        <div className="w-full mt-6 mb-16 sm:px-0 shadow rounded-md">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-md bg-primary p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ",
                    selected
                      ? "bg-white dark:bg-slate-800 dark:text-white  shadow text-primary"
                      : "text-white hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Sources
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ",
                    selected
                      ? "bg-white dark:bg-slate-800 dark:text-white shadow text-primary"
                      : "text-white hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Map
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "rounded-md bg-white dark:bg-slate-700/50 p-3 shadow ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                <SourcesGrid lastElementRef={lastElementRef} />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "rounded-md bg-white dark:bg-slate-700/50  p-3 shadow ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                <SourcesMap />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default SourcesView;

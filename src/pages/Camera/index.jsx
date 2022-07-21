import React from "react";
import Layout from "../../Components/Layout";
/* import Cameracards2 from "./Cameracards2";
import CamerCards from "./CamerCards";
import FilterBar from "./FilterBar"; */
import SourcesView from "./SourcesView";

const Index = () => {
  /* const [sort, setSort] = useState("list"); */
  // const handleSort = () => {
  //   setSort(!sort);
  // };
  return (
    <Layout>
      <SourcesView />
      {/* <FilterBar setSort={setSort} sort={sort} />
      {sort === "list" ? <Cameracards2 /> : <CamerCards />} */}
    </Layout>
  );
};

export default Index;

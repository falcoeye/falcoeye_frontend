import React, { useState } from "react";
import Layout from "../../Layout";
import Cameracards2 from "./Cameracards2";
import CamerCards from "./CamerCards";
import FilterBar from "./FilterBar";
import Map from "./Map";

const Index = () => {
  const [sort, setSort] = useState("list");
  // const handleSort = () => {
  //   setSort(!sort);
  // };
  return (
    <Layout>
      <Map />
      <FilterBar setSort={setSort} sort={sort} />
      {sort === "list" ? <Cameracards2 /> : <CamerCards />}
    </Layout>
  );
};

export default Index;

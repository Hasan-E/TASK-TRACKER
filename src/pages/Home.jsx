import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskPanel from "../components/TaskPanel";
import datas from "../helper/data";

const Home = () => {
  const [data, setData] = useState(datas);

  return (
    <div className="container px-4">
      <div className="row">
        <div className="col-12 col-lg-5 mb-3">
          <TaskPanel data={data} setData={setData} />
        </div>
        <div className="col-12 col-lg-7">
          <TaskList data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default Home;

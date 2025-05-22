import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskPanel from "../components/TaskPanel";
import datas from "../helper/data";

const Home = () => {
  const [data, setData] = useState(datas);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-sm-11 ">
          <TaskPanel data={data} setData={setData} />
        </div>
        <div className="col-sm-11 col-lg-6">
          <TaskList data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default Home;

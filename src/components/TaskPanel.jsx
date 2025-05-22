import AddTask from "./AddTask";
import Header from "./Header";

const TaskPanel = ({data, setData}) => {
  return (
    <div className="panel">
      <Header />
      <AddTask data={data} setData={setData} />
    </div>
  );
};
export default TaskPanel;

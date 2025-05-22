import { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

const EditTask = ({ data, setData, clickId, setShowEditTask, setClickId }) => {
  const [editTaskInput, setEditTaskInput] = useState("");
  const [editDayInput, setEditDayInput] = useState("");
  //   const [editId, setEditId] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updateData = data.map((task) =>
      task.id === clickId
        ? { ...task, task: editTaskInput, day: editDayInput }
        : task
    );
    setData(updateData);
    setShowEditTask(false);
    setClickId(null);
  };
  useEffect(() => {
    const selectedTask = data.find((task) => task.id === clickId);
    if (selectedTask) {
      setEditTaskInput(selectedTask.task);
      setEditDayInput(selectedTask.day);
    }
  }, [clickId]);
  return (
    <div className="editTask">
    <FaRegWindowClose
        className="closeButton"
        onClick={() => {
          setShowEditTask(false);
          setClickId(null);
        }}
      />
      <Form onSubmit={handleEditSubmit} className="editTaskForm">
        <Form.Group className="formGroup">
          <Form.Label className="label">Task</Form.Label>
          <Form.Control
            value={editTaskInput}
            onChange={(e) => setEditTaskInput(e.target.value)}
            type="text"
            placeholder="Add Task"
            required
          />
        </Form.Group>

        <Form.Group className="formGroup">
          <Form.Label className="label">Day & Time </Form.Label>
          <Form.Control
            value={editDayInput}
            onChange={(e) => setEditDayInput(e.target.value)}
            type="datetime-local"
            placeholder="Add Day & Time "
            required
          />
        </Form.Group>

        <Form.Group className="btnGroup">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditTask;

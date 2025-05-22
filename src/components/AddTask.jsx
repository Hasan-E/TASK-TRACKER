import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ data, setData }) => {
  const [taskInput, setTaskInput] = useState("");
  const [dayInput, setDayInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      task: taskInput,
      day: dayInput,
      done: false,
      steps: [],
    };
    setData([...data, newTask]);
    setTaskInput("");
    setDayInput("");
  };

  return (
    <div className="addTask">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="formGroup">
          <Form.Label className="label">Task</Form.Label>
          <Form.Control
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            type="text"
            placeholder="Add Task"
            required
          />
        </Form.Group>

        <Form.Group className="formGroup">
          <Form.Label className="label">Day & Time </Form.Label>
          <Form.Control
            value={dayInput}
            onChange={(e) => setDayInput(e.target.value)}
            type="datetime-local"
            placeholder="Add Day & Time "
            required
          />
        </Form.Group>

        <Form.Group className="btnGroup">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddTask;

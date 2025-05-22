/* ================================================================ */
/*                              İMPORTS                             */
/* ================================================================ */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  FaRegWindowClose,
  FaRegEdit,
  FaRegCaretSquareUp,
  FaRegCaretSquareDown,
  FaRegCheckCircle,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import EditTask from "./EditTask";
/* ============================================ */
/*            MAIN TASKLIST FUNCTION            */
/* ============================================ */
const TaskList = ({ data, setData }) => {
  /* ============================================ */
  /*              USESTATE IDENTFIES              */
  /* ============================================ */
  const [clickId, setClickId] = useState(null);
  const [stepInput, setStepInput] = useState("");
  const [editStepId, setEditStepId] = useState(null);
  const [editStepInput, setEditStepInput] = useState("");
  const [showEditTask, setShowEditTask] = useState(false);
  /* ============================================ */
  /*                   FUNCTIONS                  */
  /* ============================================ */

  /* ------ up-down button change function ------ */
  const clickStep = (id) => {
    setClickId((prev) => (prev === id ? null : id));
  };

  /* ------------- Add step function ------------ */
  const handleAddStep = (e) => {
    e.preventDefault();
    const newStep = {
      id: uuidv4(),
      step: stepInput,
      done: false,
    };
    const updateData = data.map((task) => {
      if (task.id === clickId) {
        const steps = task.steps;
        return {
          ...task,
          steps: [...steps, newStep],
        };
      } else {
        return task;
      }
    });
    setData(updateData);
    setStepInput("");
  };

  /* ----------- Delete Step Function ----------- */
  const handleDeleteStep = (taskId, stepId) => {
    const updateData = data.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          steps: item.steps.filter((s) => s.id !== stepId),
        };
      }
      return item;
    });
    setData(updateData);
  };

  /* ------------ Task Done Function ------------ */
  const handleTaskDone = (taskId) => {
    const updateData = data.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setData(updateData);
  };

  /* ------------ Step Done Function ------------ */
  const handleStepDone = (taskId, stepId) => {
    const updateData = data.map((task) => {
      if (task.id === taskId) {
        const updateStep = task.steps.map((step) =>
          step.id === stepId ? { ...step, done: !step.done } : step
        );
        return { ...task, steps: updateStep };
      }
      return task;
    });
    setData(updateData);
  };

  /* ------ Step edit input open  function ------ */
  const handleOpenStepEdit = (taskId, stepId, inputText) => {
    if (editStepId === stepId) {
      saveEditStep(taskId, stepId);
    } else {
      setEditStepId(stepId);
      setEditStepInput(inputText);
    }
  };

  /* ------ Edited step data save function ------ */
  const saveEditStep = (taskId, stepId) => {
    const updateData = data.map((task) => {
      if (task.id === taskId) {
        const updateStep = task.steps.map((step) =>
          step.id === stepId ? { ...step, step: editStepInput } : step
        );
        return { ...task, steps: updateStep };
      }
      return task;
    });
    setData(updateData);
    setEditStepId(null);
  };

  /* ------------- Data Sort Process ------------ */
  const sortedData = [...data].sort(
    (a, b) => new Date(b.day) - new Date(a.day)
  );
  /* ============================================ */
  /*                 RENDER RETURN                */
  /* ============================================ */
  return (
    /* ============================================ */
    /*              ALL LIST ELEMENNTS              */
    /* ============================================ */
    <div className="list">
      {sortedData.map((task) => (
        <div
          /* ============================================ */
          /*                     TASKS                    */
          /* ============================================ */
          /* ------- task done double click event ------- */
          onDoubleClick={() => handleTaskDone(task.id)}
          key={task.id}
          className={task.done ? "taskDone" : "task"}
        >
          {/* one task */}
          <div className="d-flex justify-content-between">
            <div className="text">
              <h4>{task.task}</h4>
              <h5> {task.day} </h5>
            </div>
            {task.done && <FaRegCheckCircle className="doneIcon" />}
            <div className="btns d-flex flex-column">
              <div>
                <FaRegWindowClose
                  className="btnX"
                  onClick={() => setData(data.filter((f) => f.id !== task.id))}
                />
              </div>
              <div className="edit">
                <FaRegEdit
                  onClick={() => {
                    setClickId(task.id);
                    setShowEditTask(true);
                  }}
                  className="btnEdit"
                />
              </div>
              <div onClick={() => clickStep(task.id)}>
                {clickId === task.id ? (
                  <FaRegCaretSquareUp className="btnUp" />
                ) : (
                  <FaRegCaretSquareDown className="btnDown" />
                )}
              </div>
            </div>
          </div>
          {clickId === task.id && !showEditTask && task.steps.length > 0 ? (
            /* ============================================ */
            /*                     STEPS                    */
            /* ============================================ */
            <div className="steps mt-2">
              <h6>STEPS</h6>
              {
                task.steps.map((step) => (
                  <div
                    onDoubleClick={(e) => {
                      e.stopPropagation(); // bubbling'i durdurur
                      handleStepDone(task.id, step.id);
                    }}
                    key={step.id}
                    className={step.done ? "stepDone" : "step"}
                  >
                    {editStepId === step.id ? (
                      <input
                        value={editStepInput}
                        onChange={(e) => setEditStepInput(e.target.value)}
                        // onBlur={() => saveEditStep(task.id, step.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEditStep(task.id, step.id);
                          }
                        }}
                        type="text"
                        className="stepEditInput"
                        autoFocus
                      />
                    ) : (
                      <p>{step.step}</p>
                    )}

                    {step.done && <FaRegCheckCircle className="doneIcon" />}
                    <div className="stepBtn">
                      <FaRegEdit
                        onClick={() =>
                          handleOpenStepEdit(task.id, step.id, step.step)
                        }
                        className="btnEdit"
                      />
                      <FaRegWindowClose
                        className="btnX"
                        onClick={() => handleDeleteStep(task.id, step.id)}
                      />
                    </div>
                  </div>
                ))
                /* ============================================ */
                /*                 ADD STEP FORM                */
                /* ============================================ */
              }
              <Form onSubmit={handleAddStep}>
                <Form.Group className="d-flex flex-nowrap">
                  <Form.Control
                    onChange={(e) => setStepInput(e.target.value)}
                    value={stepInput}
                    type="text"
                    placeholder="Add Step"
                    required
                  />
                  <Button variant="primary" type="submit">
                    ADD
                  </Button>
                </Form.Group>
              </Form>
            </div>
          ) : /* ============================================ */
          /*               CREATE STEP FORM               */
          /* ============================================ */
          clickId === task.id && !showEditTask ? (
            <div className="steps mt-2">
              <Form onSubmit={handleAddStep}>
                <Form.Group className="d-flex flex-nowrap">
                  <Form.Control
                    onChange={(e) => setStepInput(e.target.value)}
                    value={stepInput}
                    type="text"
                    placeholder="Add Step"
                    required
                  />
                  <Button variant="primary" type="submit">
                    ADD
                  </Button>
                </Form.Group>
              </Form>
            </div>
          ) : null}
        </div>
      ))}
      {showEditTask && (
        <div className="overlay">
          <EditTask
            data={data}
            setData={setData}
            clickId={clickId}
            setShowEditTask={setShowEditTask}
            setClickId={setClickId}
          />
        </div>
      )}
    </div>
  );
};
export default TaskList;

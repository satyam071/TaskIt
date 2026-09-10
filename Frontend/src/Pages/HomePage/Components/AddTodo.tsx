import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface NewTodo {
  heading: string;
  tasks: Task[];
}

interface AddTodoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (todo: NewTodo) => void;
}

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const createEmptyTask = (): Task => ({
  _id: generateId(),
  title: "",
  completed: false,
});

const AddTodo: React.FC<AddTodoProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
}) => {
  const [heading, setHeading] = useState("");
  const [tasks, setTasks] = useState<Task[]>([createEmptyTask()]);

  const handleTaskTitleChange = (id: string, value: string) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, title: value } : task))
    );
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTaskRow = () => {
    setTasks((prev) => [...prev, createEmptyTask()]);
  };

  const handleRemoveTaskRow = (id: string) => {
    setTasks((prev) =>
      prev.length > 1 ? prev.filter((task) => task._id !== id) : prev
    );
  };

  const resetForm = () => {
    setHeading("");
    setTasks([createEmptyTask()]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isValid =
    heading.trim() !== "" && tasks.some((task) => task.title.trim() !== "");

  const handleSubmit = () => {
    const trimmedHeading = heading.trim();
    const cleanedTasks = tasks
      .map((task) => ({ ...task, title: task.title.trim() }))
      .filter((task) => task.title !== "");

    if (!trimmedHeading || cleanedTasks.length === 0) return;

    onSubmit({ heading: trimmedHeading, tasks: cleanedTasks });
    resetForm();
    onClose();
  };

  return (
    <>
      {/* CLOSED "+" CARD */}
      {!isOpen && (
        <motion.div
          layoutId="todo-add"
          onClick={onOpen}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(255,255,255,0.6)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="
            w-full
            max-w-sm
            sm:w-70
            p-4
            rounded-2xl
            border
            border-white/30
            shadow-lg
            overflow-hidden
            cursor-pointer
            text-white
          "
        >
          <p className="font-bowlby text-5xl flex justify-around items-center h-full">
            +
          </p>
        </motion.div>
      )}

      {/* EXPANDED FORM */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="
                fixed
                inset-0
                z-40
                bg-black/50
                backdrop-blur-md
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* CARD */}
            <motion.div
              layoutId="todo-add"
              className="
                fixed
                z-50
                left-1/2
                top-1/2
                w-[90vw]
                sm:w-[70vw]
                md:w-[55vw]
                lg:w-[40vw]
                min-h-[45vh]
                max-h-[80vh]
                -translate-x-1/2
                -translate-y-1/2
                rounded-3xl
                border
                border-white/40
                bg-black
                p-8
                overflow-y-auto
                text-white
              "
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={handleClose}
                className="
                  absolute
                  right-5
                  top-5
                  h-10
                  w-10
                  rounded-full
                  border
                  border-white/40
                  text-xl
                  transition
                  hover:bg-white
                  hover:text-black
                  cursor-pointer
                "
              >
                ×
              </button>

              {/* HEADING INPUT */}
              <input
                autoFocus
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Todo heading"
                className="
                  w-full
                  bg-transparent
                  text-3xl
                  font-bowlby
                  placeholder-white/40
                  border-b
                  border-white/30
                  focus:outline-none
                  focus:border-white
                  pb-2
                  pr-10
                "
              />

              {/* TASKS */}
              <div className="mt-8 space-y-3">
                {tasks.map((task) => (
                  <div key={task._id} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(task._id)}
                      className="
                        h-5
                        w-5
                        shrink-0
                        rounded-full
                        border
                        border-white
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                      "
                    >
                      {task.completed && (
                        <FaCheck className="text-white text-[10px]" />
                      )}
                    </button>

                    <input
                      value={task.title}
                      onChange={(e) =>
                        handleTaskTitleChange(task._id, e.target.value)
                      }
                      placeholder="Task title"
                      className="
                        flex-1
                        bg-transparent
                        font-questrial
                        placeholder-white/40
                        border-b
                        border-white/20
                        focus:outline-none
                        focus:border-white
                        pb-1
                      "
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveTaskRow(task._id)}
                      className="text-white/50 hover:text-white transition cursor-pointer"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddTaskRow}
                  className="
                    flex
                    items-center
                    gap-2
                    text-white/70
                    hover:text-white
                    transition
                    mt-2
                    cursor-pointer
                  "
                >
                  <FaPlus size={12} /> Add task
                </button>
              </div>

              {/* SUBMIT */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isValid}
                className="
                  mt-8
                  w-full
                  rounded-xl
                  border
                  border-white/40
                  py-3
                  font-bowlby
                  transition
                  hover:bg-white
                  hover:text-black
                  disabled:opacity-30
                  disabled:hover:bg-transparent
                  disabled:hover:text-white
                  disabled:cursor-not-allowed
                  cursor-pointer
                "
              >
                Create Todo
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddTodo;
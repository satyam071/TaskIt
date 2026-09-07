import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import TaskItem from "./TaskItem"


interface Todo {
  _id: string;
  heading: string;
  tasks: Task[];
  avatar: string;
  colour: string;
}

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodosProps extends Todo {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Todos: React.FC<TodosProps> = ({
  heading,
  tasks,
  avatar,
  colour,
  isOpen,
  onOpen,
  onClose,


}) => {
  const handleTaskClick = (taskId: string) => {
    console.log("Task clicked:", taskId);
  };


  return (
    <>
      {/* NORMAL CARD */}
      {!isOpen && (
        <motion.div
          layoutId={`todo-${heading}`}
          onClick={onOpen}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 25px rgba(255,255,255,0.35)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="
            w-full
            max-w-sm
            sm:w-70
            p-4
            rounded-2xl
            border
            border-white/30
            cursor-pointer
            overflow-hidden
          "
          style={{ backgroundColor: colour }}
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 text-black">
            <img
              className="
                h-12 w-12
                sm:h-14 sm:w-14
                shrink-0
                rounded-full
                object-cover
                border border-white
              "
              src={avatar}
              alt=""
            />

            <h1 className="text-lg sm:text-xl font-bowlby truncate">
              {heading}
            </h1>
          </div>

          {/* TASKS */}
          <div className="mt-5 space-y-2 text-black">
            {tasks.map(({ _id, title, completed }) => (
              <div
                key={_id}
                className="flex items-center gap-3 "
              >
                <span className="h-4 w-4 rounded-full border border-black flex items-center justify-center">
                  {completed && <FaCheck className="text-black text-[9px]" />}
                </span>

                <p className="font-questrial">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* EXPANDED CARD */}
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
              onClick={onClose}
            />

            {/* EXPANDED CARD */}
            <motion.div
              layoutId={`todo-${heading}`}
              className="
                fixed
                z-50
                left-1/2
                top-1/2
                w-[40vw]
                min-h-[45vh]
                max-h-[80vh]
                -translate-x-1/2
                -translate-y-1/2
                rounded-3xl
                border
                border-white/40
                p-8
                overflow-y-auto
                text-black
              "
              style={{ backgroundColor: colour }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
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

              {/* HEADER */}
              <div className="flex items-center gap-5">
                <img
                  className="
                    h-20
                    w-20
                    rounded-full
                    object-cover
                    border
                    border-black
                  "
                  src={avatar}
                  alt=""
                />

                <h1 className="text-3xl font-bowlby">
                  {heading}
                </h1>
              </div>

              {/* TASKS */}
              <div className="mt-10 space-y-4">
                {tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    {...task}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Todos;
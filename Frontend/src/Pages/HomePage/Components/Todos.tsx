import React from "react";

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
}

const Todos: React.FC<Todo> = ({
  _id,
  heading,
  tasks,
  avatar,
  colour,
}) => {
  return (
    <div
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

        transition-all
        duration-300

        hover:border-white
        hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
        cursor-pointer
        
      "
      style={{ backgroundColor: colour }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          className="
            h-12
            w-12
            sm:h-14
            sm:w-14
            shrink-0
            rounded-full
            object-cover
            border
            border-white
          "
          src={avatar}
          alt={`${heading} avatar`}
        />

        <h1
          className="
            min-w-0
            text-lg
            sm:text-xl
            font-bowlby
            truncate
          "
        >
          {heading}
        </h1>
      </div>

      {/* Tasks */}
      <div className="mt-5 space-y-2">
        {tasks.length > 0 ? (
          tasks.map(({ _id, title }) => (
            <div
              key={_id}
              className="flex items-center gap-3"
            >
              {/* Task indicator */}
              <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-white" />

              <p className="font-questrial text-base sm:text-lg">
                {title}
              </p>
            </div>
          ))
        ) : (
          <p className="ml-5 font-questrial text-sm opacity-70">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Todos;
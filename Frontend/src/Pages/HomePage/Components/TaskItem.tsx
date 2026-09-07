import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface TaskItemProps {
  _id: string;
  title: string;
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  _id,
  title,
  completed,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  return (
    <div
      className={`flex items-center gap-3 ${
        isCompleted ? "text-green-600" : ""
      }`}
    >
      <div
        onClick={() => setIsCompleted((prev) => !prev)}
        className={`
          h-5 w-5
          rounded-full
          border
          flex
          items-center
          justify-center
          cursor-pointer
          transition-all
          duration-200
          ${
            isCompleted
              ? "bg-green-500 border-green-500"
              : "border-black hover:bg-green-400 hover:border-green-500"
          }
        `}
      >
        {isCompleted && (
          <FaCheck className="text-white text-xs" />
        )}
      </div>

      <p className="font-questrial">
        {title}
      </p>
    </div>
  );
};

export default TaskItem;
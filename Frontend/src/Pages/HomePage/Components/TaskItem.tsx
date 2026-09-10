import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { updateStatus } from "../../../API/updateStatus";

interface TaskItemProps {
  _id: string;
  title: string;
  completed: boolean;
  headingId: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  headingId,
  _id,
  title,
  completed,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const handleTasks = async () => {
    setIsCompleted((prev) => !prev)
    try {
      const response = await updateStatus(headingId, _id, isCompleted)
      return response;

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div
      className={`flex items-center gap-3 ${isCompleted ? "text-green-600" : ""
        }`}
    >
      <div
        onClick={() => handleTasks()}
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
          ${isCompleted
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
import type { RootState } from "../../Redux/Store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../Image/Avatar.jpg"
import Todos from "./Components/Todos";
// import axios from "axios";
import { getTodos } from "../../API/getTodos";
import AddTodo from "./Components/AddTodo";
import { makeTodo } from "../../API/makeTodo";

interface Todo {
  _id: string;
  heading: string;
  tasks: Task[];
}

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}
interface Props {

}
export const avatars = [
  {
    image:
      "https://i.pinimg.com/736x/6b/79/57/6b795725d050e31a92a4ef6baae13668.jpg",
    color: "#E8DCC8",
  },
  {
    image:
      "https://i.pinimg.com/474x/90/a5/15/90a515efc89dadaa8b33a50fa443bc95.jpg",
    color: "#D9E7F5",
  },
  {
    image:
      "https://i.pinimg.com/474x/c8/d6/01/c8d6014fbae40ed212141c34d594c271.jpg",
    color: "#E8D5D5",
  },
  {
    image:
      "https://i.pinimg.com/474x/52/b8/e9/52b8e94d2af80e1a2821cf26f585953e.jpg",
    color: "#DDE8D5",
  },
  {
    image:
      "https://i.pinimg.com/474x/9b/e8/f2/9be8f23b67f9328acf2f4e66a9ae1584.jpg",
    color: "#E5D8EA",
  },
  {
    image:
      "https://i.pinimg.com/474x/3d/39/c5/3d39c5bb2fdabbdbe89d4b9a07cf017d.jpg",
    color: "#F0DCC8",
  },
  {
    image:
      "https://i.pinimg.com/474x/ed/f6/16/edf6162f41aa68b7c40c0291bdcf10c8.jpg",
    color: "#D5E5E1",
  },
  {
    image:
      "https://i.pinimg.com/474x/fd/bc/a7/fdbca740fdf21beda9945a61cf714856.jpg",
    color: "#E5D5D5",
  },
  {
    image:
      "https://i.pinimg.com/474x/27/90/d5/2790d598609f33cb26d3da9e6b40f875.jpg",
    color: "#E8E0C8",
  },
  {
    image:
      "https://i.pinimg.com/474x/53/2f/61/532f6126a41d4ef10c790973fe61fe8d.jpg",
    color: "#D8E0EA",
  },
  {
    image:
      "https://i.pinimg.com/474x/06/b0/b5/06b0b526e0aec72d0fc4b048661af5a4.jpg",
    color: "#E5D8E5",
  },
  {
    image:
      "https://i.pinimg.com/474x/25/6b/b7/256bb7061c14f10483903d18b278f26d.jpg",
    color: "#DDE5D5",
  },
  {
    image:
      "https://i.pinimg.com/236x/6b/74/fd/6b74fda8258a09616c3659d9fab72f82.jpg",
    color: "#E8D8D0",
  },
];

const HomePage: React.FC<Props> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useSelector((state: RootState) => state.login)
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddTodo = async (newTodo: { heading: string; tasks: Task[] }) => {
    try {
      const response = await makeTodo(newTodo);
      setTodos((prev) => [...prev, response.list]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.todos);
      return response;


    }
    fetchTodos()



  }, [selectedTodo])
  return (
    <div className="bg-black text-white min-h-screen ">
      {/* header */}
      <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20 lg:py-10 font-bowlby">

        {/* User info */}
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14 md:h-15 md:w-15"
            src={Avatar}
            alt="User avatar"
          />

          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg md:text-xl">
              Hello
            </h2>

            <h1 className="text-xl sm:text-2xl md:text-3xl truncate max-w-45 sm:max-w-none">
              {user?.username}
            </h1>
          </div>
        </div>

        

      </div>
      {/* todos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5 sm:px-8 md:px-12 lg:px-20 pb-10">
        {todos.map((item) => {
          const randomAvatar =
            avatars[Math.floor(Math.random() * avatars.length)];

          return (
            <Todos
              key={item._id}
              {...item}
              avatar={randomAvatar.image}
              colour={randomAvatar.color}
              isOpen={selectedTodo === item._id}
              onOpen={() => setSelectedTodo(item._id)}
              onClose={() => setSelectedTodo(null)}
            />
          );
        })}
        {/* <div className="
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
        
      ">
          <p className="font-bowlby text-5xl flex justify-around items-center h-full">+</p>

        </div> */}
        <AddTodo
          isOpen={isAddOpen}
          onOpen={() => setIsAddOpen(true)}
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAddTodo}
        />
      </div>

    </div>
  );
};

export default HomePage;
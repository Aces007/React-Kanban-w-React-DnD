import { useEffect, useState } from 'react';
import './index.css';
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import EditTask from './components/EditTask';
import { useDrop } from 'react-dnd';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  
  useEffect(() => {
    let array = localStorage.getItem("taskList");

    if (array) {
      setTaskList(JSON.parse(array))
    }
  }, [])

  const [{isOver}, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id, item.projectName, item.taskDescription, item.timestamp, item.duration),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const addToCompleted = (id, projectName, taskDescription, timestamp, duration) => {
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [...completed, {moveTask, projectName, taskDescription, timestamp, duration}]);
  }
  
  return (
    <>
    <div className='flex flex-col justify-center items-center m-8 gap-4'>
      <h1 className='font-serif lg:text-4xl md:text-3xl sm:text-2xl'>Kanban Task Tracker</h1>
      <p className='font-serif lg:text-xl md:text-lg sm:text-base'>Hi There!</p>
      <p className='font-serif text-base'>Click <AddTask taskList={taskList} setTaskList={setTaskList}/> to add a new task</p>
    </div>
    <div className='flex flex-row gap-10'>
      <div className='w-full'>
        <h2 className='ml-7 text-xl font-serif hover:underline hover:text-green-700 hover:cursor-pointer'>ToDo Tasks:</h2>
        {taskList.map((task, i) =>
          <ToDo key={i} task={task} index={i} taskList={taskList} setTaskList={setTaskList}/>
        )}
      </div>
      <div className='w-full' ref={drop}>
        <h2 className='ml-7 text-xl font-serif hover:underline hover:text-green-700 hover:cursor-pointer'>Completed Tasks:</h2>
        {completed.map((task, i) =>
          <ToDo key={i} task={task} index={i} taskList={taskList} setTaskList={setTaskList}/>
        )}
      </div>
    </div>
    </>
  );
}

export default App

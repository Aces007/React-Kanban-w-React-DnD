import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({task, index, taskList, setTaskList}) => {
    const [time, setTime] = useState(task.duration);
    const [running, setRunning] = useState(false);
    const [{isDragging}, drag] = useDrag(() => ({
        type: "todo",
        item: {
            id: index,
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timestamp: task.timestamp,
            duration: task.duration
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))


    useEffect (() => { //Stopwatch Function
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running])

    const handleStop = () => {
        setRunning(false);

        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timestamp: task.timestamp,
            duration: time
        })

        localStorage.setItem("taskList", JSON.stringify(taskList))
        window.location.reload();
    }
 
    const handleDelete = itemID => { //itemID is the item to be deleted.
        let removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        window.location.reload();
        // setTaskList((currentTasks => currentTasks.filter(todo => todo.id !== itemID ))) //todo.id is the items that will be retained when itemID is deleted.
    }

    return (
        <>
            <div className="flex flex-col items-start justify-start bg-input p-4 my-4 mx-5 px-6 w-full max-w-4xl" ref={drag}>
                <div className="w-full flex flex-row justify-between">
                    <p className="text-xl font-serif">{task.projectName}</p>
                    <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
                </div>
                <p className="text-lg font-sans">{task.taskDescription}</p>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="font-semibold text-lg mb-2 ">
                        <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                        <span className="text-sm">:{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </div>
                    <div className="flex flex-row justify-evenly w-1/3 max-w-sm">
                        {running ? (
                            <button 
                                className="border rounded-lg py-1 px-3 bg-red-600 hover:text-white hover:bg-red-500"
                                onClick={handleStop}
                            >STOP</button>): (
                                <button 
                                    className="border rounded-lg py-1 px-3 bg-green-600 hover:text-white hover:bg-green-500"
                                    onClick={() => {
                                        setRunning(true)
                                    }}
                                >START</button>)
                            }
                            <button 
                                className="border rounded-lg py-1 px-3 bg-orange-600 hover:text-white hover:bg-orange-500"  
                                onClick={() => {
                                    setTime(0)
                                }}
                            >RESET</button>
                    </div>
                </div>
                <div className="flex flex-row justify-center w-full mt-5">
                    <button 
                        className="bg-red-600 p-1.5 rounded-lg text-white font-mono hover:bg-red-500" 
                        onClick={handleDelete}
                    >DELETE</button>
                </div>
            </div>
        </>
    )
}


export default ToDo
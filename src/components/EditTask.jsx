import { useEffect, useState } from "react";

const EditTask = ({task, taskList, setTaskList}) => {
    const [editModal, setEditModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        setProjectName(task.projectName);
        setTaskDescription(task.taskDescription);
    }, [])

    const handleInput = e => {
        const {name, value} = e.target;

        if (name === "projectName") setProjectName(value)
        if (name === "taskDescription") setTaskDescription(value)
    }

    const handleUpdate = e => {
        e.preventDefault();
        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: projectName,
            taskDescription: taskDescription,
            timestamp: task.timestamp,
            duration: task.duration
        });
        localStorage.setItem("taskList", JSON.stringify(taskList))
        window.location.reload()
        setEditModal(false);
    }   

    return (
        <>
            <button 
                className="bg-blue-600 p-1.5 w-1/8 text-white font-mono hover:bg-purple-500 rounded-md"
                onClick={() => setEditModal(true)}
            >EDIT</button>
            {editModal ? (
                <>  
                    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
                        <div className="w-9/12 max-w-lg bg-white rounded-md shadow-md relative flex flex-col">
                            <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                                <h3 className="font-serif text-xl font-medium">Update Task</h3>
                                <button 
                                    className="px-1 text-gray-600 float-right text-lg leading-none font-semibold block hover:bg-red-500 hover:text-white" 
                                    onClick={() => setEditModal(false)}
                                >x</button>
                            </div>
                            <form className="p-6">
                                <div>
                                    <label 
                                        htmlFor="project-name" 
                                        className="track-wide uppercase text-gray-700 text-xs font-semibold block"
                                    >Project Name</label>
                                    <input 
                                        id="project-name" 
                                        placeholder="Project Name" 
                                        name="projectName" 
                                        value={projectName} 
                                        type="text" 
                                        onChange={handleInput} 
                                        className="w-full bg-gray-100 text-black-300 border border-gray-200 rounded-md p-4 mt-2 mb-5 leading-tight focus:outline-none focus:bg-white" 
                                        required/>
                                </div>
                                <div>
                                    <label 
                                        className="track-wide uppercase text-gray-700 text-xs font-semibold block" 
                                        htmlFor="task-description">
                                            Task Description
                                    </label>
                                    <textarea 
                                        id="task-description" 
                                        placeholder="Task Description" 
                                        name="taskDescription" 
                                        value={taskDescription} 
                                        rows="5"
                                        onChange={handleInput} 
                                        className="w-full bg-gray-100 text-black-300 border border-gray-200 rounded-md p-4 mt-2 mb-5 leading-tight focus:outline-none focus:bg-white"
                                    ></textarea>
                                </div>
                            </form>
                            <div className="relative left-6 mb-5">
                                <button 
                                    type='submit'
                                    onClick={handleUpdate}
                                    className="bg-green-600 p-2.5 rounded-md text-white font-serif font-semibold hover:bg-green-500"
                                >Update Task</button>
                            </div>
                        </div>
                    </div>     
                </>) : null}
        </>
    )
}


export default EditTask
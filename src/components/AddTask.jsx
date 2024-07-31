import {useState} from "react";


const AddTask = ( { taskList, setTaskList } ) => {
    const [addModal, setAddModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleInput = e => {
        const {name, value} = e.target;

        if (name === "projectName") {
            setProjectName(value) 
            setErrorMessage("")
        };
        
        if (name === "projectName" && value === "") {
            setErrorMessage("Enter the project name to continue")
        };
        
        if (name === "taskDescription") setTaskDescription(value)
    }

    const handleAdd = e => {
        e.preventDefault();
        if (!projectName) {
            setErrorMessage("Enter the project name to continue")
        } else {
            let timestamp = new Date();
            let tempList = taskList;
            tempList.push({
                projectName, 
                taskDescription, 
                timestamp: timestamp, 
                duration: 0
            });
            localStorage.setItem("taskList", JSON.stringify(tempList));
            window.location.reload();
            setProjectName("");
            setTaskDescription("");
            setAddModal(false);
        }
    }    

    return (
        <>
            <button 
                type='button'
                onClick={() => setAddModal(true)} 
                className="bg-green-600 opacity-85 text-white rounded-xl p-2 hover:bg-green-500 opacity-80"
            >+New</button>
            {addModal ? (
                <>
                    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
                        <div className="w-9/12 max-w-lg bg-white rounded-md shadow-md relative flex flex-col">
                            <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                                <h3 className="font-serif text-xl font-medium">Add New Task</h3>
                                <button 
                                    className="px-1 text-gray-600 float-right text-lg leading-none font-semibold block hover:bg-red-500 hover:text-white" 
                                    onClick={() => setAddModal(false)}
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
                                        className="w-full bg-gray-100 text-black-300 border border-gray-200 rounded-md p-4 mt-2  leading-tight focus:outline-none focus:bg-white" 
                                        required/>
                                        <p className="text-red-400 font-serif font-semibold mb-5">{errorMessage}</p>
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
                                    onClick={handleAdd}
                                    className="bg-green-600 p-2.5 rounded-md text-white font-serif font-semibold hover:bg-green-500"
                                >Add Task</button>
                            </div>
                        </div>
                    </div>                
                </>
            ) : null}
        </>
    )
}


export default AddTask
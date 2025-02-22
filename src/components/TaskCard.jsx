/* eslint-disable react/prop-types */
// TaskCard.jsx

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const TaskCard = ({ task }) => {
    // Format timestamp to a readable string
    const formattedDate = new Date(task.timestamp).toLocaleString();

    // Determine badge styles based on the task category
    const badgeStyles = {
        'To-Do': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-200 text-yellow-800',
        'Done': 'bg-green-100 text-green-800',
    };

    return (
        <div className="bg-white  shadow-lg rounded-md p-4 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
            <div>
                <h3
                    className="text-xl font-semibold text-gray-800 truncate"
                    title={task.title}
                >
                    {task.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
            </div>
            <div className="mt-4 flex justify-between">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${badgeStyles[task.category]}`}>
                    {task.category}
                </span>

                <div className="flex gap-3">
                    <CiEdit className="cursor-pointer text-xl" />
                    <MdDeleteOutline  className="cursor-pointer text-xl" />
                </div>


            </div>
        </div>
    );
};

export default TaskCard;

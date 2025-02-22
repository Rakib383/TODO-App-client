import { useContext, useEffect, useState } from "react"
import { AuthContext } from './AuthProvider';
import { Link } from "react-router-dom";
import logo from "./assets/pen.png"
import dummyPic from "./assets/dummy.jpg"
import { IoMdAddCircle } from "react-icons/io";
import { HiOutlineViewBoards } from "react-icons/hi";
import { FaRegCircleDot } from "react-icons/fa6";
import TaskCard from "./components/TaskCard";
import { MdOutlineDone } from "react-icons/md";
import { RiProgress2Line } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { useAxiosPublic } from './hooks/useAxiosPublic';

const App = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, logOut } = useContext(AuthContext)
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In Progress": [],
    "Done": []
  })

  const axiosPublic = useAxiosPublic()

  useEffect(() => {

    if (user) {
      const newColumns = {
        "To-Do": [],
        "In Progress": [],
        "Done": []
      }
      axiosPublic.get(`/tasks?uid=${user.uid}`)
        .then(res => {

          res.data.forEach(task => {
            newColumns[task.category].push(task)
          })

          setColumns(newColumns)

        })
    }

  }, [user])

  const handleAddTask = (newTask) => {
    newTask.timestamp = new Date().toISOString()
    newTask._id = Date.now()
    newTask.userID = user.uid

    setColumns(prev => ({
      ...prev,
      [newTask.category]: [...prev[newTask.category], newTask]
    }))

    axiosPublic.post("/tasks", newTask)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))

    // Reset the form
    reset();
    // Close the modal using the native dialog method.
    document.getElementById('addModal').close();

  }

  const handleUpdateTask = (updatedTask) => {

    setColumns(prev => {
      // Create a new columns object
      const updatedColumns = { ...prev };
      let originalCategory = null;

      // Remove the task from the column using filter
      Object.keys(updatedColumns).forEach((category) => {
        // Check if this column contains the task, and if so, record its category
        if (updatedColumns[category].some(task => task._id === updatedTask._id)) {
          originalCategory = category;
        }
        // Filter out the task from the column
        updatedColumns[category] = updatedColumns[category].filter(task => task._id !== updatedTask._id);
      });

      // Determine the new category for the task.
      const newCategory = updatedTask.category

      // Insert the updated task into the new category array
      updatedColumns[newCategory] = [
        ...updatedColumns[newCategory],
        updatedTask
      ];

      return updatedColumns;
    });

    // Send update request to backend
    axiosPublic.patch(`/tasks/${updatedTask._id}`, updatedTask)
      // .then(res => console.log(res.data))
      .catch(err => {
        console.error("Failed to update task:", err);

      });

    // Close the modal using the native dialog method.
    document.getElementById('updateModal').close();

  }

  const handleDeleteTask = (deleteTask) => {

    setColumns(prev => {
      // Create a new columns object
      const updatedColumns = { ...prev };
     

     updatedColumns[deleteTask.category] = updatedColumns[deleteTask.category].filter(task => task._id !== deleteTask._id)

      return updatedColumns;
    });

    // Send update request to backend
    axiosPublic.delete(`/tasks/${deleteTask._id}`)
      // .then(res => console.log(res.data))
      .catch(err => {
        console.error("Failed to update task:", err);

      });

  }


  // [#83dbf2]




  return (
    <div>
      {/* navbar */}
      <div className=" fixed w-full z-50 bg-gray-200   border-b-slate-700  backdrop-blur-lg ">
        <div className="navbar px-4 md:px-6 py-2 max-w-7xl mx-auto rounded-md">
          <div className="navbar-start">

            <Link className="" to="/" >
              <div className="flex items-end">
                <img src={logo} className="w-12 md:w-14" alt="" />
                <p className=" text-2xl text-[#83DBF2] "><span className="text-[#0F1325]  text-xl">Task</span>Minder</p>
              </div>
            </Link>
          </div>



          <div className="navbar-end   gap-16 lg:gap-32">


            <div className="flex  items-center shrink-0">

              {
                user ?
                  <div className="flex shrink-0 items-center justify-center gap-2" >

                    <button
                      className="block text-sm pe-1 font-medium text-gray-900 rounded-full   md:me-0   dark:text-white"
                      type="button"
                    >

                      <img
                        className="w-10 h-10  text-ThirdColor rounded-full outline outline-black  "
                        src={dummyPic}
                        alt="user Img"
                      />

                    </button>
                    <button

                      onClick={() => {
                        logOut()

                      }}
                      className=" btn outline  text-start px-3  text-sm min-h-9 h-9"
                    >
                      Sign out
                    </button>
                  </div>
                  : <Link to="/login" className="btn  px-3 h-10 min-h-10 text-white hover:bg-green-900">LogIn</Link>
              }
            </div>

          </div>
        </div>

        <div className="py-3 flex gap-3 justify-center bg-white">
          <div className="flex items-center justify-center bg-sky-400  px-2 py-1.5 rounded-md text-white font-bold">
            <HiOutlineViewBoards className="text-xl" />Board View
          </div>

          <button onClick={() => document.getElementById('addModal').showModal()} className="flex items-center justify-center bg-green-500 cursor-pointer px-2 rounded-md text-white font-bold">
            <IoMdAddCircle className="text-xl" /> Add Task
          </button>

        </div>
      </div>

      {/* add task modal */}
      <dialog id="addModal" className="modal open">
        <div className="modal-box p-5">
          <h3 className="text-xl font-bold mb-4 text-center">Add New Task</h3>
          <form className="space-y-4 text-black" onSubmit={handleSubmit(handleAddTask)}>
            {/* Title Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black mb-1.5">
                  Title (max 50 characters)
                </span>
              </label>
              <input
                type="text"
                placeholder="Task title"
                maxLength={50}
                className="input input-bordered w-full"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title.message}</span>
              )}
            </div>

            {/* Description Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black mb-1.5">
                  Description (optional)
                </span>
              </label>
              <textarea
                placeholder="Task description"
                className="textarea textarea-bordered w-full"
                {...register("description")}
              />
            </div>

            {/* Category Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black mb-1.5">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: "Category is required" })}
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">{errors.category.message}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="modal-action flex justify-end space-x-2">
              <button
                onClick={() => document.getElementById('addModal').close()}
                type="button"
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* update-task modal */}
      <dialog id="updateModal" className="modal open">
        <div className="modal-box p-5">
          <h3 className="text-xl font-bold mb-4 text-center">Update Task</h3>
          <form className="space-y-4 text-black" onSubmit={handleSubmit(handleUpdateTask)}>
            {/* Title Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black mb-1.5">
                  Title (max 50 characters)
                </span>
              </label>
              <input
                type="text"
                placeholder="Task title"
                maxLength={50}
                className="input input-bordered w-full"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title.message}</span>
              )}
            </div>

            {/* Description Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black mb-1.5">
                  Description (optional)
                </span>
              </label>
              <textarea
                placeholder="Task description"
                className="textarea textarea-bordered w-full"
                {...register("description")}
              />
            </div>

            {/* Category Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black mb-1.5">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: "Category is required" })}
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">{errors.category.message}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="modal-action flex justify-end space-x-2">
              <button
                onClick={() => document.getElementById('updateModal').close()}
                type="button"
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>



      {/* all-tasks container*/}

      <div className="px-5 pt-36 flex flex-col md:flex-row flex-wrap items-center md:items-start justify-center w-full pb-10 gap-5">

        {/* todo tasks */}
        <div className="bg-gray-200 pb-7 rounded-lg w-72 sm:w-80 ">
          <h3 className="flex items-center justify-center py-1 gap-1 font-bold bg-blue-200 text-blue-900 w-fit px-3 rounded-sm mx-auto my-2 mb-3"><FaRegCircleDot className="text-sm " />TO DO</h3>
          {/* tasks container */}
          <div className="flex  flex-col gap-4 px-4 ">

            {
              columns["To-Do"].map((task, idx) => <TaskCard handleDeleteTask={handleDeleteTask} reset={reset} key={idx} task={task} />)
            }


          </div>

        </div>

        {/* In Progress tasks */}
        <div className="bg-gray-200 pb-7 rounded-lg w-72 sm:w-80 ">
          <h3 className="flex items-center justify-center py-1 gap-1 font-bold bg-yellow-500 text-black w-fit px-3 rounded-md mx-auto my-2 mb-3"><RiProgress2Line className="text-md" />In Progress</h3>
          {/* tasks */}
          <div className="flex flex-col gap-4 px-4">

            {
              columns["In Progress"].map((task, idx) => <TaskCard handleDeleteTask={handleDeleteTask} key={idx} reset={reset} task={task} />)
            }


          </div>

        </div>

        {/* Done tasks */}
        <div className="bg-gray-200 pb-7 rounded-lg w-72 sm:w-80 ">
          <h3 className="flex items-center justify-center py-1 gap-1 font-bold bg-green-500 text-white w-fit px-3 rounded-md mx-auto my-2 mb-3"><MdOutlineDone className="text-lg " />Done</h3>
          {/* tasks */}
          <div className="flex flex-col gap-4 px-4">

            {
              columns["Done"].map((task, idx) => <TaskCard handleDeleteTask={handleDeleteTask} reset={reset} key={idx} task={task} />)
            }


          </div>

        </div>

      </div>


    </div>
  )
}

export default App

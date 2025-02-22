import React from 'react';
import { useForm } from 'react-hook-form';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Pass the form data to the parent component.
    onAddTask(data);
    // Reset the form
    reset();
    // Close the modal using the native dialog method.
    document.getElementById('addModal').close();
    // Alternatively, you can call onClose() if it handles closing the modal.
  };

  // Render nothing if the modal is not open.
  if (!isOpen) return null;

  return (
    <dialog id="addModal" className="modal open">
      <div className="modal-box p-5">
        <h3 className="text-xl font-bold mb-4 text-center">Add New Task</h3>
        <form className="space-y-4 text-black" onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default AddTaskModal;

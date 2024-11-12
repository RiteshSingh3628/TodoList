import React, { useState, useEffect } from "react";
import "../css/style.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
// import Modal from './Modal'
import Modal from "./Modal";
import CreatePostModal from "./CreatePostModal";

function Home() {
  // data
  const [data, setData] = useState([]);
  const [openState,setOpenState] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [addTask,setAddTask] = useState(null)

  useEffect(() => {
    fetchData();
    
  }, [data]);
  // URL
  const serverUrl = "http://localhost:5000/task/all";

  // fetching data function
  const fetchData = () => {
    fetch(serverUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // console.log(data[0])
        setData(data); // Set data if successful
        // Initialize openStates with the same length as fetched data
        setOpenState(data.map(()=>false));
      })
      .catch((err) => {
        // Catch any errors
        console.log(err);
      });
  };



// toggle the element of the lists
  const toggleItem = (index)=>{
    setOpenState((prevStates)=>
      // if the state is false then make it true and vice versa
        prevStates.map((isOpen,i)=>(i === index ? !isOpen : isOpen))
    )
    // console.log(openState)
  }

  const openModal = (task) =>{
    
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  const closeModal = () =>{
    setSelectedTask(null);
    setIsModalOpen(false);
  }

  const openCreateModal =() =>{
    setIsCreateModalOpen(true);
  }


// function to handle delete tasks
  const handleDelete = async (taskId) => {
    try {
        const response = await fetch(`http://localhost:5000/task/delete/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setData(data.filter(task => task.id !== taskId));
            console.log('deleted sussfully')
        } else {
            console.error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

// Function to update a task
const handleEdit = async (updatedTask) => {
  try {
      const response = await fetch(`http://localhost:5000/task/edit/${updatedTask._id}`, {
          method: 'PUT', // Use 'PATCH' if you only want to update specific fields
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
          const updatedTaskFromServer = await response.json();
          console.log('Updated successfully')
          setData(data.map(task => (task.id === updatedTaskFromServer.id ? updatedTaskFromServer : task)));
      } else {
          console.error('Failed to update task');
      }
  } catch (error) {
      console.error('Error updating task:', error);
  }
  closeModal();
};


// create Task
const handleCreatePost = (createdTask)=>{
  fetch(`http://localhost:5000/task/add`, {
    method: 'POST', // Use 'PATCH' if you only want to update specific fields
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(createdTask),
  })
  .then(resp=>{
    if(resp.ok){
      console.log("Added task to database sussfully")
      fetchData()
    }
    else {
      console.error('Failed to update task');
  }
  })
  .catch(err=>{
    console.error('Error posting task:', err);
  })

  closeModal();
}
    

  return (
    <>
      <div className=" bg-stone-900 flex flex-col h-screen justify-center items-center">
        <h1 className=" font-serif mb-10 font-extrabold w-auto text-center text-white text-3xl ">
          TO DO LIST
        </h1>
        <div
          className=" p-7 flex container flex-col gap-2 w-2/3 h-2/3 
                shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]
        bg-violet-800 border-solid border-red-400"
        >
          {!data ? (
            <div>Loaging..</div>
          ) : (
            data.map((item, index) => (
              <div key={index} className="flex flex-col p-2 bg-lime-600 rounded-md">
                <div className="flex gap-3">
                <div className="bg-violet-600 p-1 px-2 rounded-md text-sm font-bold text-white" >{item.title}</div>
                <button className="hover:text-white" onClick={()=>toggleItem(index)}><FaAngleDown/></button>
                <button className="hover:text-white" onClick={()=>{openModal(item)}}><FaRegEdit/></button>
                <button className="hover:text-white" onClick={()=>{handleDelete(item._id)}} >< MdDelete/></button>
                </div>
                <div className="p-2 bg-white rounded-md text-violet-600 font-sans">{item.desc}</div>
                {/* {openState[index] && (
                )} */}
              </div>
            ))
          )}
        </div>
        <div className="rounded-full w-200px h-200px mt-16 bg-violet-600 text-white text-xl p-5 " onClick={openCreateModal}><IoMdAdd /></div>
      </div>
      <Modal
                isOpen={isModalOpen}
                task={selectedTask}
                onClose={closeModal}
                onSubmit={handleEdit}
      />

      <CreatePostModal 
        isOpen = {isCreateModalOpen}
        onClose = {closeModal}
        onPost = {handleCreatePost}
      />
    </>
  );
}

export default Home;

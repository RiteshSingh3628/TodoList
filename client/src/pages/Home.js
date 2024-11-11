import React, { useState, useEffect } from "react";
import "../css/style.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

function Home() {
  // data
  const [data, setData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
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
      })
      .catch((err) => {
        // Catch any errors
        console.log(err);
      });
  };

  // Toggle the collapsed state on button click
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className=" bg-stone-900 flex flex-col h-screen justify-center items-center">
        <h1 className=" font-serif mb-10 font-extrabold w-auto text-center text-white text-3xl ">
          WELCOME TO TASK MANAGER
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
              <div className="flex flex-col p-2 bg-lime-600 rounded-md">
                <div className="flex gap-3">
                <div className="bg-violet-600 p-1 px-2 rounded-md text-sm font-bold text-white" >{item.title}</div>
                <button className="hover:text-white" onClick={toggleCollapse}><FaAngleDown /></button>
                <button className="hover:text-white"><FaRegEdit/></button>
                <button className="hover:text-white">< MdDelete/></button>
                </div>
                {!isCollapsed && (
                  <div className="p-2 bg-white rounded-md text-violet-600 font-sans">{item.desc}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

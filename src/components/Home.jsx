// Home.jsx

import React, { useEffect, useState } from "react";
import Todo from "./partials/Todo.jsx";
import Header from "./partials/Header.jsx";
import TodoModal from "./partials/TodoModal.jsx";
import { useNavigate } from "react-router-dom";
import { getTodoListApi, getToken } from "../services/api.js";
import { ToastContainer, toast } from 'react-toastify';


function Home() {
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [list,setList] = useState([])
  const [filteredList, setFilteredList]= useState([])
  const [refreshList,setRefreshList] = useState();
  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList();
  }, [refreshList]);

  useEffect(() => {
    if(searchText ===''){
      setFilteredList(list)
    }else{
      const filterlist = list.filter(todo=>todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
      setFilteredList(filterlist)
    }
  }, [list,searchText]);



  async function fetchTodoList() {
    const result = await getTodoListApi()
    // console.log('todolist',result)

    if(result.status===200 && result.data.status===200){
        setList(result.data.data.todos.reverse())
    }
    
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-md-center mt-4">
            {
              filteredList.map((todo) => <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
            }
            {
              filteredList.length===0 && <div classname="notFoundTodos">
                No todos Found
              </div>
            }

        </div>

        {/* Add Button */}
        <div
          className=""
          style={{
            position: "fixed",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1030,
          }}
        >
          <button type="button" onClick={openModal} className="btn btn-primary">
            Add Todo
          </button>
        </div>

        {/* Render the TodoModal component */}
        <TodoModal setRefreshList={setRefreshList} showModal={isModalVisible} closeModal={closeModal} />
      </div>
    </div>
  );
}

export default Home;

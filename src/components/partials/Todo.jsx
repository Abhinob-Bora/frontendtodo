import React from 'react'
import moment from 'moment/moment.js'
import { MarkTodoApi, deleteTodoApi } from '../../services/api.js'
import { toast } from 'react-toastify'

function Todo({todo,setRefreshList}) {
    const handleDelete = async() =>{
        const result = await deleteTodoApi(
            {
                todo_id:todo._id
            })
            if(result.data.status ===200){
                setRefreshList(new Date())
                toast('Deleted')
            }else{
                toast('Failed to delete, please try again')
            }
        

    }
    
    const handleMarkTodo = async() =>{
        const result = await MarkTodoApi({
                todo_id:todo._id
            })
            if(result.data.status ===200){
                setRefreshList(new Date())
                toast(result.data.message)
            }else{
                toast('Failed to Mark, please try again')
            }
        

    }
    return (
        <div className='col-sm-3 mx-3 my-2 alert bg-light'>
            <div className='card-header'>
                {todo.isCompleted ? 'Completed':'Not Completed' }
            </div>
            <div className='card-body'>
                <h4 className='card-title' style={{textDecoration: todo.isCompleted? 'line-through':'none'}}>
                    {todo.desc}
                </h4>
                <p className='card-text'>
                    {moment(todo.date).fromNow()}
                </p>
                

            </div>
            <div className='actionButtons' style={{display: 'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div className='deleteButton'>
                        <button style={{background:'red'}} onClick={handleDelete}>Delete</button>
                    </div>
                    <div className='markTodo'>
                        <button onClick={handleMarkTodo}  style={{background:'lightgreen'}}>
                           {todo.isCompleted? 'Mark Incomplete':'Mark Complete'} 
                        </button>
                    </div>
                     
                </div>
        
        </div>
    )
}

export default Todo
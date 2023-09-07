// TodoModal.jsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createTodoApi } from '../../services/api.js';

function TodoModal({ setRefreshList,showModal, closeModal }) {
  const [todoDesc, setTodoDesc] = useState('');

  const handleTodoSubmit = async() => {
    // console.log(todoDesc, 'todoDesc');
    if (todoDesc === '') {
      toast('Todo is required');
      return;
    }
    const result = await createTodoApi({desc: todoDesc});
    if(result.status===200 && result.data.status===200){
        toast('todo added')
        setRefreshList(new Date())
    }else{
        toast(result.data.message);
    }
  };

  const handleCloseModal = () => {
    setTodoDesc(''); // Clear the textarea
    closeModal(); // Close the modal by updating the parent component's state
  };

  return (
    <div className={`modal${showModal ? ' show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            {/* Box-like structure for input field */}
            <div className="form-group">
              <label htmlFor="todoInput">Todo:</label>
              <textarea className="form-control" onChange={(e) => { setTodoDesc(e.target.value) }} id="todoInput" rows="3" placeholder="Enter your todo..."></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"  onClick={handleCloseModal}>Close</button>
            <button
  type="button"
  className="btn btn-primary"
  data-bs-dismiss="modal"
  onClick={() => {
    handleTodoSubmit();
    handleCloseModal();
  }}
>
  Save
</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;

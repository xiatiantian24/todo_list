import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInput, setListInput] = useState('');

  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]); //appending the headingInput AND an empty sublist
      setHeadingInput('');
    }
  }

  const handleAddList = (index) => {
    if (listInput.trim() !== '') {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInput);
      setTodos(newTodos);
      setListInput('');
    }
  };

  const handleDeleteTodo = (index) => { //Declares a constant with an arrow function which takes an index parameter, indicating the index of the todo item to be deleted
    const newTodos = [...todos]; //Creates a shallow copy of the todos array using the spread syntax (…todos). This step is crucial to avoid directly mutating the original state
    newTodos.splice(index, 1); //remove one element at the specified index
    setTodos(newTodos); //hook. updates the state variable todos with the modified array, removing the todo item specified by the index from the UI and re-rendering the component accordingly
  };

  const handleDeleteItem = (index, listIndex) => {
    const newTodos = [...todos];
    const newLists = newTodos[index].lists[listIndex];
    // newTodos[index].lists.splice(listIndex, 1);
    console.log(newLists)
    setTodos(newTodos);
    setLists(newLists);
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => { setHeadingInput(e.target.value); }}// Add onChange event handler to update headingInput state
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3>
              <button className="delete-button-heading" onClick={handleDeleteTodo}>Delete Heading</button>      </div>
            <ul>
              {todo.lists.map((list, listIndex) => (
                  <li key={listIndex} className='todo_inside_list'>
                    <p>{list}</p>
                    <button className="delete-button" onClick={handleDeleteItem}>Delete Item</button>
                  </li>
              ))}
            </ul>
            <div className='add_list'>
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInput}
                onChange={(e) => setListInput(e.target.value)}
              />
              <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;

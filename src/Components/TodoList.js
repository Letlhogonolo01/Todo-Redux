
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Modal, Table} from "react-bootstrap";

import { removeTodo } from "./Redux/Slice/todo";
import TodoItem from "./Components/TodoItem";
import FormAdd from "./Components/FormAdd";



const TodoList = () => {

const dispatch = useDispatch()

const todoList = useSelector(state => state.todo.list)

const [show, setShow] = useState(false)
const [deleteTodo, setDeleteTodo] = useState({})

const handleClickRemove = (todo) => {
  setShow(true)
  setDeleteTodo(todo)
}

const handleRemove = () => {
  dispatch(removeTodo(deleteTodo))
  setShow(false)
}

    return ( 
        <div>
            <Container>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Remove todo?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to delete it?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRemove}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <FormAdd />
        <h1 className="title">Todo App</h1>
        <Table striped hover bordered style={{ textAlign: "center", verticalAlign: "middle" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList && todoList.map(todo => {
              return (
                <TodoItem 
                  key={todo.id} 
                  id={todo.id}
                  name={todo.name} 
                  isDone={todo.isDone} 
                  createdAt={todo.createdAt}
                  updatedAt={todo.updatedAt}
                  onClickRemove={handleClickRemove}
                />
              )
            })}
          </tbody>
        </Table>
      </Container>
        </div>
     );
}
 
export default TodoList;
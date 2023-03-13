import axios from 'axios'
import { useEffect, useState } from 'react'
import './todo.css'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete'

const Todo = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get('http://localhost:8000/my-list');
          setList(response.data);
        }
    
        fetchData()

        const interval = setInterval(() => {
            fetchData()
        }, 2000)

        return () => clearInterval(interval)
      }, []);



     function deleteTask(taskId) {
        axios.delete(`http://localhost:8000/my-list/${taskId}`)
        .then(response => {
            setList(list.filter(task => task.id !== taskId))
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })    
        
    }

    
    // Completed Tasks List
    
    const [newList, setNewList] = useState([])

    function finishTask(taskId) {
        
        const finishedTask = list.filter(finished => finished.id === taskId)

        axios.post(`http://localhost:8000/finished-list`, finishedTask, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
                console.log(finishedTask)
            // Delete from Task List
                axios.delete(`http://localhost:8000/my-list/${taskId}`)
                .then(response => {
                    setList(list.filter(task => task.id !== taskId))
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })    
        })
        .catch(error => {
            console.log(error)
        })

    }

    return (
        <>
            <div className='list-bg'>

                <h1 className='list-title'>My To Do List</h1>
                <div className="tasks-container">
                    {list.length > 0 ? (
                            list.map(task => {
                                return (
                                <div key={task.id} className='task-item'>
                                    <h1 className='task-title'>{task.taskName}</h1>
                                    <hr/>
                                    <p className='task-duration'>Duration: {task.taskDuration}</p>
                                    <div className='icons-box'>
                                    <i className='done-icon' onClick={() => {finishTask(task.id)}}>
                                        <DoneIcon fontSize='large' sx={{color: 'var(--primaryColor)', "&:hover": {color: 'green', fontSize: '60px'}}}/>
                                    </i>
                                    <i className='delete-icon' onClick={() => {deleteTask(task.id)}}>
                                        <DeleteIcon fontSize='large' sx={{color: 'var(--primaryColor)', "&:hover": {color: 'red', fontSize: '60px'},}}/>
                                    </i>
                                    </div>
                                </div>)
                            })
                    ) : (
                        <div>
                            <h1>Loading data...</h1>
                        </div>
                    )}                    
                </div>
                <div className='finished-container'>
                        <h1 className='list-title'>My finished tasks</h1>
                        {newList.length > 0 ? (
                            newList.map(completed => {
                                return (
                                    <div key={completed.id} className='task-item'>
                                    <h1 className='task-title'>{completed.taskName}</h1>
                                    <hr/>
                                    <p className='task-duration'>Duration: {completed.taskDuration}</p>
                                    <div className='icons-box'>
                                    <i className='done-icon' onClick={() => {finishTask(completed.id)}}>
                                        <DoneIcon fontSize='large' sx={{color: 'var(--primaryColor)', "&:hover": {color: 'green', fontSize: '60px'}}}/>
                                    </i>
                                    <i className='delete-icon' onClick={() => {deleteTask(completed.id)}}>
                                        <DeleteIcon fontSize='large' sx={{color: 'var(--primaryColor)', "&:hover": {color: 'red', fontSize: '60px'},}}/>
                                    </i>
                                    </div>
                                </div>) 
                            })
                            ) : (
                                <div>Loading data...</div>
                            )}
                </div>
            </div>
        </>
    )
}

export default Todo


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
        };
    
        fetchData();

        const interval = setInterval(() => {
            fetchData()
        }, 2000)

        return () => clearInterval(interval)
      }, []);

    // useEffect(() => {
    //     axios.get('http://localhost:8000/my-list')
    //     .then(response => {
    //         setList(response.data)
    //         console.log(response.data)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // } ,[])

    return (
        <>
            <div className='list-bg'>

                <h1 className='list-title'>My To Do List</h1>
                <div className="tasks-container">
                    {list.length > 0 ? (
                            list.map(task => {
                                return (
                                <div key={task.taskID} className='task-item'>
                                    <h1 className='task-title'>{task.taskName}</h1>
                                    <hr/>
                                    <p className='task-duration'>Duração: {task.taskDuration}</p>
                                    <div className='icons-box'>
                                    <i className='done-icon'><DoneIcon fontSize='large'/></i>
                                    <i className='delete-icon'><DeleteIcon fontSize='large'/></i>
                                    </div>
                                </div>)
                            })
                    ) : (
                        <div>
                            <h1>Loading data...</h1>
                        </div>
                    )}                    
                </div>
            </div>
        </>
    )
}

export default Todo


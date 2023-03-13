import { useState } from 'react'
import axios from 'axios'
import './form.css'


export default function Form() {

    const [taskName, setTaskName] = useState('')
    const [taskDuration, setTaskDuration] = useState('')

    function handleTask(e) {
        e.preventDefault()

        const formData = {
            taskName: taskName,
            taskDuration: taskDuration,
            id: Math.random().toFixed(10) * 10000000000
        }

        axios.post('http://localhost:8000/my-list', formData, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data)
            setTaskName('')
            setTaskDuration('')
        })
        .catch((error) => {
            console.log(error)
        })
        
    //     fetch('http://localhost:8000/my-list', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     })

    //     setTaskName('')
    //     setTaskDuration('')
        
    // }
    }

    return (
        <>
            <div>


                <form action="submit"  className="box">
                <h1 className='form-title'>To Do List Manager</h1>
                <label
                    htmlFor="taskname">Title: </label>
                <input
                    name='taskname'
                    type="text"
                    placeholder='Go to gym'
                    className='taskName'
                    onChange={(e) => setTaskName(e.target.value)} />
                <label
                    htmlFor="taskDuration">Duration: </label>
                <input
                    name='taskDuration'
                    type="text"
                    placeholder='2 hours'
                    className='taskDuration'
                    onChange={(e) => setTaskDuration(e.target.value)}/>

                <input
                    name='submit'
                    type="button"
                    value="Send"
                    className='submit-btn'
                    onClick={handleTask}
                    />
                </form>
            </div>
        </>
    )
}
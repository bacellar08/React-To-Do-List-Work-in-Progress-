import './form.css'
import $ from 'jquery'


export default function Form() {

    function handleTask(e) {
        e.preventDefault()

        const formData = {
            taskName: $('.taskName').val(),
            taskDuration: $('.taskDuration').val(),
            taskID: Math.random() +1
        }

        fetch('http://localhost:8000/my-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        $('.taskName').val('')
        $('.taskDuration').val('')
        
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
                    className='taskName' />
                <label
                    htmlFor="taskDuration">Duration: </label>
                <input
                    name='taskDUration'
                    type="text"
                    placeholder='2 hours'
                    className='taskDuration' />

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
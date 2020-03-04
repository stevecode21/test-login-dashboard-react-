import React, { Component } from 'react'
import tasks from '../../sample/tasks.json'
import Tasks from '../tasks/Tasks.js'
import BtnAdd from '../btnAdd/BtnAdd'

let pcHour = new Date()
let actualHour = `${pcHour.getHours()}:${pcHour.getMinutes()}:${pcHour.getSeconds()}`

export default class TaskForm extends Component {

    state = {
        fullName: '',
        projectName: '',
        workedHours: 0,
        description: '',
        workTeam: '',
        date: '',
        hour: actualHour,
        finished: false,
        tasks: tasks,
        flatForm: false,
        flatTaks: true
    }


    style(response) {
        return {
            display: response ? 'block' : 'none'
        }
    }

    response = e => {
        this.setState({ flatForm: e, flatTaks: !e })
    }

    returned = ()=>{
        this.setState({
            flatForm: false, 
            flatTaks: true })
    }

    onSubmit = e => {
        this.addTask(
            this.state.fullName,
            this.state.projectName,
            this.state.workedHours,
            this.state.description,
            this.state.workTeam,
            this.state.date,
            this.state.hour
        )

        this.state.hour = ''

        this.setState({
            fullName: '',
            projectName: '',
            workedHours: 0,
            description: '',
            workTeam: '',
            date: '',
            hour: actualHour,
            finished: false
        })

        e.preventDefault()
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addTask = (fullName, proyectName, workedHours, description, workTeam, date, hour) => {
        const newTask = {
            fullName: fullName,
            projectName: proyectName,
            workedHours: workedHours,
            description: description,
            workTeam: workTeam,
            date: date,
            hour: hour,
            id: this.state.tasks.length
        }
        this.setState({
            tasks: [...this.state.tasks, newTask]
        })
    }

    deleteTask = (id) => {
        const taskDeleted = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks: taskDeleted })
    }

    checkDone = (id) => {
        const tasksDoned = this.state.tasks.map(task => {
            if (task.id === id) {
                task.done = !task.done
            }
            return task
        })
        this.setState({ tasks: tasksDoned })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} style={this.style(this.state.flatForm)}>
                    {/* En jsx las etiquetas debe ser cerradas, por lo que en caso de que una etiqueta HTML no tenga cierre, hay que asegurar que lo posea al poner al final "/>" como en el caso de los input, br, hr */}
                    <input
                        type="text"
                        name="fullName"
                        placeholder="write your fullname"
                        onChange={this.onChange}
                        value={this.state.fullName}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        name="projectName"
                        placeholder="White the project name"
                        onChange={this.onChange}
                        value={this.state.projectName}
                        required
                    />
                    <br />
                    <br />
                    <textarea
                        name="description"
                        placeholder="white a description"
                        onChange={this.onChange}
                        value={this.state.description}
                        required
                    ></textarea>
                    <br />
                    <br />
                    <input
                        type="number"
                        name="workedHours"
                        placeholder="How many hours have your worked?"
                        onChange={this.onChange}
                        value={this.state.workedHours}
                        required
                    />
                    <br />
                    <br />
                    <select name="workTeam"
                        onChange={this.onChange}
                        value={this.state.workTeam}
                        required
                    >
                        <option value="nothing" >Elige un equipo...</option>
                        <option value="Frontend" >Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                        <option value="Fullstack">Fullstack</option>
                    </select>
                    <br />
                    <br />
                    <input
                        type="date"
                        name="date"
                        placeholder="what is the date, today?"
                        onChange={this.onChange}
                        value={this.state.date}
                        required
                    />
                    <br />
                    <br />
                    <input type="submit" value="save a task" onClick={this.returned} />
                </form>
                <div style={this.style(this.state.flatTaks)}>
                    <Tasks tasks={this.state.tasks}
                        deleteTask={this.deleteTask}
                        checkDone={this.checkDone}

                    />
                </div>
                <div style={this.style(this.state.flatTaks)}>
                <BtnAdd response={this.response} />
                </div>
            </div>
        )
    }

}
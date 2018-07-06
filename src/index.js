import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class MaintainList extends React.Component{
    constructor(props){
        super(props);
        this.tasks = [
            {name: 'This is done', done: false},
            {name: 'This is not', done: true}
        ];
        this.state = {
            items: this.tasks
        }   
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
    }

    addItem(task_name){
        this.tasks.unshift({name: task_name, done: false});
        this.setState({items: this.tasks});
    }

    delItem(item_index){
        this.tasks.splice(item_index, 1);
        this.setState({items: this.tasks});
    }

    toggleDone(item_index){
        var todo = this.tasks[item_index];
        this.tasks.splice(item_index, 1);
        todo.done = !todo.done;
        todo.done?this.tasks.push(todo):this.tasks.unshift(todo);
        this.setState({items: this.tasks});   
    }

    render(){
        return (
            <div id="app" className="container">
                <h1>To Do </h1> <br />
                <AddTask  add={this.addItem} />
                <ShowTaskManager list={this.state.items} del={this.delItem} toggleDone={this.toggleDone}/>
            </div>
        );
    }
}

class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.add(this.refs.itemName.value);
        this.refs.itemName.value = '';
    }
    render(){
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <input type="text" className="form-control col-sm-11" ref="itemName" />
                <button type="submit" class="btn btn-primary col-sm-1"><i className="fas fa-plus"></i></button>
            </form>
        );
    }
}
AddTask.propTypes = {
    add: PropTypes.func
}

class ShowTaskManager extends React.Component{
    render(){
        let listSet = this.props.list.map(
            (item, index) => {
                let workStatusClassName = item.done ? 'done': 'undone';
                let workStatusIcon = item.done ? 'fas fa-check-circle' : 'fas fa-circle';
                return (
                    <li className="list-group-item" key={index}> 
                        <span className="col-md-1" onClick={() => {this.props.toggleDone(index)}}><i className={workStatusIcon}></i></span>
                        <span className={`col-md-10 ${workStatusClassName}`} >{item.name}</span>
                        <span className="col-md-1" onClick={() => {this.props.del(index);}}><i className="fas fa-times"></i></span>
                    </li>
                )
            }
        )
        return (
            <ul id="todo-list" className="list-group">{listSet}</ul>
        );
    }
}
ShowTaskManager.propTypes = {
    list: PropTypes.array, //List will contain the list of tasks. Each task contains index, name and status if the task is done or not
    del: PropTypes.func,
    toggleDone: PropTypes.func
}

const TodoApp = () => {
    return (
        <MaintainList />
    );
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
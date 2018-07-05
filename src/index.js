import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class MaintainList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [
                {name: 'This is done.', done: true},
                {name: 'This isn\'t done', done: false }
            ],

        }   
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
    }

    addItem(task_name){
        let new_items = this.state.items.slice();
        new_items.unshift({name: task_name, done: false});
        this.setState({items: new_items});
    }

    delItem(item_index){
        let new_items = this.state.items.slice();
        new_items.splice(item_index, 1);
        this.setState({items: new_items});
    }

    render(){
        return (
            <div id="app">
                <AddTask  add={this.addItem} />
                <ShowTaskManager list={this.state.items} del={this.delItem} />
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
            <form className="row" onSubmit={this.handleSubmit}>
                <input type="text" ref="itemName" className="col-11" />
                <button type="submit" value="submit" className="btn btn-info col-1">+</button>
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
                let workStatusClassName = this.done ? 'done': 'undone';
                let workStatusIcon = this.done ? 'fa-circle-checked' : 'fa-circle';
                return (
                    <li className="row" key={index}> 
                        <i className="fa col-md-1" className={workStatusIcon}></i>
                        <span className="col-md-10">{item.name}</span>
                        <i className="fa fa-trash-alt col-md-1" onClick={() => {this.props.del(index);}}></i>
                    </li>
                )
            }
        )
        return (
            <ul>{listSet}</ul>
        );
    }
}
ShowTaskManager.propTypes = {
    list: PropTypes.array, //List will contain the list of tasks. Each task contains index, name and status if the task is done or not
    del: PropTypes.func
}

const TodoApp = () => {
    return (
        <MaintainList />
    );
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
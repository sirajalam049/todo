import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class MaintainList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [
                {index: 1, name: 'This is done.', done: true},
                {index: 2, name: 'This isn\'t done', done: false }
            ]
        }   
    }

    render(){
        return (
            <ShowTaskManager list={this.state.items} />
        );
    }
}

class ShowTaskManager extends React.Component{
    render(){
        let listSet = this.props.list.map(
            (item, index) => {
                return (
                    <li className="list-group-item list-group-item-warning row" key={index}> 
                        <span className="glyphicon glyphicon-unchecked col-md-1"></span>
                        <span className="col-md-10">{item.name}</span>
                        <span className="glyphicon glyphicon-remove col-md-1"></span>
                    </li>
                )
            }
        )
        return (
            <ul className="container list-group" id="todo-list">{listSet}</ul>
        );
    }
}
ShowTaskManager.propTypes = {
    list: PropTypes.array //List will contain the list of tasks. Each task contains index, name and status if the task is done or not
}

const TodoApp = () => {
    return (
        <div id="app">
            <MaintainList />
        </div>
    );
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
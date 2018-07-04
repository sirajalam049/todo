import React from 'react';
import ReactDOM from 'react-dom';

// It has some properties:
// 1. Index: It track each item.
// 2. Name: It is the main content of the list.
// 3. Done: It is the attribute that tells if the work is done
var items = [];



class TaskList extends React.Component{
    constructor(props){
        super(props);
    }
}

// It'll input the list item
class TaskForm extends React.Component{
    render(){
        return (
            <form onSubmit={}>
                <input type="text" />
                <button value="submit" />
            </form>
        );
    }
}

// It'll render everything
const ToDoApp = () => {
    return (
        <div>
            <TaskForm />
            <TaskList />
        </div>
    );
}

ReactDOM.render(<ToDoApp />, document.getElementById('root'));
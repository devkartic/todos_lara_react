import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            todo_id : '',
            todo_name : '',
            todos : [],
        };

        this.onchangeHandler = this.onchangeHandler.bind(this);
        this.onsubmitHandler = this.onsubmitHandler.bind(this);
        this.onchangeUpdateHandler = this.onchangeUpdateHandler.bind(this);
        this.onsubmitUpdateHandler = this.onsubmitUpdateHandler.bind(this);
        this.todoFilteringHandler = this.todoFilteringHandler.bind(this);
    }

    onchangeHandler(event){
        this.setState({
            name : event.target.value
        });
    }



    todoFilteringHandler(filter=''){
        console.log(9999);
        // axios.post('http://localhost:8000/todos-filter', {
        //     filter : filter,
        //     headers: {
        //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //     }
        // }).then(response=>{
        //     this.setState({
        //         todos : response.data
        //     });
        // });
    }

    onsubmitHandler(event){
        event.preventDefault();
        axios.post('http://localhost:8000/todos', {
            name : this.state.name,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        }).then(response=>{
            this.setState({
                name : '',
                todo_id : '',
                todo_name : '',
                todos : response.data
            });
        });
    }


    onDoubleClickHandler(todoInfo){
        this.setState({
            todo_id: todoInfo.todo_id,
            todo_name: todoInfo.todo_name
        });
    }

    onchangeUpdateHandler(event){
        this.setState({
            todo_name : event.target.value
        });
    }

    onsubmitUpdateHandler(event){
        event.preventDefault();
        axios.patch(`http://localhost:8000/todos/${this.state.todo_id}`, {
            name : this.state.todo_name,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        }).then(response=>{
            this.setState({
                todo_id : '',
                todo_name : '',
                todos : response.data
            });
        });
    }

    onblurUpdateHandler(event){
        this.onsubmitUpdateHandler(event)
    }

    toggleChangeHandler(todo_id){
        axios.post(`http://localhost:8000/todos/update`, {
            todo_id : todo_id,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        }).then(response=>{
            this.setState({
                todos : response.data
            });
        });
    }

    componentDidMount(){
        axios.get('http://localhost:8000/todos')
            .then(response=>{
                this.setState({
                    name : '',
                    todo_id : '',
                    todo_name : '',
                    todos: response.data
                });
            });
    }

    onDelete(todo_id){
        axios.delete('http://localhost:8000/todos/'+todo_id)
            .then(response=>{
                this.setState({
                    todo_id : '',
                    todo_name : '',
                    todos: response.data
                });
            });
    }



    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header text-center font-weight-bold text-success text-uppercase">Todo's Application</div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td className="align-middle font-weight-bold text-primary" scope="row" width="3%">ADD</td>
                                            <td colSpan="2" scope="row">
                                                <form onSubmit={this.onsubmitHandler}>
                                                    <input type="text" className="form-control" onChange={this.onchangeHandler} name="name" value={this.state.name} aria-label="Text input with dropdown button" placeholder="Enter todo's here..." />
                                                </form>
                                            </td>
                                        </tr>
                                        {/* Todo's List Start */}
                                        {
                                            this.state.todos.map(todo=>{
                                                if(this.state.todo_id==todo.id) {
                                                    return ( /* This is For Todo Edit */
                                                        <tr key={todo.id.toString()}>
                                                            <td className="align-middle align-center font-weight-bold text-warning" scope="row" width="3%">EDIT</td>
                                                            <td className="pt-2" scope="row">
                                                                <form ref="editForm" onSubmit={this.onsubmitUpdateHandler}>
                                                                    <input type="text" ref={input => input && input.focus()} className="form-control align-middle mt-0" onBlur={this.onblurUpdateHandler.bind(this)} onChange={this.onchangeUpdateHandler} name="name" value={this.state.todo_name} aria-label="Text input with dropdown button" />
                                                                </form>
                                                            </td>
                                                            <td scope="row" className="align-middle"
                                                                className="text-right">
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger float-right"
                                                                    onClick={this.onDelete.bind(this, todo.id, todo.name)}>Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }

                                                return ( /* This is For Todo's List */
                                                    <tr key={todo.id.toString()}>
                                                        <td scope="row" width="3%">
                                                            <input type="checkbox" className="align-middle align-center" checked={todo.status==1?true:false}
                                                                   onChange={this.toggleChangeHandler.bind(this, todo.id)} aria-label="Checkbox for following text input"/>
                                                        </td>
                                                        <td scope="row" onDoubleClick={this.onDoubleClickHandler.bind(this, {todo_id : todo.id, todo_name : todo.name})}>
                                                            <span className="align-middle align-left">{todo.name}</span>
                                                        </td>
                                                        <td scope="row" className="align-middle"
                                                            className="text-right">
                                                            <button
                                                                className="btn btn-sm btn-outline-danger float-right"
                                                                onClick={this.onDelete.bind(this, todo.id)}>Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {/* Todo's List Start */}
                                    </tbody>
                                </table>

                            </div>

                            {/* Footer Start */}
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-4">{this.state.todos.length} item left</div>
                                    <div className="col-8">
                                        <button className="btn btn-light float-left" onClick={this.todoFilteringHandler}>All</button>
                                        <button className="btn btn-light ml-5" onClick={this.todoFilteringHandler}>Active</button>
                                        <button className="btn btn-light ml-5" onClick={this.todoFilteringHandler}>Completed</button>
                                        <button className="btn btn-light float-right">Clear Completed</button>
                                    </div>
                                </div>
                            </div>
                            {/* Footer End */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

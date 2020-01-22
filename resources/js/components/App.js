import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            todos : []
        };
        this.onDoubleClickHandler = this.onDoubleClickHandler.bind(this)
        this.onchangeHandler = this.onchangeHandler.bind(this);
        this.onsubmitHandler = this.onsubmitHandler.bind(this);
    }

    onchangeHandler(event){
        this.setState({
            name : event.target.value
        });
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
                todos : response.data
            });
        });
    }

    onDoubleClickHandler(event){
        event.preventDefault();
        console.log('hi');
    }

    componentDidMount(){
        axios.get('http://localhost:8000/todos')
            .then(response=>{
                this.setState({
                    todos: response.data
                });
            });
    }

    onDelete(todo_id){
        axios.delete('http://localhost:8000/todos/'+todo_id)
            .then(response=>{
                this.setState({
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
                            <div className="card-header text-center font-weight-bold text-primary text-uppercase">Todo's Application</div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td className="align-middle font-weight-bold" scope="row" width="3%">ADD</td>
                                            <td colSpan="2" scope="row">
                                                <form onSubmit={this.onsubmitHandler}>
                                                    <input type="text" className="form-control" onChange={this.onchangeHandler} name="name" value={this.state.name} aria-label="Text input with dropdown button" placeholder="Enter todo's here..." />
                                                </form>
                                            </td>
                                        </tr>
                                        {/* Todo's List Start */}
                                        {
                                            this.state.todos.map(todo=>{
                                                return(
                                                    <tr key={todo.id.toString()}>
                                                        <td scope="row" width="3%">
                                                            <input type="checkbox" className="align-middle align-center" aria-label="Checkbox for following text input" />
                                                        </td>
                                                        <td scope="row" onDoubleClick={this.onDoubleClickHandler}>
                                                            <span className="align-middle align-left">{todo.name}</span>
                                                        </td>
                                                        <td scope="row" className="align-middle" className="text-right">
                                                            <button className="btn btn-sm btn-outline-danger float-right" onClick={this.onDelete.bind(this, todo.id)}>Remove</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {/* Todo's List Start */}
                                        <tr>
                                            <td scope="row" width="3%">
                                                <input type="checkbox" className="align-middle align-center" aria-label="Checkbox for following text input" />
                                            </td>
                                            <td className="pt-1" scope="row">
                                                <input type="text" className="form-control align-middle mt-0" onChange={this.onchangeHandler} name="name" aria-label="Text input with dropdown button" placeholder="Enter todo's here..." />
                                            </td>
                                            <td scope="row" className="align-middle" className="text-right">
                                                <button className="btn btn-sm btn-outline-danger float-right">Remove</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                            {/* Footer Start */}
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-4">{this.state.todos.length} item left</div>
                                    <div className="col-8">
                                        <button className="btn btn-light float-left">All</button>
                                        <button className="btn btn-light ml-5">Active</button>
                                        <button className="btn btn-light ml-5">Completed</button>
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

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
                                <form onSubmit={this.onsubmitHandler}>
                                    <div className="list-group mb-2 border-0">
                                        <span href="#" className="list-group-item list-group-item-action">
                                            <input type="text" className="form-control" onChange={this.onchangeHandler} name="name" aria-label="Text input with dropdown button" placeholder="Enter todo's here..." />
                                        </span>
                                    </div>
                                </form>

                                {/* Todo's List Start */}
                                {
                                    this.state.todos.map(todo=>{
                                        return(
                                            <div className="list-group mb-2 border-0" key={todo.id.toString()}>
                                                <a href="#" className="list-group-item list-group-item-action" onDoubleClick={this.onDoubleClickHandler}>
                                                    <span className="align-middle" >
                                                        <input type="checkbox" aria-label="Checkbox for following text input" />
                                                    </span>
                                                    <span className="ml-3 align-middle">{todo.name}</span>
                                                    <button className="btn btn-sm btn-outline-danger float-right" onClick={this.onDelete.bind(this, todo.id)}>Remove</button>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                                {/* Todo's List Start */}

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

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from "./todos/List";

class Master extends Component{
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header text-center font-weight-bold text-primary text-uppercase">Todo's Application</div>
                            <div className="card-body">
                                <div className="list-group mb-2 border-0">
                                    <a href="#" className="list-group-item list-group-item-action">
                                        <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="Enter todo's here..." />
                                    </a>
                                </div>
                                <List />
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-4">3 item left</div>
                                    <div className="col-8">
                                        <button className="btn btn-light float-left">All</button>
                                        <button className="btn btn-light ml-5">Active</button>
                                        <button className="btn btn-light ml-5">Completed</button>
                                        <button className="btn btn-light float-right">Clear Completed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Master;

if (document.getElementById('master')) {
    ReactDOM.render(<Master />, document.getElementById('master'));
}

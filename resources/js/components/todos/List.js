import React, {Component} from 'react';

class List extends Component{
    render(){
        return(
            <div>
                <div className="list-group mb-2 border-0">
                    <a href="#" className="list-group-item list-group-item-action">
                                        <span className="align-middle" >
                                            <input type="checkbox" aria-label="Checkbox for following text input" />
                                        </span>
                        <span className="ml-3 align-middle">First Todo</span>
                        <button className="btn btn-sm btn-outline-danger float-right">Remove</button>
                    </a>
                </div>
            </div>
        );
    }
}

export default List;


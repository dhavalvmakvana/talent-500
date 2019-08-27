import React from 'react';
import ListComponent from './ListComponent';
import { v4 as uuid } from 'uuid';

class InputListComponent extends React.Component {

    state = {
        subInput: '',
        subList: []
    }

    handleInputChange = (e) => {
        e.preventDefault();

        if(e.target.value.trim === '') {
            return;
        }

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleToggle = (e, id) => {
        e.preventDefault();
        const { subList } = this.state;
        const newList = subList.map((d) => {
            if(d.id === id) {
                d.completed = !d.completed
            }
            return d;
        });

        this.setState({
            ...this.state,
            subList: newList
        });
    }

    handleAddButton = (e) => {
        e.preventDefault();
        const listObject = {
            text: this.state.subInput,
            type: "list",
            completed: false,
            id: uuid()
        };

        this.setState({
            subInput: '',
            subList: [...this.state.subList, listObject]
        });
    }

    render() {
        const { props } = this;

        const value = props.completed ? 'line-through' : '';

        return (
        <li>
            <span onClick={(e) => props.handleToggle(e, props.id)} style={{textDecoration: `${value}`}}>
                {props.text}
            </span>
            <input
                value={this.state.subInput}
                onChange={this.handleInputChange}
                name="subInput"
                placeholder="Add nested item"
                type="text"
            />
            <button onClick={this.handleAddButton}>Add nested list</button>
            <ul>
                {this.state.subList.length === 0 ? (
                    null
                ) : (
                    <div>
                        {this.state.subList.map((list) => {
                            return <ListComponent
                                completed={list.completed} 
                                    handleToggle={this.handleToggle} 
                                    id={list.id} 
                                    text={list.text}
                            />
                        })}
                    </div>
                )}
            </ul>
        </li>
        )
    }
}

export default InputListComponent;
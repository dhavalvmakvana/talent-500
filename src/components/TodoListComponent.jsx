import React from 'react';
import ListComponent from './ListComponent';
import InputListComponent from './InputListComponent';
import { v4 as uuid } from 'uuid';

class TodoListComponent extends React.Component {

    state = {
        listState: [],
        headingInput: "",
        listType: 'list',
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

    handleDropdown = (e) => {
        e.preventDefault();

        // console.log(e.target.value)

        this.setState({
            ...this.state,
            listType: e.target.value
        });
    }

    handleAddButton = (e) => {
        e.preventDefault();
        const listObject = {
            text: this.state.headingInput,
            type: this.state.listType,
            completed: false,
            id: uuid()
        };

        if (this.state.listType === 'input-list') {
            listObject.data = []
        }

        this.setState({
            headingInput: '',
            listType: 'list',
            listState: [...this.state.listState, listObject]
        });
    }

    handleToggle = (e, id) => {
        e.preventDefault();
        const { listState } = this.state;
        const newList = listState.map((d) => {
            if(d.id === id) {
                d.completed = !d.completed
            }
            return d;
        });

        this.setState({
            ...this.state,
            listState: newList
        });
    }

    render() {

        const { headingInput, listState } = this.state;

        // console.log("state", listState);

        return (
            <div>
                <div>
                    
                </div>
                <div>
                    <input
                        name="headingInput"
                        onChange={this.handleInputChange}
                        value={headingInput}
                        type="text"
                        placeholder="Add todo here"
                    />
                    <select onChange={this.handleDropdown}>
                        <option value="list" selected={this.state.listType === "list" ? true : false}>ListComponent</option>
                        <option value="input-list" selected={this.state.listType === "input-list" ? true : false}>InputListComponent</option>
                    </select>
                    <button onClick={this.handleAddButton}>Add</button>
                </div>

                <div>
                    {listState.length === 0 ? (
                        null
                    ) : (
                        <div>
                            {listState.map((list) => {
                                if (list.type === 'list') {
                                    return <ListComponent 
                                    completed={list.completed} 
                                    handleToggle={this.handleToggle} 
                                    id={list.id} 
                                    text={list.text} />
                                } else {
                                    return <InputListComponent 
                                    data={list.data} 
                                    text={list.text}
                                    id={list.id}
                                    completed={list.completed}
                                    handleToggle={this.handleToggle}
                                     />
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default TodoListComponent;
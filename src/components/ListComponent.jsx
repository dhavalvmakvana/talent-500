import React from 'react';

const ListComponent = (props) => {
    const value = props.completed ? 'line-through' : '';
    return (
        <li onClick={(e) => props.handleToggle(e, props.id)} style={{textDecoration: `${value}`}}>
            {props.text}
        </li>
    )
}

export default ListComponent;
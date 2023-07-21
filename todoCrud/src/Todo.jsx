import React from 'react'

const TodoList = (props) => {
    // console.log(props.value , " props")
    return (
        <div>
            <li>
                (id: {props.id}) (name: {props.value})
                <button onClick={()=>props.editItem(props.id)}>Edit</button>
                <button onClick={() => props.onSelect(props.id)}>Delete</button>
            </li>
        </div>
    )
}

export default TodoList

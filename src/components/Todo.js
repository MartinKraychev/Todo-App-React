export const Todo = (props) => {
    let className = 'todo'
    if (props.isCompleted) {
        className += ' is-completed'
    }

    return (
        <tr className={className}>
            <td>{props.text}</td>
            <td>{props.isCompleted ? "Completed" : "Not completed"}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => props.clickHandler(props)}>Change status</button>
                <button className="btn todo-delete" onClick={() => props.deleteHandler(props._id)}>Delete</button>
            </td>
        </tr>
    )
}
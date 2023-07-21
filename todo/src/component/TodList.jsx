

const TodList = (props) => {
    // console.log(props.onSelect , " props")
    const { items, id, onSelect } = props
    return (
        <div>
            <li >{items} <button onClick={() => onSelect(id)}>Delete</button> </li>
        </div>
    )
}

export default TodList

import { useEffect, useState } from "react"
import TodList from "./TodList"

const Todo = () => {
    const [data, setData] = useState("")
    const [data_, setData_] = useState([])


    const handleChange = (event) => {
        setData(event.target.value)
        // console.log(data, " event");
    }



    const handleClick = () => {
        if (data.length == 0) {
            return alert("Fill the data")
        }
        setData_((oldItem) => {
            return [...oldItem, data]
        })
        setData("")


    }

    const deleteItem = (index) => {
        setData_((oldItems) => {
            // console.log(oldItems, " old items")

            return oldItems.filter((arr, id) => {
                return id !== index
            })
        })
    }

    const deleteAll = () => {
        setData_([])
    }

    // useEffect(() => {
    //     const data1 = localStorage.getItem("data");
    //     const loadedData = JSON.parse(data1);

    //     if (loadedData) {
    //         setData_(loadedData);
    //     }
    // }, [])

    // useEffect(() => {
    //     let res = JSON.stringify(data_);
    //     localStorage.setItem("data", res);
    // }, [data_])

    return (
        <>
            <button onClick={deleteAll}>Reset All</button>
            <div>

                <input type='text' value={data} onChange={handleChange} />
                <button onClick={handleClick} >Add click</button>
                {/* <h1>{data_}</h1> */}
                <ol>
                    {
                        data_.map((val, index) => {
                            return (
                                <>
                                    <TodList
                                        items={val}
                                        key={index}
                                        id={index}
                                        onSelect={deleteItem}
                                    />

                                </>
                            )
                        })

                    }
                </ol>
            </div>
        </>

    )
}

export default Todo

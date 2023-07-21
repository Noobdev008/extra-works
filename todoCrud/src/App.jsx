import { useState } from 'react'
import './App.css'
import TodoList from './Todo'

function App() {
  const [data, setData] = useState("")
  const [itemList, setItemList] = useState([])
  const [isEditItem, setIsEditItem] = useState(null)
  const [toggleSubmit, setToggleSubmit] = useState(true)


  const inputChange = (event) => {
    setData(event.target.value)
  }

  const addItem = () => {
    if (!data) { return alert("fill the data"); }
    else if (data && !toggleSubmit) {
      setItemList(itemList.map((elem) => {
        if (elem.id === isEditItem) {
          return { ...elem, name: data }
        }
        return elem;
      }))
      setToggleSubmit(false)
      setData("")


    }
    else {
      const allInputData = { id: new Date().getTime().toString(), name: data }
      setItemList([...itemList, allInputData])
      setData("")
    }
  }

  const deleteItem = (index) => {
    setItemList((oldItem) => {
      return oldItem.filter((elem) => {
        return elem.id !== index
      })
    })
  }

  const editItem = (id) => {
    let newEditId = itemList.find((elem) => {
      return elem.id == id
    })
    // console.log(newEditId , " eidt");
    setToggleSubmit(false)
    setData(newEditId.name)
    setIsEditItem(id)

  }

  const deleteAll = () => {
    setItemList([])
  }

  return (
    <>
      <button onClick={deleteAll}>DeleteAll</button>
      <div>

        <input type='text' value={data} onChange={inputChange} />
        {toggleSubmit ? <button onClick={addItem}>Add</button> : <button onClick={addItem}>Edit</button>}
      </div>
      <div>
        <ol>
          {itemList.map((elem) => {
            return (<>
              <TodoList
                id={elem.id}
                key={elem.id}
                value={elem.name}
                onSelect={deleteItem}
                editItem={editItem}
                toggelButton={toggleSubmit}
              />
            </>)

          })}
        </ol>
      </div>
    </>
  )
}

export default App

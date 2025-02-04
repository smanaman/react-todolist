import { useState } from 'react'
import { useRef } from 'react'
import './App.css'
function App() {
  const [list, setlist] = useState("")
  const [record, setrecord] = useState([])
  const [edit, setedit] = useState("")

  const underRefs = useRef({}); 

  const handleLine = (id, color) => {
    
    if (underRefs.current[id]) {
      underRefs.current[id].style.backgroundColor = color;
    
      
    }
  };

  console.log(record);

  const handlesubmit = (event) => {
    event.preventDefault()


    let obj = {
      taskid: Math.floor(Math.random() * 100),
      task: list
    }

    if (edit) {
      let up = record.map((val) => {
        if (val.taskid == edit) {
          val.task = list
        }
        return val;
      })
      setrecord(up);
      alert("record edit")
      setedit("")
      setlist("")
    }
    else {
      if (obj.task == '') {
        alert('Enter task')
      }
      else {
        setrecord([...record, obj]);
        console.log(obj);
        setlist("");
      }
    }
  }
  const ddata = (id) => {
    let del = record.filter(val => val.taskid != id)
    setrecord(del)
  }
  const editrecord = (id) => {
    setedit(id)
    let single = record.filter(val => val.taskid == id);
    console.log(single);
    setlist(single[0]?.task);
  }






  return (
    <>
      <div className="main">
        <h2>To-Do List</h2>
        <form onSubmit={handlesubmit}>
          <input type="text" placeholder='Enter your task' value={list} onChange={(event) => setlist(event.target.value)} />
          <button className='btn' type='submit'>submit</button>


        </form>
        {
          record.map((val) => {
            return (
              <div className='span-task'>
                <div className="round"></div>
                <div
            className="span"
            ref={(el) => (underRefs.current[val.taskid] = el)}>
            <div onClick={() => handleLine(val.taskid, 'red')} className="text">
              <span>{val.task}</span>
            </div>
                  <div className="d-btn"> 
                    <button onClick={() => ddata(val?.taskid)} className='click-btn'><i class="fa-solid fa-trash"></i></button>
                  </div>
                  <div className="a-btn">
                    <button onClick={() => editrecord(val?.taskid)} className='click-btn'><i class="fa-solid fa-pen-to-square"></i></button>
                  </div>

                </div>


              </div>
            )
          })
        }
      </div>

    </>
  )
}

export default App

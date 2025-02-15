import { useState } from 'react'
import './App.css'
function App() {
  const [list, setlist] = useState("")
  const [record, setrecord] = useState(JSON.parse(localStorage.getItem('todo')) || [])
  const [edit, setedit] = useState("")





  console.log(record);

  const handlesubmit = (event) => {
    event.preventDefault()

    let dup = record.filter((val)=>{
      return val.task == list
})

  
if(dup.length == 1){
  alert("Task already exist")
  return false;
}

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
      localStorage.setItem('todo', JSON.stringify(up));
      alert("record edit")
      setedit("")
      setlist("")
    }
    else {
      if (obj.task == '' || obj.task[0]==' ') {
        alert('Enter task')
      }
      else {
        let newdata = [...record, obj]
        setrecord(newdata);
        localStorage.setItem('todo', JSON.stringify(newdata));
        console.log(obj);
        setlist("");
      }
    }
  }
  const ddata = (id) => {
    let del = record.filter(val => val.taskid != id)
    localStorage.setItem('todo', JSON.stringify(del));

    setrecord(del)
  }
  const editrecord = (id) => {
    setedit(id)
    let single = record.filter(val => val.taskid == id);
    console.log(single);
    setlist(single[0]?.task);
  }

  // const clearAll = () => {
  //   setRecord([]);
  //   localStorage.setItem('todo',JSON.stringify([]));
  //   alert("Delete All record");
  // }




  return (
    <>
      <div className="main">
        <h2 className='h2'>To-Do List</h2>
        <form onSubmit={handlesubmit}>
          <input type="text" placeholder='Enter your task' value={list} onChange={(event) => setlist(event.target.value)} />
          <button className='btn' type='submit'>submit</button>


        </form>
        <div className="main-span">
          {
            record.map((val) => {
              return (

                <div className='span-task'>
                  <div className="round"></div>
                  <div className="span">
                    <div className="text">
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
      </div>

    </>
  )
}

export default App

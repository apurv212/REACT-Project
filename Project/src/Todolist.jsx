import { useState } from "react";

const Todolist = () => {
const[activity,setActivity]=useState("");
const [listdata,setlistData]=useState([]);



function addActivity(){
setlistData([...listdata,activity])
console.log(listdata)
setActivity("");
}

function removeActivity(i){
 const updatelist= listdata.filter((d,id)=>{
          return i!=id
 })
 setlistData(updatelist);
}

  return (
    <div>
      <div className="container">
        <div className="header" >
          Note taker
        </div>
        <input type="text"placeholder="add activity" value={activity} onChange={(e)=>{setActivity(e.target.value)}}/>
      </div>

      <p className="List-heading"></p>

      <button onClick={addActivity}>Add +</button>
{listdata!=[] && listdata.map((data,i)=>{
return(
  <div key={i}>
    <div className="listData">{data}</div>
    <div className="btn-position">
      <button onClick={()=>{removeActivity(i)}}>remove(-)</button>

    </div>
    
    </div>
)

})}


    </div>
  )
}

export default Todolist;
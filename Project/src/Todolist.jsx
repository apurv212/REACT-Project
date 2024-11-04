import React, { useEffect, useState } from 'react'


function getdata(){
   let store= localStorage.getItem("nirmaan_data")
   if(store){
    return JSON.parse(store)
   }
   else{
    return [];
   }
}


function Todolist() {

    const [texts,settext]= useState("")
    const [list,setlist]= useState(getdata());
    const [toggle,settoggle]= useState(true);
    const [iseditItem, setIseditItem]= useState("");
    const [searchText,setSearchtext]=useState("");




function adds(){
    if(toggle){
        setlist([...list,texts])
    }
    else{
        const updateedit = list.map((item,index)=>{
            return(
                    index=== iseditItem? texts: item
            )
        })
        setlist(updateedit)
        settoggle(true)
    }

settext("");

}
function remove(index){
const updatelist = list.filter((e,unique)=>{
return index!==unique;
})
setlist(updatelist)
}


function handlekeypress(e){
if(e.key === "Enter"){
    adds();
}
}

function removeall(){
    setlist([]);
}


function editItem(index){
    settext(list[index])
    settoggle(false)
    setIseditItem(index)
    
}


useEffect(()=>{
    localStorage.setItem("nirmaan_data", JSON.stringify(list))
})


const filterlist = list.filter((item)=>{
    return(
item.toLowerCase().includes(searchText.toLowerCase()))
});



  return (
    <div> <h2>To do list</h2>
    <input type="text" placeholder='enter ur task' value={texts} onChange={(e)=>{settext(e.target.value)}} onKeyUp={handlekeypress}/>
   { toggle? (<button onClick={adds}>➕</button>):
   (<button onClick={adds}>update</button>)}
    
    <input type="text" placeholder='🔍' value={searchText} onChange={(e)=>{setSearchtext(e.target.value)}} />
<div className='container'>
    {filterlist.map((data,id)=>{
            return(
                <div key={id}>
                <div> <h3>{data}</h3></div>
                <button onClick={()=>editItem(id)}>✏️</button>
                <button onClick={()=>remove(id)}>❌</button>
               </div>
            )
    })}
</div>
<button onClick={removeall}>remove all</button>

    </div>
  )
}

export default Todolist
import React, { useEffect, useState } from 'react';

function getLocalData() {
    let getdata = localStorage.getItem("apurv_data");
    if (getdata) {
        return JSON.parse(localStorage.getItem("apurv_data"));
    } else {
        return [];
    }
}

function Todolist() {
    const [text, settext] = useState("");
    const [list, setlist] = useState(getLocalData());
    const [toggle, setToggle] = useState(true);
    const [iseditItem, setiseditItem] = useState("");
    const [searchText, setsearchText] = useState("");
    const [lockedItems, setLockedItems] = useState({}); 

    function adds() {
        if (toggle) {
            setlist([...list, text]);
        } else {
            const updatelist = list.map((d, id) => {
                return id === iseditItem ? text : d;
            });
            setlist(updatelist);
            setToggle(true);
        }
        settext("");
    }

    function remove(index) {
        const updateremove = list.filter((e, unique) => {
            return index !== unique;
        });
        setlist(updateremove);

    
        const updatedLockedItems = { ...lockedItems };
        delete updatedLockedItems[index];
        setLockedItems(updatedLockedItems);
    }

    function removeall() {
        setlist([]);
        setLockedItems({});
    }

    function editItem(index) {
        settext(list[index]);
        setToggle(false);
        setiseditItem(index);
    }

    function handlekeypress(e) {
        if (e.key === "Enter") {
            adds();
        }
    }

    function lockItem(index) {
        const password = prompt("Set a password to lock this item:");
        if (password) {
            setLockedItems({
                ...lockedItems,
                [index]: password
            });
        }
    }

    function unlockItem(index) {
        const password = prompt("Enter the password to unlock this item:");
        if (password === lockedItems[index]) {
            const updatedLockedItems = { ...lockedItems };
            delete updatedLockedItems[index];
            setLockedItems(updatedLockedItems);
        } else {
            alert("Incorrect password!");
        }
    }

    let filterlist = list.filter((item) => {
        return item.toLowerCase().includes(searchText.toLowerCase());
    });

    useEffect(() => {
        localStorage.setItem("apurv_data", JSON.stringify(list));
    }, [list]);

    return (
        <div className='container'>
            <h2>To do LIST</h2>
            <input
                type="text"
                placeholder='Enter your notes'
                value={text}
                onChange={(e) => { settext(e.target.value); }}
                onKeyUp={handlekeypress}
            />

            {toggle
                ? <button onClick={adds}>➕</button>
                : <button onClick={adds}>Update</button>
            }

            <input className='searchbox'
                type="text"
                placeholder='Search'
                value={searchText}
                onChange={(e) => { setsearchText(e.target.value); }}
            />

            {filterlist.map((data, id) => {
                const isLocked = lockedItems.hasOwnProperty(id);

                return (
                    <div key={id}>
                        {isLocked ? (
                            <div>
                                <h3>🔒 Locked Item</h3>
                                <button onClick={() => unlockItem(id)}>Unlock</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{data}</h3>
                                <button onClick={() => remove(id)}>❌</button>
                                <button onClick={() => editItem(id)}>✏️</button>
                                <button onClick={() => lockItem(id)}>🔒 Lock</button>
                            </div>
                        )}
                    </div>
                );
            })}

            <button onClick={removeall}>Remove All</button>
        </div>
    );
}

export default Todolist;

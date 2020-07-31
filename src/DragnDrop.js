import React, { useState, useRef } from "react";




function DragnDrop({data}){
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragEnd= () =>{
        console.log("handleDragEnd");
        dragNode.current.removeEventListener("dragend", handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        setDragging(false);
    }

    const handleDragStart = (e, params) =>{
        console.log("handleDragStart...", params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd);
        setTimeout(() =>{
            setDragging(true);
        },0)        
    }

    const handleDragEnter = (e, params) => {
        console.log("handleDragEnter", params);
        const currentItem = dragItem.current;
        if(e.target !== dragNode.current){
            setList((oldList)=>{
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemsI,0,newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]);
                dragItem.current = params;
                return newList;
            })
        }
    }

    const getStyles = (params) =>{
        const currentItem = dragItem.current;
        if(currentItem.grpI === params.grpI && currentItem.itemI === params.itemI){
            return "current dnd-item";
        }
        return "dnd-item";
    }
    return( <div className="drag-n-drop">
    {
      list.map((grp, grpI) =>(
        <div             
            key={`${grp.title}-${grpI}`} 
            className="dnd-group"
            onDragEnter = { dragging && !grp.items.length ? (e) => handleDragEnter(e, {grpI, itemI:0}) : null}
        >
            <div key={grp.title} 
                className="group-title"
            >
                {grp.title}
            </div>
            {
            grp.items.map((item, itemI) =>(
            <div draggable 
                    onDragStart = {(e)=> handleDragStart(e, {grpI, itemI})}
                    onDragEnter = {dragging ? (e) => handleDragEnter(e, {grpI, itemI}) : null}
                    key={`${grp.title} - ${item}`} 
                className = {(dragging) ? getStyles({grpI, itemI}) : "dnd-item"}>
                {item}                  
            </div>
            ))
            }
            
        </div>
            ))
        }
    </div>)
    }

export default DragnDrop;
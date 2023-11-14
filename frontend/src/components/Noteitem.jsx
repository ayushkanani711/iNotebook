import React, { useContext } from "react";
import NoteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note , updateNote} = props;

  return (
    <>
    
      <div className="card my-3 mx-2" style={{ width: "16rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title.toString()}</h5>
          <p className="card-text">{note.description.toString()}</p>
          <div>
            <i className="fa-solid fa-trash mx-2" onClick={()=> {deleteNote(note._id)}}  ></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Noteitem;
import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext.jsx";

const AddNote = () => {
  const [note, setNote] = useState({title:'',description:'' , tag:''})
  const context = useContext(noteContext);
  const { addNote } = context;
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description , note.tag );
    setNote({title:'',description:'' , tag:''})
  }
  const onChange = (e) => {
    setNote({...note , [e.target.name]:e.target.value})
  }
  return (
    <div className="container my-3">
    <h1>Add a note</h1>

    <form className="my-3">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" minLength={3} value={note.title} required id="title" name="title" onChange={onChange} placeholder="Enter Title" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text"className="form-control" minLength={5} value={note.description} required onChange={onChange} id="description" name="description"   placeholder="Description" />
      </div> 
      <div className="form-group">
        <label htmlFor="tag">Tag</label>
        <input type="text"className="form-control" onChange={onChange} value={note.tag} id="tag" name="tag"   placeholder="Tag" />
      </div> 
      <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
    </form>
  </div>
  )
}

export default AddNote
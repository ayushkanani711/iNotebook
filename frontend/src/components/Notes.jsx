import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext.jsx";
import Noteitem from "./Noteitem.jsx";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (authToken) {
          await getNotes();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [navigate]);

  const [showModal, setShowModal] = useState(false);
  const updateNote = (currentNote) => {
    setShowModal(true); 
    setNote({id: currentNote._id,  etitle : currentNote.title ,edescription:currentNote.description , etag:currentNote.tag} )
  }

  const [note, setNote] = useState({id:'', etitle:'',edescription:'' , etag:''})
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(false); 
    editNote(note.id , note.etitle , note.edescription, note.etag)
  }
  const onChange = (e) => {
    setNote({...note , [e.target.name]:e.target.value})
  }

  return (
    <>
      <AddNote />

      <button type="button" className="d-none btn btn-dark" onClick={()=>{setShowModal(true)}}></button>
      <div className={`modal ${showModal ? "show" : ""}`} tabIndex="-1" style={{ display: showModal ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" onClick={()=>{setShowModal(false)}} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onChange} placeholder="Enter Title" minLength={3} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input type="text"className="form-control" value={note.edescription} onChange={onChange} id="edescription" name="edescription"   placeholder="Description"  minLength={5} required/>
                </div> 
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input type="text"className="form-control" value={note.etag} onChange={onChange} id="etag" name="etag"   placeholder="Tag" />
                </div> 
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={()=>{setShowModal(false)}}>
                Close
              </button>
              <button disabled={note.etitle.length<1 || note.edescription.length<1} type="button" className="btn btn-dark" onClick={handleClick}  >
                Update Note
                </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="container ">Your Notes</h2>
      <div className="row my-3 container p-0">
          {notes.length === 0  &&    <h6 className="container mx-3" style={{paddingBottom:108 }} >Create your first cloudbase Note</h6>}
        {Array.isArray(notes) ? (
          notes.map((note) => <Noteitem updateNote={updateNote} key={note._id} note={note} />)
        ) : (
          <div className="container mx-3" style={{paddingBottom:108}} >Create your first cloudbase Note</div>
        )}
      </div>
    </>
  );
};

export default Notes;

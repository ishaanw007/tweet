import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useState } from "react";
function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", info: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.info, note.tag);
    setNote({ title: "", info: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="conatiner">
      <h1>Add a Tweet</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="title"
            minLength={5}
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Information
          </label>
          <input
            type="text"
            className="form-control"
            id="info"
            name="info"
            onChange={onChange}
            minLength={5}
            value={note.info}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.info.length < 5}
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote;

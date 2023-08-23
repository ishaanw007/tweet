import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
function Notes() {
  const context = useContext(noteContext);
  let history = useNavigate();
  const [note, setNote] = useState({ id: "", etitle: "", einfo: "", etag: "" });
  const { notes, getNotes, editNote } = context;
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (cnote) => {
    ref.current.click();
    setNote({
      id: cnote._id,
      etitle: cnote.title,
      einfo: cnote.info,
      etag: cnote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.einfo, note.etag);
    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote></AddNote>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    name="etitle"
                    value={note.etitle}
                    minLength={5}
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
                    id="einfo"
                    name="einfo"
                    value={note.einfo}
                    onChange={onChange}
                    minLength={5}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.einfo.length < 5}
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Your Notes</h2>
        <div className="row row-cols-3">
          {notes.map((note) => {
            return <Noteitem note={note} updateNote={updateNote}></Noteitem>;
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;

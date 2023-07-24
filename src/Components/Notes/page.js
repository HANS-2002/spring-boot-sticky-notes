import { useEffect, useState } from "react";
import "./style.css";
import axios from 'axios';
import { GLOBAL_API_PROXY } from "../../config.js";
import StickyNote from "../StickyNote/page.js";

export default function Notes({ setHasLogin, setUserName, username }) {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    axios.get(`${GLOBAL_API_PROXY}/getNotesWithUserId?userId=${username}`)
      .then((response) => {
        setNoteList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onNewNote() {
    axios.post(`${GLOBAL_API_PROXY}/newNote`, {
      userId: username,
      title: "",
      content: "",
      color: "#ffcccc",
    })
      .then((response) => {
        setNoteList([...noteList, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 text-white">
        <div className="text-2xl font-bold">Notes</div>
        <div className="flex align-middle">
          <div className="logs user">
          <i className="fa-solid fa-user "></i> 
          <div>
          {username}
          </div>
          </div>
          <div
            className="cursor-pointer font-bold p-4 text-red-400"
            onClick={() => {
              localStorage.removeItem("NotesUsername");
              setHasLogin(false);
              setUserName("");
            }}
          >
            Logout
          </div>
        </div>
      </div>
      {noteList.length > 0 && (
        <div className="flex lg:flex-row lg:justify-start lg:flex-wrap  p-4 justify-center items-center flex-col">
          {noteList.map((note) => {
            return (
              <StickyNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                username={username}
                color={note.color}
              />
            );
          })}
        </div>
      )}
      <button
        type="button"
        onClick={onNewNote}
        className="newNoteBtn flex justify-center  border border-gray-700 rounded-md px-4 py-2 m-2 transition duration-300 ease select-none text-white hover:bg-gray-800 hover:border-gray-500 focus:outline-none focus:shadow-outline"
      >
        + New Note
      </button>
    </>
  );
}

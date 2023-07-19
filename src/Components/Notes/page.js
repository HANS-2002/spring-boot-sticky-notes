import { useEffect, useState } from "react";
import { API_PROXY } from "../../config.js";
import StickyNote from "../StickyNote/page.js";

export default function Notes(props) {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    fetch(`${API_PROXY}/getNotesWithUserId?userId=${props.username}`)
      .then((response) => response.json())
      .then((data) => {
        setNoteList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 text-white">
        <div className="text-2xl font-bold">Notes</div>
        <div>
          (Logged in as {props.username}){" "}
          <span
            className="cursor-pointer font-bold p-4 text-red-400"
            onClick={(e) => {
              localStorage.removeItem("NotesUsername");
              props.setHasLogin(false);
              props.setUserName("");
            }}
          >
            Logout
          </span>
        </div>
      </div>
      {noteList.length > 0 ? (
        <div className="flex lg:flex-row lg:justify-start lg:flex-wrap p-4 justify-center items-center flex-col">
          {noteList.map((note) => {
            return (
              <StickyNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                username={props.username}
                color={note.color}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}

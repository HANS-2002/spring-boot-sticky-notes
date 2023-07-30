import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { GLOBAL_API_PROXY } from "../../config.js";
import StickyNote from "../StickyNote/page.js";
import Dark from "../DarkMode/Dark";
import { CirclesWithBar } from "react-loader-spinner";

export default function Notes({
  setHasLogin,
  setUserName,
  username,
  toggleDarkMode,
  dark,
  setDark,
}) {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    axios
      .get(`${GLOBAL_API_PROXY}/getNotesWithUserId?userId=${username}`)
      .then((response) => {
        setNoteList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  function onNewNote() {
    axios
      .post(`${GLOBAL_API_PROXY}/newNote`, {
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
    <div className={dark ? "dark" : ""}>
      <div className=" dark:bg-gray-900 flex flex-row justify-between shadow-md items-center p-4 text-black dark:text-white">
        <div className="text-2xl font-bold">Notes</div>
        <div className="flex align-middle">
          <div className="logs user">
            <Dark
              toggleDarkMode={toggleDarkMode}
              dark={dark}
              setDark={setDark}
            />
            <i className="fa-solid fa-user "></i>
            <div>{username}</div>
          </div>
          <div
            className="cursor-pointer font-bold p-4 dark:text-red-400"
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
      {noteList.length ? (
        <div className=" dark:bg-gray-900 flex lg:flex-row lg:justify-start lg:flex-wrap  p-4 justify-center items-center flex-col">
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
      ) : (
        <div className=" dark:bg-gray-900 flex p-4 justify-center items-center flex-col min-h-[80vh]">
          <CirclesWithBar
            height="80"
            width="80"
            radius="9"
            color="none"
            innerCircleColor="red"
            outerCircleColor="green"
            ariaLabel="Your notes are loading...."
            wrapperStyle
            wrapperClass
          />
          <p className="mt-8" style={{ color: "white" }}>
            Your notes are loading....
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={onNewNote}
        className="newNoteBtn flex justify-center   shadow-md bg-slate-50 hover:bg-slate-200 dark:bg-slate-700  rounded-md px-4 py-2 m-2 transition duration-100 ease select-none text-black dark:text-white dark:hover:bg-gray-600 dark:hover:transition ease-linear   "
      >
        + New Note
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { GLOBAL_API_PROXY } from "../../config.js";
import Navbar from "../Navbar/page.js";
import StickyNote from "../StickyNote/page.js";
import { ProgressBar } from "react-loader-spinner";

export default function Notes({
  setHasLogin,
  setUserName,
  username,
  toggleDarkMode,
  dark,
  // setDark,
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
      <Navbar
        dark={dark}
        toggleDarkMode={toggleDarkMode}
        username={username}
        setHasLogin={setHasLogin}
        setUserName={setUserName}
        onNewNote={onNewNote}
      />
      {noteList.length === 0 ? (
        <div className=" dark:bg-gray-900 flex p-4 justify-center items-center flex-col min-h-[80vh] mt-20 lg:mt-12">
          <p className="mt-8 dark:text-slate-200 text-slate-800 font-bold text-3xl">
            No notes created !!
          </p>
        </div>
      ) : noteList.length > 0 ? (
        <div className=" dark:bg-gray-900 flex lg:flex-row lg:justify-start lg:flex-wrap p-4 mt-28 lg:mt-24 justify-center items-center flex-col">
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
        <div className=" dark:bg-gray-900 flex p-4 justify-center items-center flex-col min-h-[80vh] mt-20 lg:mt-12">
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor={dark ? "white" : "#2b2c28"}
            barColor={dark ? "#7d8cc4" : "#7DE2D1"}
          />
          <p className="mt-8 dark:text-slate-200 text-slate-800 font-bold">
            Your notes are loading....
          </p>
        </div>
      )}
    </div>
  );
}

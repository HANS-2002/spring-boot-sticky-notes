import "./style.css";
import Bulb from "../../Assets/images/bulb.png";
import Moon from "../../Assets/images/moon.png";
import User from "../../Assets/images/user.png";
import Plus from "../../Assets/images/plus.png";

export default function Navbar({
  dark,
  toggleDarkMode,
  username,
  setHasLogin,
  setUserName,
  onNewNote,
}) {
  return (
    <>
      <div className="dark:bg-gray-900 w-screen bg-slate-100 fixed z-50 top-0 flex flex-col lg:flex-row justify-between dark:shadow-slate-800 dark:shadow-lg dark:drop-shadow-lg dark:drop shadow-md items-center p-2 text-black dark:text-white">
        <div className="text-2xl font-bold lg:w-3/4 w-screen lg:text-left text-center">
          Sticky Notes
        </div>
        <div className="flex w-screen flex-row justify-evenly  lg:mt-1 lg:w-1/4">
          <div className=" p-1 mr-1 flex flex-col items-center">
            <img
              src={Plus}
              title={`Add a new note`}
              className="cursor-pointer"
              alt="new note"
              width="45rem"
              height="45rem"
              onClick={onNewNote}
            />
            <p className="text-center">New Note</p>
          </div>
          <div className="p-1 flex flex-col items-center">
            <img
              src={dark ? Moon : Bulb}
              title={`${dark ? "Turn on lights" : "Turn off lights"}`}
              className="cursor-pointer"
              alt="mode"
              height="45rem"
              width="45rem"
              onClick={toggleDarkMode}
            />
            <p className="text-center">Dark / Light</p>
          </div>
          <div className="p-1 flex flex-col items-center">
            <img
              src={User}
              title={`Logged in as ${username}`}
              alt="user"
              height="45rem"
              width="45rem"
            />
            <p className="text-center">{username}</p>
          </div>
          <i
            class="fa fa-sign-out font text-2xl p-2 text-red-600 cursor-pointer"
            title="Logout"
            onClick={() => {
              localStorage.removeItem("NotesUsername");
              setHasLogin(false);
              setUserName("");
            }}
          ></i>
        </div>
      </div>
    </>
  );
}

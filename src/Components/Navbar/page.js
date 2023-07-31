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
      <div className="dark:bg-gray-900 w-screen fixed z-50 top-0 flex flex-col lg:flex-row justify-between dark:shadow-slate-800 dark:shadow-lg dark:drop-shadow-lg dark:drop shadow-md items-center p-2 text-black dark:text-white">
        <div className="text-2xl font-bold lg:w-3/4 w-screen lg:text-left text-center">Sticky Notes</div>
        <div className="flex w-screen flex-row justify-evenly mt-1 lg:mt-0 lg:w-1/4">
          <img
            src={Plus}
            title={`Add a new note`}
            className="cursor-pointer"
            alt="new note"
            height="45rem"
            width="45rem"
            onClick={onNewNote}
          />
          <img
            src={dark ? Moon : Bulb}
            title={`${dark ? "Turn on lights" : "Turn off lights"}`}
            className="cursor-pointer"
            alt="mode"
            height="45rem"
            width="45rem"
            onClick={toggleDarkMode}
          />
          <img
            src={User}
            title={`Logged in as ${username}`}
            className="cursor-pointer"
            alt="user"
            height="45rem"
            width="45rem"
          />
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

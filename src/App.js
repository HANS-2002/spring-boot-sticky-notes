import { useState } from "react";
import Login from "./Components/Login/page.js";
import Notes from "./Components/Notes/page.js";
function App() {
  const [hasLogin, setHasLogin] = useState(
    localStorage.getItem("NotesUsername") ? true : false
  );
  const [username, setUsername] = useState(
    localStorage.getItem("NotesUsername") || ""
  );
  const [dark, setDark] = useState(true);
  const toggleDarkMode = () => {
    setDark(!dark);
  };

  return (
    <>
      <div className={dark ? "dark " : ""}>
        <div className="dark:bg-gray-900 bg-slate-100 pb-2 min-h-screen">
          {hasLogin ? (
            <Notes
              toggleDarkMode={toggleDarkMode}
              dark={dark}
              setDark={setDark}
              setHasLogin={setHasLogin}
              setUserName={setUsername}
              username={username}
            />
          ) : (
            <Login
              toggleDarkMode={toggleDarkMode}
              setHasLogin={setHasLogin}
              setUserName={setUsername}
              dark={dark}
              setDark={setDark}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import Login from "./Components/Login/page.js";
import Notes from "./Components/Notes/page.js";

function App() {
  const [hasLogin, setHasLogin] = useState(localStorage.getItem("NotesUsername") ? true : false);
  const [username, setUsername] = useState(localStorage.getItem("NotesUsername") || "");

  return (
    <>
      {hasLogin ? (
        <Notes setHasLogin={setHasLogin} setUserName={setUsername} username={username} />
      ) : (
        <Login setHasLogin={setHasLogin} setUserName={setUsername} />
      )}
    </>
  );
}

export default App;

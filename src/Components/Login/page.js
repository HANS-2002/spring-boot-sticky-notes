import { useState } from "react";
import Moon from "../../Assets/images/moon.png";
import Bulb from "../../Assets/images/bulb.png";

export default function Login({
  setHasLogin,
  setUserName,
  toggleDarkMode,
  dark,
  setDark,
}) {
  const [username, setUsername] = useState("");

  return (
    <>
      <div className={dark ? "dark" : ""}>
        <section className="bg-gray-100 dark:bg-gray-900 w-full min-h-screen flex flex-col items-center justify-center">
          <div className=" absolute right-3 top-0 mt-3 flex flex-col items-center dark:text-white ">
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
          <div className="flex flex-col items-center justify-center px-6 py-8 w-full md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div>
                  <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                </div>
                <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username"
                      autoComplete="off"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem("NotesUsername", username);
                      setUserName(username);
                      setHasLogin(true);
                    }}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

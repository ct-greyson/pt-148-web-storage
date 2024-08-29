import { useState } from "react";

function App() {
  //{ username: "", isLoggedIn: false }
  // whatever we return from the function will become our default useState value
  const [user, setUser] = useState(() => {
      // check inside our sessionStorage
      // .getItem - look inside our session storage for the key we pass in, in this case "user"
      let currentUser = sessionStorage.getItem("user")

      // check if currentUser is null or not
      if (currentUser) {
        // if we get data back

        // JSON.parse - Converts a JavaScript Object Notation (JSON) string into an object.
        return JSON.parse(currentUser)

      } else {
        // if currentUser is null
        return { username: "", isLoggedIn: false }
      }
    }
  );
  const [userInput, setUserInput] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const handleLogin = (event) => {
    event.preventDefault()
    const newUser = {
      username: userInput,
      isLoggedIn: true
    }

    //after we create user, we're going to store them in session storage
    // .setItem stores our data inside web storage
    // we save items in the form of key value pairs where the key is a unique identifier (so they don't overwrite each other) and the value is the data you want to save
    // values need to be stored as strings so if you have an object/array you have to use JSON.stringify to convert it into a string
    // sessionStorage will remain when we refresh but will be lost when we close the tab/browser
    sessionStorage.setItem("user", JSON.stringify(newUser))

    setUser(newUser)
  }

  const handleThemeToggle = () => {
    if(theme === "light"){
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    } else {
      localStorage.setItem("theme", "light")
      setTheme("light")
    }
  }

  return (
    <>
      {/* Ternary Operator
        CONDITION ? IF CONDITION IS TRUE, DO THIS! : IF THE CONDITION IS FALSE, DO THIS INSTEAD
    
        if user.isLoggedIn is true, display the user.username.  if not, display Please Log In
    */}
      {user.isLoggedIn ? (
        <h1>User: {user.username}</h1>
      ) : (
        <h1>Please log in</h1>
      )}
      <form onSubmit={handleLogin}>
        <input
          autoComplete="off"
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <h2>Theme: {theme}</h2>
      <button onClick={handleThemeToggle}>Toggle Theme</button>
    </>
  );
}

export default App;

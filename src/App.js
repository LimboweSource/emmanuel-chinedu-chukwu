import "./App.css";
import { useState, useMemo } from "react";

const arr = {
  user: {
    id: 1,
    name: {
      firstName: "James",
      lastName: "Ibori",
    },
    location: {
      city: "Ikoyi",
      state: "Lagos",
      address: "One expensive house like that",
    },
  },
};

function App() {
  //todo:
  //debounce search

  const [query, setQuery] = useState("");

  const findPath = (arr, query) => {
    if (query.length < 3) return "";

    if (arr === query) return arr;

    if (!(arr.constructor === Object) && !(arr.constructor === Array)) {
      throw new Error("Can only find path on objects/arrays");
    }

    const path = [];
    let found = false;

    const search = (obj) => {
      for (let key in obj) {
        path.push(key);
        if (obj[key].constructor === String) {
          const regex = new RegExp(`(^|.* +)${query.toLowerCase()}.*$`, "ig");
          if (obj[key].match(regex)) {
            found = true;
            break;
          }
        } else {
          if (obj[key].constructor === Object) {
            search(obj[key]);
            if (found) {
              break;
            }
          }
        }
        path.pop();
      }
    };

    search(arr);
    return path.join(".");
  };

  const path = useMemo(() => findPath(arr, query), [query]);

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Search for a string path in object/array</h1>
        {/* <code>{arr}</code> */}
        <blockquote>
          <pre>
            <code>{arr.toString()}</code>
          </pre>
        </blockquote>
        <input
          className="Input"
          placeholder="Enter query string e.g. James"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {path && <div>Path: {path}</div>}
    </div>
  );
}

export default App;

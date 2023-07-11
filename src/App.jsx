import { useState } from "react";
import { FiMove } from "react-icons/fi";
import { MdGridOn } from "react-icons/md";
import Selector from "./components/Selector";

import "./App.css";

function App() {
  return (
    <>
      <main>
        <header className="header">
          <FiMove size={"32px"} color={"#1679c7"} className="logo" />
          <Selector />
          <div className="sdly_switch">
            <label className="switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" />
              <div className="slider round"></div>
            </label>
          </div>
          <MdGridOn size={"32px"} color={"#aaa"} className="grid_icon" />
        </header>
      </main>
    </>
  );
}

export default App;

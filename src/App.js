import React from 'react';
import logo from './logo.svg';
import './App.css';
import DragnDrop from "./DragnDrop";

const data = [
  {title: "group1", items:["1","2","3"]},
  {title: "group2", items:["4","5"]}
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragnDrop data = {data} />
      </header>
    </div>
  );
}

export default App;

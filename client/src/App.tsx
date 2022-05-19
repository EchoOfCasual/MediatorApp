import React, {FunctionComponent, useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { InputList } from './components/InputList/InputList';
import {Route, Routes, useNavigate} from "react-router-dom";
import { SuppRecInputPage } from './components/SuppRecInputPage/SuppRecInputPage';
import {TransportTableInputPage, tableTile} from './components/TransportTableInputPage/TransportTableInputPage';



function App() {

  const [columnTableList, setColumnTableList] = useState<tableTile[]> ([]);
  const [rpwTableList, setRowTableList] = useState<tableTile[]> ([]);

  
  

  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
       </header>*/}

      <Routes>
       <Route path="/" element={<SuppRecInputPage/>}/>
       <Route path="/transport_table_page" element={<TransportTableInputPage rowList={[]} columnList={[]}/>}/>
       {/*Slot na routa pośredniego <Route path="" element={}/>*/ }
       {/*<Route path="" element={}/>*/}
       <Route path="*" element={<div> No such endpoint </div>} />
      </Routes>

    </div>
  );
}

export default App;

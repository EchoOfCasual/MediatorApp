import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import { SuppRecInputPage } from './components/SuppRecInputPage/SuppRecInputPage';
import {TransportTableInputPage, tableTile} from './components/TransportTableInputPage/TransportTableInputPage';
import { ResultsPage } from './components/ResultPage/ResultsPage';



function App() {

  const sup: string = "Suppliers";
  const rec: string = "Recipients";

  return (
    <div className="App">


      <Routes>
       <Route path="/" element={<SuppRecInputPage supId = {sup} recId= {rec}/>}/>
       <Route path="/transport_table_page" element={<TransportTableInputPage rowListId={sup} columnListId={rec}/>}/>
       {/*Slot na routa pośredniego <Route path="" element={}/> TransportTableInputPage - speedrun no loose coupling*/ }
       <Route path="/results" element={<ResultsPage rowListId={sup} columnListId={rec}/>}/>
       <Route path="*" element={<div> No such endpoint </div>} />
      </Routes>

    </div>
  );
}

export default App;

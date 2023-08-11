import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InventoryUpdate } from "./pages/InventoryUpdate";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<InventoryUpdate />} />
          {/* <Route path="/edit" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

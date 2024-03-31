import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Employees, Home, NewEmployee } from "./pages";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

import "bootstrap/dist/css/bootstrap.min.css";


// Prime react
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

import 'primeicons/primeicons.css';
        

//core
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/newEmployee" element={<NewEmployee />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

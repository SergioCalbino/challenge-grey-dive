
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GetData from "./GetData.jsx";
import LandingPage from "./LandingPage.jsx";

// import "./App.scss";



const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index='/' element={<LandingPage /> }/>
          <Route path='/get-data' element={<GetData /> }/>
        </Routes>

      </BrowserRouter>
    </>
  )

  
  
}

export default App;

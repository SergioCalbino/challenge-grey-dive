
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetData from "./GetData.jsx";
import LandingPage from "./LandingPage.jsx";




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

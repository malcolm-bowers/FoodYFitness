 import './App.css'
 import Navbar from "./navbar/navbar.tsx";
 import LandingPage from "./landing-page.tsx";
 import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
        <Router>
            <div className="App">
                <div className="App-header">
                    <Navbar/>
                </div>
                <div className="App-content">
                    {
                        <Routes>
                            <Route path="/" element={<LandingPage/>} />
                        </Routes>
                    }
                </div>
            </div>
        </Router>
    </>
  )
}

 export default App

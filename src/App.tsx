import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Guide from "./pages/Guide.tsx";
import Calendar from "./pages/Calendar.tsx";
import Plants from "./pages/Plants.tsx";
import Profile from "./pages/Profile.tsx";

function App() {

  return (
    <div className="wrapper">
      <Header />

        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/plants" element={<Plants />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>

      <Footer />
    </div>
  )
}

export default App

import './App.css'
import {Route, Routes} from 'react-router-dom'

import {Header, Footer} from './components'
import {Home, Guide, Calendar, Plants, Profile} from './pages'

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

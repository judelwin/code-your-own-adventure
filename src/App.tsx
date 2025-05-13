import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Game from './pages/Game'
import About from './pages/About'
import Ending from './pages/Ending'
import { StatProvider } from './context/StatContext';

function App() {
  return (
    <StatProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/ending" element={<Ending />} />
        </Routes>
      </Router>
    </StatProvider>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Game from './pages/Game'
import About from './pages/About'
import { StatProvider } from './context/StatContext';

function App() {
  return (
    <StatProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </StatProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import About from './pages/About'
import Achievements from './pages/Achievements'
import Family from './pages/Family'
import Visitors from './pages/Visitors'
import Death from './pages/Death'
import LeaveMessage from './pages/LeaveMessage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/family" element={<Family />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/death" element={<Death />} />
          <Route path="/message" element={<LeaveMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
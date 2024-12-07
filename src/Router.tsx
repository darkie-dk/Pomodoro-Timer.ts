import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/History" element={<History />} />
    </Routes>
  )
}

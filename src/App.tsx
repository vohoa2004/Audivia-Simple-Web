import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmPage from './pages/ConfirmPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/confirm-email" element={<ConfirmPage />} />
      </Routes>
    </Router>
  );
}

export default App;

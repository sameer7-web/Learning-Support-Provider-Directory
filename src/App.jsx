import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProviderList from './pages/ProviderList';
import ProviderDetail from './pages/ProviderDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProviderList />} />
        <Route path="/providers/:id" element={<ProviderDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataDashboard from './components/DataDashboard';
import EntryDetails from './components/EntryDetails';
/**
 * main App component representing the app structure
 * @component
 * @returns {React.ReactElement} - JSX Element representing the App component
 */
function App() {
  return (
    <BrowserRouter>
      <div>
   
        <Routes>
          <Route path="/" element={<DataDashboard />} />
          <Route path="/details/:id" element={<EntryDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

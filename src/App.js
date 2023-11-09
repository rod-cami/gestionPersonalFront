
import { useState } from 'react';
import './App.css';
import VistaEmployees from './pages/Employees/VistaEmployees';
import Login from './pages/Login/Login';

function App() {
  const [token, setToken] = useState(null);
  const [authState, setAuthState] = useState(null)

  return (
    <div className="d-flex justify-content-center">
      <div className='w-50 my-5'><Login setAuthState={setAuthState} setToken={setToken}/></div>
    </div>
  );
}

export default App;

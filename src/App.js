
import { useEffect, useState } from 'react';
import './App.css';
import VistaEmployees from './pages/Employees/VistaEmployees';
import Login from './pages/Login/Login';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLogin = localStorage.getItem('user')
    if (userLogin) {
      setUser(userLogin);
    } else {
      setUser(null);
    }
  }, []);

  

  return (
    
    <>
      {user ? <VistaEmployees token={token}/> : <div className="d-flex justify-content-center"> <div className='w-50 my-5'><Login setToken={setToken} setUser={setUser}/></div></div>}
    </>
    
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import VistaEmployees from './pages/Employees/VistaEmployees';
import Login from './pages/Login/Login';

function App() {
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
      {user ? <VistaEmployees/> : <div className="d-flex justify-content-center"> <div className='w-50 my-5'><Login/></div></div>}
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Protected Route for HomePage */}
        <Route path='/homepage' element={<HomePage />} />
        {/* Default redirect to homepage after successful login */}
        <Route path='/' element={<Navigate to='/homepage' />} />
      </Routes>
    </>
  );
}

// Protected Routes component to check if the user is logged in
export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children; // Allow access to HomePage if logged in
  } else {
    return <Navigate to='/login' />; // Redirect to login if no user is logged in
  }
}

export default App;

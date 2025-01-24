import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';

// Main App Component
function App() {
  return (
    <>
      <Routes>
        {/* Login Route */}
        <Route path='/login' element={<Login />} />
        {/* Register Route */}
        <Route path='/register' element={<Register />} />
        {/* Protected Route for HomePage */}
        <Route path='/homepage' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        {/* Default Route to Redirect to Login if not logged in */}
        <Route path='/' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

// ProtectedRoutes Component
export function ProtectedRoutes({ children }) {
  // Check if user is logged in via localStorage
  if (localStorage.getItem('user')) {
    return children; // Allow access to HomePage if logged in
  } else {
    return <Navigate to='/login' />; // Redirect to login if not logged in
  }
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />}/>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem('loggedInUser')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;


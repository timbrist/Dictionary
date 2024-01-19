import Navbar from './components/Navigation';
import BasicSearch from './components/BasicSearch';
import ImageSearch from './components/ImageSearch';
import Account  from './components/Account';
import WordList from './components/WordList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

const App = () => {
  return (
        <UserAuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/home" element={
                  <ProtectedRoute><Home /></ProtectedRoute>
                }/>
              <Route path="/search" element={
                <ProtectedRoute><BasicSearch /></ProtectedRoute> 
              } />
              <Route path="/image" element={ 
                <ProtectedRoute><ImageSearch /></ProtectedRoute>
              } />
              <Route path="/wordlist" element={
                <ProtectedRoute><WordList /></ProtectedRoute>
              }/>
              <Route path="/account" element={
              <ProtectedRoute><Account /></ProtectedRoute>
              } />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </UserAuthContextProvider>

  );
};

export default App;

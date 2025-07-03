 import React, { useEffect, useState } from 'react';
 import { Routes, Route } from 'react-router-dom';
 import Header from './components/Header';
 import AdDetailsPage from './components/AdDetailsPage';
 import PrivateRoute from './components/PrivateRoute';
 import HomePage from './pages/HomePage';
 import AddAdPage from './pages/AddAdPage';
 import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditAdPage from './pages/EditAdPage';
import SearchResultsPage from './pages/SearchResultPage';

 function App() {

  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/user', {
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        setUser(null);
      } finally {
        setIsUserLoading(false); // kończymy ładowanie niezależnie od wyniku
      }
    };

    fetchUser();
  }, []);

   return (
     <>
     {/* pasek nawigacyjny */}
     <Header user={user} setUser={setUser} />
       <Routes>
         <Route path="/" element={<HomePage user={user} />} />
         <Route path="/search/:query" element={<SearchResultsPage />} />
         <Route path="/ads/:id" element={<AdDetailsPage user={user} />} />
         <Route
            path="/ads/add"
            element={
              <PrivateRoute user={user} isUserLoading={isUserLoading}>
                <AddAdPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ads/edit/:id"
            element={
              <PrivateRoute user={user} isUserLoading={isUserLoading}>
                <EditAdPage />
              </PrivateRoute>
            }
          />
          <Route path="/auth/login" element={<LoginPage setUser={setUser} />} />
         <Route path="/auth/register" element={<RegisterPage />} />
       </Routes>
     </>
   );
 }

 export default App;
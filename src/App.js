import React , {useState}  from 'react';
import './App.css';
import Footer from './components/Footer';

import { AppProvider } from './context/AppContext';
import {  BrowserRouter,  Route,   Routes, } from "react-router-dom";
import { Home } from './pages/Home';
import Loading from './components/Loading';
import InformationPage from './pages/InformationPage';
import PointsPage from './pages/PointsPage';




const App = () => {

  const [loadingWeb , setLoadingWeb ] = useState(true);

  const [userAssignedId , setUserAssignedId] = useState(0);

  setTimeout(() => {
    setLoadingWeb(false);
  } , 1500)

  return (

    <AppProvider>

    {loadingWeb ? (
      <Loading />
    ) : (

      <div className="iwaiter_container  " >
   <BrowserRouter>

  
          <Routes>
            
              <Route
                path="/"
                element={
                  <Home />
                }
              />
          
            

            
              <Route
                path="/info"
                element={
                  <InformationPage />
                }
              />
            
              <Route
                path="/points"
                element={
                  <PointsPage />
                }
              />
            

            
            
           
          </Routes>
       
                <Footer />
        </BrowserRouter>

</div>

    )}
  

  


    </AppProvider>
  )
}

export default App
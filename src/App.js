import React from 'react';


//Routing 

import {BrowserRouter,Routes,Route} from 'react-router-dom';


/**Layout */
import Header from './components/layout/Headers';
import Navigation from './components/layout/Navigation';
import Welcome from './components/welcome/Welcome';
import Edifices from './components/edifices/Edifices';
import NewEdifice from './components/edifices/NewEdifice';
import EditEdifice from './components/edifices/EditEdifice';
import Dependences from './components/dependences/Dependences';
import NewDependence from './components/dependences/NewDependence';
import EditDependence from './components/dependences/EditDependence';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navigation/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Welcome/>} />
              <Route path="/edifices" element={<Edifices/>} />
              <Route path="/edifices/nuevo" element={<NewEdifice/>} />
              <Route path="/edifices/editar/:id" element={<EditEdifice />} />
              <Route path="/dependences/edifice/:id" element={<Dependences/>} />
              <Route path="/dependences/nuevo/:id" element={<NewDependence/>} />
              <Route path="/dependences/editar/:id" element={<EditDependence />} />
            </Routes>
          </main>    
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;

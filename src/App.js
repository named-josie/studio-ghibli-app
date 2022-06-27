import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import NavBar from './Components/common/NavBar';
import Movies from './Components/pages/Movies';
import Locations from './Components/pages/Locations';
import People from './Components/pages/People';

export default function App() {
  return (
    <div className='App'>
      <NavBar />
      <div className='wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/people' element={<People />} />
          {/* <Route path='/about' element={<About/>} /> */}
        </Routes>
      </div>
    </div>
  );
}


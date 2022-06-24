import Home from './Components/pages/Home';
import './App.css';
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='wrapper'>
      <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
          </div>

    </div>
  );
}


export default App;

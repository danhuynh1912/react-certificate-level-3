import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LocalStorageProvider } from './context/LocalStorageContext';

import Sample1 from './pages/sample1';
import Sample2 from './pages/sample2';
import Sample3 from './pages/sample3';
import Home from './pages/home';

import './App.css';

function App() {
  return (
    <LocalStorageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/exercise1" element={<Sample1 />} />
          <Route path="/exercise2" element={<Sample2 />} />
          <Route path="/exercise3" element={<Sample3 />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LocalStorageProvider>
  );
}

export default App;

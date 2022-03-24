import React from 'react';
import './App.css';
import Records from './components/ExportRecords/Records';
import MainPage from './HomePage/MainPage';

function App() {
  return (
    <div className="App">
      <h1>Facial Recognition</h1>
      <MainPage />
      <Records />
    </div>
  );
}

export default App;

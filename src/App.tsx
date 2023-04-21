import React from 'react';
import logo from './logo.svg';
import './App.css';
import TableScreen from './Components/TableScreen/TableScreen.component';
import LineItemTable from './Components/LineItemTable/LineItemTable.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <LineItemTable></LineItemTable>
      </header>
    </div>
  );
}

export default App;

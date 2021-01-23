import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConvertCurrency from "./components/ConvertCurrency"

function App() {
  return (
    <div className="App">
      <ConvertCurrency />
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));


import './App.css';
import Content from './content/Content';
import Header from './header/Header.jsx';
import { useState } from 'react';
import UserContext from './contexts/UserContext';

function App() {
  const [currUserId, setCurrUserId] = useState()

  return (
    <UserContext.Provider value={{currUserId, setCurrUserId}}>
      <div className="app">
        <Header />
        <div className='main'>
          <div className='sidebar'></div>
          <Content />
        </div>
      </div>
      <button onClick={() => console.log(currUserId)}>push</button>
    </UserContext.Provider>
  );
}

export default App;

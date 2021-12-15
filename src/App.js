import './App.css';
import Content from './content/Content';
import Header from './header/Header.jsx'

function App() {
  return (
    <div className="app">
      <Header/>
      <div className='main'>
        <div className='sidebar'></div>
        <Content/>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import Content from './content/Content';

function App() {
  return (
    <div className="app">
      <header className='header'></header>
      <div className='main'>
        <div className='sidebar'></div>
        <Content/>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import Details from './components/Details';
import Gates from './components/Gates';
import { GateProvider } from './context/GateContext';

function App() {
  return (
    <GateProvider>
      <div className='MainContainer'>
        <Gates/>
        <Details/>
      </div>
    </GateProvider>
  );
}

export default App;

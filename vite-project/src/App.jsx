import Settings from './components/Settings';
import Product from './components/Product';
import { ColorProvider } from './components/ColorContext';
import './App.css';

function App() {
  return (
    <ColorProvider> 
    <div className="mainContainer">
      <Settings />
      <Product />
    </div>
  </ColorProvider>

  )
}

export default App

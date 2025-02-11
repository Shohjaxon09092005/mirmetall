
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { LanguageProvider } from './Languages/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LanguageProvider>

  );
}

export default App;

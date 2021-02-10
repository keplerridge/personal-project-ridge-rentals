import Header from './Components/Header/Header';
import MobileHeader from './Components/MobileHeader/MobileHeader';
import Footer from './Components/Footer/Footer';
import routes from './routes';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <MobileHeader />
      {routes}
      <Footer />
    </div>
  );
}

export default App;

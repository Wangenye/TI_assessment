import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import UserListAll from './components/UserListAll'
import UserDetails from './components/UserDetails'
function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        
        <Routes>
          <Route exact path="/" element={<UserListAll/>} />
          <Route exact path='user/:id' element={<UserDetails/>}/>
        </Routes>
        <Footer/>

      </Router>


    </div>
  );
}

export default App;

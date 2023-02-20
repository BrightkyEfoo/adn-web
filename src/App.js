import './App.css';
import EventsPage from './pages/Event/EventsPage';
import SingleEventPage from './pages/Event/SingleEventPage';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<SingleEventPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <Home/>
    // </div>
  );
}

export default App;

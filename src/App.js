import './App.css';
import About from './pages/About/About';
import EventsPage from './pages/Event/EventsPage';
import SingleEventPage from './pages/Event/SingleEventPage';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import EventEdit from './Components/EventEdit/EventEdit';
import { useSelector } from 'react-redux';
import UserEdit from './Components/UserEdit/UserEdit';
import Directors from './pages/About/Directors';
import Vmv from './pages/About/Vmv';
function App() {
  const eventEditState = useSelector(state => state.EventEdit);
  const userEditState = useSelector(state => state.UserEdit);
  return (
    <Router>
      <div className="App">
        {userEditState.isEditFormDisplayed && <UserEdit />}
        {eventEditState.isEditFormDisplayed && <EventEdit />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<SingleEventPage />} />
          <Route path="/about-us" element={<About />} />
          {/* <Route path="/directors" element={<Directors />} /> */}
          {/* <Route path="/vmv" element={<Vmv />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

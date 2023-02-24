import React from 'react';
import { useSelector } from 'react-redux';
import EventView from './EventView';
import ActivityView from './ActivityView';
import SettingsView from './SettingsView';
import UserDetailsView from './UserDetailsView';

const MainDashBoard = () => {
  const NavBarState = useSelector(state => state.NavBar);
  switch (NavBarState.selected) {
    case 1:
      return <EventView />;
    case 2:
      return <ActivityView />;
    case 4:
      return <SettingsView />;
    case 6:
      return <UserDetailsView />;
    default:
      return <div>Chose something</div>;
  }
};

export default MainDashBoard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import './style.css';
import { AiFillFileAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { UserEditActions } from '../../rtk/features/UserEditSlice';

const SettingsView = () => {
  const User = JSON.parse(localStorage.getItem('User'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  const userEdit = useSelector(state => state.UserEdit);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('http://localhost:9001/user?userId=' + User.id, {
        headers: {
          Authorization: Token,
        },
      })
      .then(res => {
        console.log('res.data', res.data);
        setUsers(res.data.users);
      })
      .catch(err => console.log('err', err));
  }, [userEdit.toReload]);
  const handleCreateUser = e => {
    dispatch(UserEditActions.setIsEditFormDisplayed(true));
  };
  return (
    <div className="users-view-container">
      <div className="users-cards-container">
        {users ? (
          users.map((el, i) => {
            return <UserCard key={i} user={el} />;
          })
        ) : (
          <div>nothing</div>
        )}
      </div>
      <div>
        {' '}
        <button
          className="dashboard-events-view-add-button"
          type="button"
          onClick={handleCreateUser}
        >
          <AiFillFileAdd size={25} /> Add User
        </button>
      </div>
    </div>
  );
};

export default SettingsView;

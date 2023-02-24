import React from 'react';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import './style.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UserEditActions } from '../../rtk/features/UserEditSlice';

const UserCard = ({ user }) => {
  const User = JSON.parse(localStorage.getItem('User'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  const dispatch = useDispatch();
  const handleEdit = e => {
    dispatch(UserEditActions.setIsEditFormDisplayed(true));
    dispatch(UserEditActions.setMode('edit'))
    dispatch(UserEditActions.setUserToEdit(user))
  };
  const handleDelete = e => {
    axios
      .delete('https://adn-backend-mj63t.ondigitalocean.app/user/' + user.id, {
        headers: {
          Authorization: Token,
        },
        data: {
          userId: User.id,
        },
      })
      .then(res => {
        console.log('res.data', res.data);
        dispatch(UserEditActions.setToReload());
      })
      .catch(err => console.log('err', err));
  };
  //   console.log('user', user);
  return (
    <div className="users-card-container">
      <img
        className="users-card-profile-pic"
        src={
          user.profilePic ||
          'https://adn-backend-mj63t.ondigitalocean.app/public/images/profilePhoto.jpg'
        }
        alt=""
      />
      <p>{user.firstName + ' ' + user.lastName}</p>
      <p>{user.email}</p>
      <div className="dashboard-setting-users-buttons">
        <button type="button" onClick={handleEdit}>
          <BsPencilSquare size={20} />
        </button>
        <button type="button" onClick={handleDelete}>
          <BsFillTrashFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;

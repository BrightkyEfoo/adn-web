import React, { useRef, useState } from 'react';
import './style.css';
import { BiImageAdd } from 'react-icons/bi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UserEditActions } from '../../rtk/features/UserEditSlice';
const UserEdit = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('User'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  const userToEdit = useSelector(state => state.UserEdit.userToEdit);
  const mode = useSelector(state => state.UserEdit.mode);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    image: mode === 'edit' ? userToEdit.profilePic : '',
    accessLevel: mode === 'edit' ? userToEdit.accessLevel : 1,
    loginTryCounter: mode === 'edit' ? userToEdit.loginTryCounter : 5,
    firstName: mode === 'edit' ? userToEdit.firstName : '',
    lastName: mode === 'edit' ? userToEdit.lastName : '',
    email: mode === 'edit' ? userToEdit.email : '',
    passwordPlaceholder: mode === 'edit' ? 'Leave unchanged' : '',
    password: '',
  });
  const [image, setImage] = useState({
    preview: null,
    data: null,
  });
  const handleClickImage = e => {
    fileInputRef.current.click();
  };
  const handleChange = e => {
    setForm(prev => {
      let temp = { ...prev };
      temp[e.target.name] = e.target.value;
      return temp;
    });
  };
  const handleFileChange = e => {
    console.log(e.target.files);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleSubmit = e => {
    console.log('form', form);
    let formData = new FormData();
    console.log('formData', formData);
    formData.append('addImage', image.data);
    if (mode === 'edit') {
      if (image.data) {
        axios
          .post(
            'https://adn-backend-mj63t.ondigitalocean.app/addImageToServer',
            formData,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then(res => {
            let data = {
              userSubmission: { ...form, profilePic: res.data.url },
              userId: user.id,
            };
            Object.keys(data.userSubmission).forEach(el => {
              if (!data.userSubmission[el] || el === 'passwordPlaceholder') {
                delete data.userSubmission[el];
              }
            });
            console.log('data', data);
            axios
              .put(
                'https://adn-backend-mj63t.ondigitalocean.app/user/' +
                  userToEdit.id,
                data,
                {
                  headers: {
                    Authorization: Token,
                  },
                }
              )
              .then(res => {
                console.log('res.data', res.data);
                dispatch(UserEditActions.setIsEditFormDisplayed(false));
                dispatch(UserEditActions.setToReload());
              })
              .catch(err => console.log('err', err));
          });
      } else {
        let data = { userSubmission: { ...form }, userId: user.id };
        Object.keys(data.userSubmission).forEach(el => {
          if (!data.userSubmission[el] || el === 'passwordPlaceholder') {
            delete data.userSubmission[el];
          }
        });
        console.log('data', data);
        axios
          .put(
            'https://adn-backend-mj63t.ondigitalocean.app/user/' +
              userToEdit.id,
            data,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then(res => {
            console.log('res.data', res.data);
            dispatch(UserEditActions.setIsEditFormDisplayed(false));
            dispatch(UserEditActions.setToReload());
          })
          .catch(err => console.log('err', err));
      }
    } else {
      axios
        .post(
          'https://adn-backend-mj63t.ondigitalocean.app/addImageToServer',
          formData,
          {
            headers: {
              Authorization: Token,
            },
          }
        )
        .then(res => {
          axios
            .post(
              'https://adn-backend-mj63t.ondigitalocean.app/user',
              { ...form, profilePic: res.data.url, userId: user.id },
              {
                headers: {
                  Authorization: Token,
                },
              }
            )
            .then(res => {
              console.log('res.data', res.data);
              dispatch(UserEditActions.setIsEditFormDisplayed(false));
              dispatch(UserEditActions.setToReload());
            })
            .catch(err => console.log('err', err));
        })
        .catch(err => console.log('err', err));
    }
  };
  const handleCancel = e => {
    if (e.target === e.currentTarget) {
      dispatch(UserEditActions.setIsEditFormDisplayed(false));
      dispatch(UserEditActions.setToReload());
    }
  };
  return (
    <div className="user-edit-container" onClick={handleCancel}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <div className="user-edit-form-container">
        <div>
          <div className="user-edit-form-1-left" onClick={handleClickImage}>
            {image.preview || form.image ? (
              <img
                src={image.preview || form.image}
                alt=""
                className="user-edit-form-1-left-image"
              />
            ) : (
              <>
                <BiImageAdd size={25} /> <p>Add an image</p>
              </>
            )}
          </div>
          <div>
            <div>
              <p>Access Level </p>{' '}
              <input
                name="accessLevel"
                value={form.accessLevel}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div>
              <p>Login Try Counter </p>{' '}
              <input
                name="loginTryCounter"
                value={form.loginTryCounter}
                onChange={handleChange}
                type="number"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>first name</p>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>last name</p>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <p>email</p>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>password</p>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder={mode === 'edit' ? 'Leave unchanged' : ''}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            {mode === 'edit' ? 'Edit this user' : 'Create mew user'}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;

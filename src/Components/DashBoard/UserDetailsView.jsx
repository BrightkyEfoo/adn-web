import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { BiImageAdd } from 'react-icons/bi';
import axios from 'axios';

const UserDetailsView = () => {
  const user = JSON.parse(localStorage.getItem('User'));
  const Token = 'Bearer ' + localStorage.getItem('token');

  const [form, setForm] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    // email: user.email,
    password: '',
    profilePic: user.profilePic || '',
  });
  const [canSubmit, setCanSubmit] = useState(true);
  const [verif, setVerif] = useState({
    currentPassword: '',
    confirmPassword: '',
  });
  const [image, setImage] = useState({
    preview: null,
    data: null,
  });
  const handleClickImage = e => {};
  const inputFileRef = useRef(null);
  const handleChange = e => {
    setForm(prev => {
      let temp = { ...prev };
      temp[e.target.name] = e.target.value;
      return temp;
    });
  };

  const handleChange1 = e => {
    setVerif(prev => {
      let temp = { ...prev };
      temp[e.target.name] = e.target.value;
      return temp;
    });
  };
  const handleSubmit = e => {
    if (canSubmit) {
      if (image.data) {
        let formData = new FormData();
        console.log('formData', formData);
        formData.append('addImage', image.data);
        axios
          .post('https://adn-backend-mj63t.ondigitalocean.app/addImageToServer', formData, {
            headers: {
              Authorization: Token,
            },
          })
          .then(res => {
            let data = {
              userId: user.id,
              userSubmission: {
                ...form,
                profilePic: res.data.url,
              },
              newPassword: form.password,
              verifyPassword: verif.currentPassword,
            };
            axios
              .put('https://adn-backend-mj63t.ondigitalocean.app/user/' + user.id, data, {
                headers: {
                  Authorization: Token,
                },
              })
              .then(res => {
                console.log('successfullyChanged', res.data);
              })
              .catch(err => {
                console.log('err', err);
              });
          });
      } else {
        let data = {
          userId: user.id,
          userSubmission: {
            ...form,
          },
          newPassword: form.password,
          verifyPassword: verif.currentPassword,
        };
        axios
          .put('https://adn-backend-mj63t.ondigitalocean.app/user/' + user.id, data, {
            headers: {
              Authorization: Token,
            },
          })
          .then(res => {
            console.log('successfullyChanged', res.data);
          })
          .catch(err => {
            console.log('err', err);
          });
      }
    }
  };
  // let a = verif.confirmPassword === form.pass

  useEffect(() => {
    setCanSubmit(form.password === verif.confirmPassword);
  }, [form.password, verif.confirmPassword]);
  useEffect(() => {
    axios
      .get('https://adn-backend-mj63t.ondigitalocean.app/user/' + user.id + '?userId=' + user.id, {
        headers: {
          Authorization: Token,
        },
      })
      .then(res => {
        console.log(res.data.user);
        setForm({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          password: '',
          profilePic: res.data.user.profilePic,
        });
        let temp = {
          ...user,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          password: '',
          profilePic: res.data.user.profilePic,
        };
        delete temp.password;
        console.log('temp', temp);
        localStorage.setItem('User', JSON.stringify({ ...temp }));
      });
  }, []);
  return (
    <div className="user-details-view-container">
      <div onClick={handleClickImage}>
        {image.preview || form.profilePic ? (
          <img
            src={image.preview || form.profilePic}
            alt=""
            className="user-edit-form-1-left-image"
          />
        ) : (
          <>
            <BiImageAdd size={25} /> <p>Add an image</p>
          </>
        )}
      </div>
      <p>Edit Acount Details</p>
      <div>
        <p>First Name</p>
        <input
          type="text"
          value={form.firstName}
          name="firstName"
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Last Name</p>
        <input
          type="text"
          value={form.lastName}
          name="lastName"
          onChange={handleChange}
        />
      </div>
      <p>Password Change</p>
      <div>
        <p>Current Password (leave blank to leave unchanged)</p>
        <input
          type="password"
          autoComplete="new-password"
          value={verif.currentPassword}
          name="currentPassword"
          onChange={handleChange1}
        />
      </div>
      <div>
        <p>New Password (leave blank to leave unchanged)</p>
        <input
          type="password"
          autoComplete="new-password"
          value={form.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div>
        <p>
          Confirm New Password{' '}
          {!canSubmit && (
            <span className="error-message">no match please try again !</span>
          )}
        </p>
        <input
          type="password"
          autoComplete="new-password"
          value={verif.confirmPassword}
          name="confirmPassword"
          onChange={handleChange1}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={handleSubmit}
          className={canSubmit ? 'enabled' : 'disabled'}
        >
          Save changes
        </button>
      </div>
      <input type="file" ref={inputFileRef} />
    </div>
  );
};

export default UserDetailsView;

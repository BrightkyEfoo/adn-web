import React, { useRef, useState } from 'react';
import './style.css';
import { BiImageAdd } from 'react-icons/bi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { EventEditActions } from '../../rtk/features/EventEditSlice';

const EventEdit = () => {
  const Token = 'Bearer ' + localStorage.getItem('token');
  const User = JSON.parse(localStorage.getItem('User'));
  const fileInputRef = useRef();
  const event = useSelector(state => state.EventEdit.eventToEdit);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState({
    preview: null,
    data: null,
  });
  const mode = useSelector(state => state.EventEdit.mode);
  // const begin = new Date()
  const eventToEdit = useSelector(state => state.EventEdit.eventToEdit);
  const [form, setForm] = useState({
    userId: User.id,
    language: mode === 'edit' ? eventToEdit.language : 'EN',
    name: mode === 'edit' ? eventToEdit.name : '',
    begin:
      mode === 'edit'
        ? new Date(eventToEdit.begin).toISOString().slice(0, -8)
        : '',
    end:
      mode === 'edit'
        ? new Date(eventToEdit.end).toISOString().slice(0, -8)
        : '',
    organizer: mode === 'edit' ? eventToEdit.organizer : '',
    category: mode === 'edit' ? eventToEdit.category : 'Category 1',
    description: mode === 'edit' ? eventToEdit.main : '',
    email: mode === 'edit' ? eventToEdit.email : '',
    website: mode === 'edit' ? eventToEdit.link : '',
    location: mode === 'edit' ? eventToEdit.location : '',
    phone: mode === 'edit' ? eventToEdit.phone : '',
    image: mode === 'edit' ? eventToEdit.image : '',
  });
  const handleFileChange = e => {
    setIsImageLoading(true);
    console.log(e.target.files);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);

    setIsImageLoading(false);
  };

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

  const handleSubmit = e => {
    // console.log('form', form);
    let formData = new FormData();
    console.log('formData', formData);
    formData.append('addImage', image.data);
    // console.log({ formData });
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
            axios
              .put(
                'https://adn-backend-mj63t.ondigitalocean.app/event/' +
                  event.id,
                {
                  userId: User.id,
                  event: {
                    name: form.name,
                    language: form.language,
                    begin: form.begin,
                    end: form.end,
                    organizer: form.organizer,
                    category: form.category,
                    phone: form.phone,
                    main: form.description,
                    email: form.email,
                    location: form.location,
                    link: form.website,
                    image: res.data.url || form.image,
                  },
                },
                {
                  headers: {
                    Authorization: Token,
                  },
                }
              )
              .then(res => {
                console.log('first', res.data);

                dispatch(EventEditActions.setToReload());
                dispatch(EventEditActions.setEventToEdit(null));
              })
              .catch(err => {
                console.log('err', err);
              });
          })
          .catch(err => {
            console.log('err', err.response.data);
          });
      } else {
        axios
          .put(
            'https://adn-backend-mj63t.ondigitalocean.app/event/' + event.id,
            {
              userId: User.id,
              event: {
                name: form.name,
                language: form.language,
                begin: form.begin,
                end: form.end,
                organizer: form.organizer,
                category: form.category,
                phone: form.phone,
                main: form.description,
                email: form.email,
                location: form.location,
                link: form.website,
                image: form.image,
              },
            },
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then(res => {
            dispatch(EventEditActions.setIsEditFormDisplayed(false));
            console.log('first', res.data);
            dispatch(EventEditActions.setToReload());
          })
          .catch(err => {
            console.log('err', err);
          });
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
              'https://adn-backend-mj63t.ondigitalocean.app/event/settings/',
              {
                ...form,
                image: res.data.url,
              },
              {
                headers: {
                  Authorization: Token,
                },
              }
            )
            .then(response => {
              console.log('response.data', response.data);
              dispatch(EventEditActions.setToReload());
              dispatch(EventEditActions.setIsEditFormDisplayed(false));
            })
            .catch(err => {
              console.log('err', err.response.data);
            });
        })
        .catch(err => {
          console.log('err', err.response.data);
        });
    }
  };
  const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
    'Formation au leadership',
  ];
  const handleCancel = e => {
    if (e.target === e.currentTarget) {
      dispatch(EventEditActions.setToReload());
      dispatch(EventEditActions.setIsEditFormDisplayed(false));
    }
  };
  return (
    <div className="event-edit-container" onClick={handleCancel}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <div className="event-edit-sub-container">
        <div className="event-edit-form-1">
          <div className="event-edit-form-1-left" onClick={handleClickImage}>
            {image.preview || form.image ? (
              <img
                src={image.preview || form.image}
                alt=""
                className="event-edit-form-1-left-image"
              />
            ) : (
              <>
                <BiImageAdd size={25} /> <p>Add an image</p>
              </>
            )}
          </div>
          <div className="event-edit-form-1-right">
            <div>
              <p>Language</p>
              <select onChange={handleChange} name="language">
                <option>EN</option>
                <option>FR</option>
              </select>
            </div>
            <div>
              <input
                value={form.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Name of the Event"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>choose the begin date</p>
            <input
              name="begin"
              onChange={handleChange}
              value={form.begin}
              type="datetime-local"
            />
          </div>
          <div>
            <p>choose the end date</p>
            <input
              name="end"
              onChange={handleChange}
              value={form.end}
              type="datetime-local"
            />
          </div>
        </div>

        <div>
          <div>
            <p>Enter the name of the organizer</p>
            <input
              type="text"
              value={form.organizer}
              name="organizer"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Choose the category</p>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((el, i) => {
                return <option key={i}>{el}</option>;
              })}
            </select>
          </div>
        </div>
        <div>
          <p>Description</p>
          <textarea
            name="description"
            onChange={handleChange}
            value={form.description}
            placeholder="Enter the description of this event here"
          ></textarea>
        </div>
        <div>
          <div>
            <p>Enter the email related to this event</p>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>
          <div>
            <p>Enter the website related to this event</p>
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              type="url"
            />
          </div>
        </div>
        <div>
          <div>
            <p>Enter the location of this event</p>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div>
            <p>Enter the phone related to this event</p>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="phone"
            />
          </div>
        </div>
        <div className="event-edit-submit-container">
          <button
            className="event-edit-submit"
            type="button"
            onClick={handleSubmit}
          >
            {mode === 'edit' ? 'edit this event' : 'Create an event'}
          </button>
          <button className='event-edit-cancel' onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;

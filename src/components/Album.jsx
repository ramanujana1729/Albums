import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AlbumList from './AlbumList';
import AddAlbumForm from './AddAlbumForm';

const AlbumData = () => {
  const [data, setData] = useState([]);
  const [updateMenuList, setUpdateMenuList] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addAlbum = () => {
    setShowForm(true);
  };

  const handleInputChange = (event, id) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: event.target.value, // Update the input value for the corresponding album item
    }));
  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/albums', {
        title: inputValue,
        userId: 1, // Replace with an appropriate user ID
      });

      const newAlbum = {
        id:  Date.now(), // Generate a unique ID using the current timestamp
        title: response.data.title,
        userId: response.data.userId,
      };

      setData((prevData) => [...prevData, newAlbum]);
      setInputValue('');
      setShowForm(false);
      setUpdateMenuList((prevList) => ({
        ...prevList,
        [newAlbum.id]: false,
      }));
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const updateAlbum = async (id, inputValue) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        title: inputValue,
        userId: 1, // Replace with an appropriate user ID
      });

      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, title: inputValue } : item))
      );

      setUpdateMenuList((prevList) => ({
        ...prevList,
        [id]: false,
      }));
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const cancelUpdate = (id) => {
    setUpdateMenuList((prevList) => ({
      ...prevList,
      [id]: false,
    }));
  };

  const update = (id) => {
    setUpdateMenuList((prevList) => ({
      ...prevList,
      [id]: true,
    }));
  };

  return (
    <>
      <Navbar />
      {showForm ? (
          <AddAlbumForm
            inputValue={inputValue}
            handleInputValueChange={handleInputValueChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <button className="add-album" onClick={addAlbum}>Add Album</button>
        )}       
        <AlbumList
          data={data}
          update={update}
          updateAlbum={updateAlbum}
          deleteAlbum={deleteAlbum}
          updateMenuList={updateMenuList}
          inputValues={inputValues}
          handleInputChange={handleInputChange}
          cancelUpdate={cancelUpdate}
        />
    </>
  );
};

export default AlbumData;

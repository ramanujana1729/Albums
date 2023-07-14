import React from 'react';

const AddAlbumForm = ({ inputValue, handleInputValueChange, handleSubmit }) => {
  return (
    <form className="add-album-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter album title"
        value={inputValue}
        onChange={handleInputValueChange}
      />
      <button type="submit">Add Album</button>
    </form>
  );
};

export default AddAlbumForm;

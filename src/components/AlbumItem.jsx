import React from 'react';

const AlbumItem = ({ item, update, updateAlbum, deleteAlbum, updateMenuList, inputValues, handleInputChange, cancelUpdate }) => {
  return (
    <div className="albumdata_list" key={item.id}>
      <div>
        <p>{item.title}</p>
      </div>
      <div>
        {updateMenuList[item.id] ? (
          <div className="update-menu">
            <input
              type="text"
              placeholder="Update ..."
              value={inputValues[item.id] || ''}
              onChange={(event) => handleInputChange(event, item.id)}
            />
            <button onClick={() => updateAlbum(item.id, inputValues[item.id])}>Update</button>
            <button className="cancel-button" onClick={() => cancelUpdate(item.id)}>X</button>
          </div>
        ) : (
          <div className="update-delete-div">
            <button onClick={() => update(item.id)}>Update</button>
            <button onClick={() => deleteAlbum(item.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumItem;

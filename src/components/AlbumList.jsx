import React from 'react';
import AlbumItem from './AlbumItem';

const AlbumList = ({ data, update, updateAlbum, deleteAlbum, updateMenuList, inputValues, handleInputChange, cancelUpdate }) => {
  return (
    <div className="albumdata">
      {data.length > 0 ? (
        data.map((item) => (
          <AlbumItem
            key={item.id}
            item={item}
            update={update}
            updateAlbum={updateAlbum}
            deleteAlbum={deleteAlbum}
            updateMenuList={updateMenuList}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            cancelUpdate={cancelUpdate}
          />
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default AlbumList;

import React from "react";
import './App.css';

function AlbumList({ user, album }) {
  if(user.id)
    {
      return (
        <div>
          <h2>{user.name}</h2>
          <ul className="albumcontent">
            {album.map((content) => 
              <li key={content.id}>
                <span>{content.id + " - "} {content.title}</span>
              </li>
            )}
          </ul>
        </div>
      )
    } else {
      return <h2>Please click on a user name to the left</h2>;
    }
  
}

export default AlbumList;

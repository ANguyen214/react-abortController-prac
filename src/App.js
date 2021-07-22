import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    document.title = "Awesome Album App";
    return () => {document.title = ""};
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    async function loadUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`,
          {signal: abortController.signal}
        );
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI);
      } catch (error) {
        console.log(error);
      } 
    }
    loadUsers();
    return () => abortController.abort();
  },[]);

  useEffect(() => {
    const abortController = new AbortController;
    async function loadAlbums() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`,
          {signal: abortController.signal}
        );
        const albumFromAPI = await response.json();
        setAlbum(albumFromAPI);
      } catch (error) {
        console.log(error);
      }
    }
    loadAlbums();

    return () => abortController.abort();
  }, [currentUser]);

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} album={album}/>
      </div>
    </div>
  );
}

export default App;

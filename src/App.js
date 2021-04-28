import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';
// import { app }  from './firebase';

// const db = app.firestore();

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('')
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPicture(await fileRef.getDownloadURL());
  };

  const ref = firebase.firestore().collection('restaurants');

  // GET FUNCTION
  function getRestaurants() {
    setLoading(true);
    ref
    .onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setRestaurants(items);
      setLoading(false);
    })
  }

  useEffect(() => {
    getRestaurants();
  }, []);

    // ADD FUNCTION
    function addRestaurant() {
      const newRestaurant = {
        name,
        rating: +rating,
        description,
        picture: picture,
        id: uuidv4(),
      };
  
      ref
        .doc(newRestaurant.id)
        .set(newRestaurant)
        .catch((err) => {
          console.error(err);
        });
    }

  return (
    <>
      <form >
        <input type="file" onChange={onFileChange} />
        <input type="number" value={rating} placeholder="RATING" onChange={(e) => setRating(e.target.value)}/>
        <input type="text" value={name} placeholder="NAME" onChange={(e) => setName(e.target.value)}/>
        <input type="text" value={description} placeholder="DESC" onChange={(e) => setDescription(e.target.value)}/>
        <button onClick={() => addRestaurant()}>Submit</button>
      </form>
      <ul>
        {restaurants.map((withQueso) => {
          console.log(restaurants)
          return (
            <li key={withQueso.id}>
              <img width="100" height="100" src={withQueso.picture} alt={withQueso.name} />
              <p>{withQueso.name}</p>
              <p>{withQueso.rating}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;

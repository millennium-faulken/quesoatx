import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
// import { app }  from './firebase';

// const db = app.firestore();

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPicture(await fileRef.getDownloadURL());
  };

  const ref = firebase.firestore().collection("restaurants");

  function getRestaurants() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRestaurants(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getRestaurants();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addRestaurant(event) {
    event.preventDefault()
    console.log("working")
    const newRestaurant = {
      name,
      rating: +rating,
      description,
      picture: picture,
      id: uuidv4(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    ref
      .doc(newRestaurant.id)
      .set(newRestaurant)
      .catch((err) => {
        console.error(err);
      });
  }

  // function editPost(post) {
  //   const updatedPost = {
  //     rating: +rating,
  //     lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
  //   };
  //   setLoading();
  //   console.log(post)
  //   ref
  //     .doc(post.id)
  //     .update(updatedPost)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  return (
    <div className="main">
      <h1>Rate Some Queso!</h1>
      <form className="addPostForm">
        <input
          type="text"
          value={name}
          placeholder="Restaurant Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={rating}
          placeholder="Rate the queso"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Description of Queso"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={onFileChange} />
        <button onClick={(event) => addRestaurant(event)}>Submit</button>
      </form>
      <h1>Quesos people have rated:</h1>
      <div className="postsContainer">
        {restaurants.map((post) => {
          // console.log(restaurants);
          return (
            <div className="post" key={post.id}>
              <div className="postImg">
                <img src={post.picture} alt={post.name} />
              </div>
              <div className="postData">
                <p className="restaurantName">{post.name}</p>

                <p className="quesoRating">Rating: {post.rating}</p>

                <p className="desc">{post.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

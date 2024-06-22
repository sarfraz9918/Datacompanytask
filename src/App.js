import React, { useState, useEffect } from "react";
import axios from "axios";


const App = () => {
  const [pstId, setpstId] = useState(3);
  const [comm, setcomm] = useState([]);
  const [load, setLoad] = useState(false);

  const datacomment = async (id) => {
    setLoad(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      setcomm(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    datacomment(pstId);
  }, [pstId]);

  const generateRdmPstId = () => {
    const randmId = Math.floor(Math.random()*10)+1;
    setpstId(randmId);
  };

  return (
    <>
    <div className="main">
      <button className="btn" onClick={generateRdmPstId}>
        Click to Random Post ID
      </button>
      {load ? (
        <p>...Data Loading...</p>
      ) : (
        <ul>
          {comm.map((key) => (
            <li key={key.id}>
              <span>{key.email}:</span> {key.body}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
    
  );
};

export default App;

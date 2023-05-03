import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [postdata, setPostData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(json => setData(json));

      // POST DATA
      fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => setPostData(json));

      // console.log(postdata);

      // PUT DATA
      fetch('https://jsonplaceholder.typicode.com/albums/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'foo put update',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log('put data....',json));

      // DELETE DATA
      fetch('https://jsonplaceholder.typicode.com/albums/1', {
        method: 'DELETE',
      });

  }, []);


  return (
    <div className="App">
      <h1>My albums</h1>
      {/* POST DATA */}
      <div style={{'display': 'flex'}}>
        <h4>POST Data</h4>
        <p>{postdata.title}</p>
      </div>
      {data.length > 0 && data.map((item) => (
        <ul className='list' key={item.id}>
          <li>
        <h1>{item.id}</h1>
        <h6>{item.userId}</h6>
        <p>{item.title}</p>
          </li>
        </ul>
        ))}
    </div>
  );
}

export default App;

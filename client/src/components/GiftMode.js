//import logo from './img/logo.svg';
import GiphyBody from './Giphy.js';
import Page from './Err.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GiftMode () {
  const [is_loading, setLoading] = useState(true); // make api call before loading component -- hook to make it wait on a variable
  const [url_list, setURL] = useState();
  const [is_err, setErr] = useState(false);
  let id = useParams().id
  useEffect(() => {
    axios.get(`http://localhost:8000/api/gift_wrap/`+ id)
      .then(res => {
        console.log(res.data.urls)
        setURL(res.data.urls);
        setLoading(false);
        setErr(false);
      })
      .catch(error => {
        console.log(error);
        setErr(true);
        setLoading(false);
      });
  }, [id]);
  if (is_loading) {
    return (
      <Page text="Loading ..." />
    );
  }

  if (is_err) {
    return (
      <Page text="404 - Giphy Gift Not Found !!" />
    )
  }

  return (
      <div>
          <Navbar bg="dark" variant="dark" sticky="top">
            <Nav className="my_nav justify-content-center">
              <Nav.Link id="nav_title" href="#" ><strong><h5>My Giphy Gifts</h5></strong></Nav.Link>
            </Nav>
          </Navbar><br/>
          <GiphyBody is_gift_mode={true} url_list={url_list}/>
      </div>
  );
}

export default GiftMode;

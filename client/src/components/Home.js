//import logo from './img/logo.svg';
import GiphyBody from './Giphy.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Home() {
  return (
      <div>
          <Navbar bg="dark" variant="dark" sticky="top">
            <Nav className="my_nav justify-content-center">
              <Nav.Link id="nav_title" href="#" ><strong><h5>My Giphy Gifts</h5></strong></Nav.Link>
            </Nav>
          </Navbar><br/>
          <GiphyBody is_gift_mode={false} url_list={[]}/>
      </div>
  );
}

export default Home;

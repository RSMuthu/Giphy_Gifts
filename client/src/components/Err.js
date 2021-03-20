//import logo from './img/logo.svg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

function Page(props) {
  let disp_text = props.text
  if (! disp_text){
    disp_text = "404 - No Page Found";
  }
  return (
      <div>
          <Navbar bg="dark" variant="dark" sticky="top">
            <Nav className="my_nav justify-content-center">
              <Nav.Link id="nav_title" href="#" ><strong><h5>My Giphy Gifts</h5></strong></Nav.Link>
            </Nav>
          </Navbar><br/>
          <Container>
            <hr/>
            <Jumbotron fluid>
              <Row className="Giphy"><Col md="12"><center><h3>{disp_text}</h3></center></Col></Row>
            </Jumbotron>
          </Container>
      </div>
  );
}

export default Page;

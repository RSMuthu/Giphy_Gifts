import gift from '../static/img/gift.png';
import '../static/css/Giphy.css';
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class HeaderInp extends React.Component {
  constructor() {
    super();
    this.state={
      url: "",
    };
    if (url_list.length > 0) {
      this.setState({wrap_btn: false})
    }
  }
  event_handle = (event) => {
    this.setState({ url: event.target.value });
  }
  add_new_url = () => {
    let url = this.state.url.trim()
    if (url === "") {
      alert ("URL cannot be Empty !");
      return;
    }
    url_list.push(url)
    //console.log(url_list)
    this.props.callBack(url_list) // update the urls in giphybody & thus reloading the component
  }

  render() {
    return (
      <div>
        <Row className="justify-content-center">
            <Col md="2"></Col>
            <Col md="6" style={{float: "right"}}>
              <input type="text" className="form-control" onChange={this.event_handle} placeholder="Enter the URL of GIF/IMG to add" />
            </Col>
            <Col md="3">
              <Button style={{width: "50%", float:"left"}} variant="primary" onClick={this.add_new_url}>Add Giphy !</Button>
            </Col>
            <Col md="2"></Col>
        </Row>
        <WrapButton />
      </div>
    );
  }
}

class Giphy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     visible:false,
    }
  }
  toggle_state = () => {
  // function that will toggle active/false
    this.setState((prev_state) => ({
      visible: !prev_state.visible,
    }));
  }
  render() {
    return (
      <Col md="4" className="Giphy">
        {this.state.visible
          ? <Image rounded alt="Giphy/Img missing" className="gift_img" id={"gift"+this.props.id} src={this.props.url}  />
          : <Image rounded className="giphy_img" id={"giphy"+this.props.id} alt="Click Me !" src={gift} onClick={()=>this.toggle_state()}/>
        }
      </Col>
    );
  }
}


let url_list = []
//https://media.giphy.com/media/8297LOq0YPoFa/giphy.gif
//https://media.giphy.com/media/vzkSu4oe620Tu/giphy.gif
//https://media.giphy.com/media/RhHHTsjhLvfWw/giphy.gif
//https://media.giphy.com/media/r7Nbr97FsXxXG/giphy.gif

export default class GiphyBody extends React.Component {
  constructor(props) {
    super(props);
    let url = url_list
    if (this.props.url_list) {
      url = this.props.url_list
    }
    this.state = {
      urls: url,
    }
    console.log(this.props.url_list)
  }

  updateUrl = (urls_) => {
      this.setState({urls: urls_})
  }

  generate_content = () => {
    let col = [];
    let full_body = [];
    if (this.state.urls.length === 0) {
      return (
        <Row className="Giphy"><Col md="12"><center><h3>No Giphy Gifts added !</h3></center></Col></Row>
      );
    }
    this.state.urls.forEach ((item, i) => {
      // prepare the array
      col.push(<Giphy key={i} id={i} url={item}/>);

      // after three items add a new row
      if(i % 3 === 2) {
        full_body.push(<Row className="Giphy">{col}</Row>);
        col = [];
      }
    });
    if (col.length > 0) {full_body.push(<Row className="Giphy">{col}</Row>);}
    return full_body;
  }

  render() {
    return (
      <Container>
        {this.props.is_gift_mode
          ? null
          :<HeaderInp callBack={this.updateUrl} />
        }
        <hr/>
        <Jumbotron fluid>
          {this.generate_content()}
        </Jumbotron>
      </Container>
    );
  }

}

class WrapButton extends React.Component {


  wrap_gifs = () => {
    if (url_list.length <= 0) {
      alert("No URL to Wrap !");
      return
    }
    axios.post(`http://localhost:8000/api/gift_wrap`, {
      urls: url_list
    })
      .then(res => {
        let data = res.data;
        alert("Here is the Sharable gift link:  http://localhost:3000/gift_mode/" + data.id);
      })
      .catch(error => {
        console.log(error);
        alert("Gift Wrapping Failed !")
      })
  }

  render () {
    return (
      <Row className="Giphy" ><Col md="12"><center><Button variant="success" onClick={this.wrap_gifs}>Wrap the Gift URLs</Button></center></Col></Row>
    )
  }
}

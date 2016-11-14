import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router';
import '../css/App.css';

import iphone from '../../picture/iphone.png';
//import FacebookLogin from 'react-facebook-login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "Howdy dere",
      userName:"",
      password:"",
      authenticated:true
    }
  }
  setUserName(event){
    this.setState({userName:"event.target.value"});
    console.log("asdf");
  }
  setPassword(event){
    this.setState({password:event.target.value});
  }
  responseFacebook = (response) => {
    console.log(response);
  }
  // authenticate=()=>{
  //   if(this.authenticated) this.setState({authenticated:false});
  //   else this.setState({authenticated:true});
  // }
  authenication_link(){
    if(this.state.authenticated){
      return(
        <div id="au_link">
          <button id="course_link"><Link style={{color:"white"}} to="/courses">Start with your Courses >></Link></button>
          <button id="course_link" style={{top:20}}><Link style={{color:"white"}} to="/about">Start with your Profile >></Link></button>
        </div>
      )
    }
    else{
      return(
        <div id="au_link">
          <FacebookLogin
            appId="959862910786642"
            autoLoad
            callback={this.responseFacebook}
            icon="fa-facebook"
          />
        </div>
      )
    }
  }
  render(){
    return (
      <div style={{display:'absolute'}}>
        {/* <div style={{display:'flex',flexDirection:'row',marginLeft:window.innerWidth/1.5,marginTop:20}}>
          <Link style={{marginRight:50}} to="/courses">courses</Link>
          <Link style={{marginRight:50}} to="/team">team</Link>
          <Link to="/about">about</Link>
        </div> */}
        <div style={{display:'absolute',position:'absolute',top:180,left:60}}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p id="cyann_name"> Cyann </p>
        <p id="welcome">Welcom to Cyann Web!</p>
        <p id="m">Cyann is the learning forum for the new generation.<br/>
                   Make your learning and teaching more interactive.<br/>
                   Make your ideas heard.<br/></p>
        {this.authenication_link()}
        {/* <div id="au_link" style={{top:510}}>
          <button id="course_link"
            onClick={()=>this.authenticate()}>
            Unauthenticate
          </button>
        </div> */}
        <div>
            <img src={iphone} id="iphone1" width={197} height={390}/>
            <img src={iphone} id="iphone2" width={197} height={390}/>
        </div>

        {/* <button id="student_login"
          onclick="document.getElementById('id01').style.display='block'">
          Student Login here
        </button>

        <button id="prof_login"
          onclick="document.getElementById('id01').style.display='block'">
          Professor Login here
        </button> */}
        {/* <script src="/webpack-dev-server.js"></script>
        <script src="/demo/bundle.js"></script> */}

      </div>
    );
  }
}
export default Home;

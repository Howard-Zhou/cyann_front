import React, { Component } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
//import logo from '../logo.svg';
import '../css/App.css';
import '../css/main.css';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaCog from 'react-icons/lib/fa/cog';
import FaUser from 'react-icons/lib/fa/user';
import FaSearchPlus from 'react-icons/lib/fa/search-plus';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import GoX from 'react-icons/lib/go/x';


import face from '../../picture/face.jpg';

import FacebookLogin from 'react-facebook-login';


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: "Howdy dere",
            userName:"",
            curUserId:'',
            password:"",
            message:'asd',
            fontWeight1:'300',
            fontWeight2:'300',
            fontWeight3:'300',
            fontWeight4:'300',
            data:"",
            selection:'',
            background:'none',
            ifshowtext: false,
            ifShowQuestion:true,
            ifShowContent:false,
            ifShowUploadForm:false,
            ifShowAssignment:false,
            background2:'none',
            postSource:[],
            assignmentList:[],
            postTitle:'',
            postContent:'',
            postViewing:'',
            authorId:'',
            commentsViewing:[],
            commentContent:'',
            courseName:[],
            author:'',
            createdAt:'',
            ifShowEditPost:false,
            commentEditing:'',
            ifEditComment:'',
            firstId:'',
            showLoginModal: true,
            user_authenticated: false,
            user_name:'',
            user_id:'',
            user_email:'',
            user_tokenExpire:'',
            user_accessToken:'',
            user_picture:'',
            user_type:'Student',
            file: '',
            imagePreviewUrl: ''
        }
    }
    componentWillMount(){
    }
    componentDidMount(){
      this.getPosts()
      this.getUsername()
      this.getAssignment()
    }
    loginCallback= (response)=>{

      if (response.status === "unknown")
        this.setState({
          user_authenticated:false,
          showLoginModal:true
        });
      else {
        this.setState({
          user_authenticated:true,
          user_name:response.name,
          user_id:response.id,
          user_email:response.email,
          user_tokenExpire:response.expiresIn,
          user_accessToken:response.accessToken,
          user_picture:response.picture.data.url,
          showLoginModal:false,
        });
        console.log(this.state.user_name);
        console.log(this.state.user_id);
        console.log(this.state.user_email);
        console.log(this.state.user_accessToken);
        console.log(this.state.user_expiresin);
        console.log(this.state.user_picture);
        var result = response;
        this.retreiveJWT(result);

      }
    }
    retreiveJWT(result){
      var body = {
      'userType': this.state.user_type,
      'socialToken': result.accessToken,
      'email':result.email,
      'profileImg':result.picture.data.url
      }

      var formBody = []
      for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('http://localhost:8080/api/users/register',{method:'POST',headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },body:formBody})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({jwt:responseData.jwt});
        this.setState({user_type:responseData.userType});
        console.log(this.state.jwt);
        console.log(responseData);
      })
    }
    loginModalClose=()=>{
        this.setState({showLoginModal:false});
    }
    loginModalOpen=()=>{
        this.setState({showLoginModal:true});
    }
    getUsername(){
      fetch("http://localhost:8080/api/users/5823aad92853c404061b8673",{headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
      .then((response) => response.json())
      .then((responseData) => {
          //console.log(responseData.data)
          this.setState({userName:responseData.data.username})
          this.setState({curUserId:responseData.data._id})
      })
    }

    getAssignment(){
        fetch("http://localhost:8080/api/583a3f46be8ded122680ed37/files/assignments",{method:"GET",headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({assignmentList:responseData.files})
          console.log(this.state.assignment)
      })
    }
    getPosts(){
      fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts",{headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData.data)
          this.setState({postSource:responseData.data})
          this.setState({firstId:responseData.data[0]._id})
      })
    }
    setUserName(event){
        this.setState({userName:"event.target.value"})
        // console.log("asdf")
    }
    setPassword(event){
        this.setState({password:event.target.value})
    }
    updateQuestionTitle(event){
        this.setState({postTitle:event.target.value})
    }
    updateQuestionContent(event){
        this.setState({postContent:event.target.value})
    }
    updateComment(event){
        this.setState({commentContent:event.target.value})
    }

    setBackground=()=>{
        this.setState({background:'#60848C'})
    }


    setFontWeight1=()=>{
      this.setState({background:'#60848C'})

        this.setState({selection:
                       <div id="student_post_list">
                           <input id="searchbar" placeholder="Search.."></input>

                           <FaSearchPlus style={{position:"absolute",width:25,height:25,top:23,left:145}}/>

                           <button id="new_post"  type="button" onClick={this.updateList.bind(this)}>New Post</button>

                           <FaPlusCircle style={{position:"absolute",width:23,height:23,top:23,left:295,color:'cyann'}}/>

                           <div>
                               <p id="post_h2">Post List</p>
                               <ul id="aaa">
                                   {this.state.postSource.map(function(post,i){
                                     if(post.author._id===this.state.curUserId){
                                       return(
                                        <li id="b" onClick={this.showContent.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.getContent(post._id)}>
                                              <GoX id="delete_post" onClick={()=>this.deletePost(post._id)}/>
                                              <dt id="post_title" style={{top:-32}}> {post.title}</dt>
                                              <dd id="post_body" style={{top:-32}}>{post.content}</dd>
                                            </a>
                                        </span>
                                        </li>
                                       )
                                     }
                                     else{
                                       return(
                                        <li id="b" onClick={this.showContent.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.getContent(post._id)}>
                                              <dt id="post_title"> {post.title}</dt>
                                              <dd id="post_body">{post.content}</dd>
                                            </a>
                                        </span>
                                        </li>
                                       )
                                     }
                                   },this)}

                               </ul>
                           </div>
                       </div>})
        this.setState({fontWeight1:'900'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'300'})
    }
    setFontWeight2=()=>{
      this.setState({background:'#60848C'})

        this.setState({selection:
                       <div id="prof_post_list">
                           <input id="searchbar" placeholder="Search.."></input>
                           <FaSearchPlus style={{position:"absolute",width:25,height:25,top:23,left:145}}/>
                           <p id="post_h2">Post List</p>


                      </div>})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'900'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'300'})

        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})

    }

    setFontWeight3=()=>{
        this.getAssignment()
        console.log(this.state.assignmentList)
      this.setState({background:'#60848C'})
 this.setState({selection:
                        <div id="student_post_list">
                           <input id="searchbar" placeholder="Search.."></input>
                           
                           <FaSearchPlus style={{position:"absolute",width:25,height:25,top:23,left:145}}/>

                           <button id="new_post"  type="button" onClick={this.uploadAssignment.bind(this)}>New File</button>

                           <FaPlusCircle style={{position:"absolute",width:23,height:23,top:23,left:295,color:'cyann'}}/>

                           <div>
                               <p id="post_h2">Assignments</p>
                               <ul id="aaa">
                                   {this.state.assignmentList.map(function(assn,i){
                                       return(
                                    <li id="b" onClick={this.showAssignment.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.downloadAssignment('assignments',assn)}>
                                                <GoX id="delete_post" onClick={()=>this.deleteAssignment('assignments',assn)}/>
                                              <dt id="post_title"> {assn}</dt>
                                            </a>
                                        </span>
                                    </li>
                                       )
                                   },this)}

                               </ul>
                           </div>
                       </div>})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'900'})
        this.setState({fontWeight4:'300'})

        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
    }
    setFontWeight4=()=>{
      this.setState({background:'#60848C'})

        this.setState({selection:'students list'})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'900'})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
    }
    updateList=()=>{
        this.setState({ifshowtext:true})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({postTitle:''})
        this.setState({postContent:''})
    }
    uploadAssignment=()=>{
        this.setState({ifShowContent:false})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:true})
        this.setState({ifShowAssignment:false})
    }
    showAssignment=()=>{
        this.setState({ifShowContent:false})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:true})
    }
    showContent=()=>{
        this.setState({ifShowContent:true})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})

    }
    showQuestion=()=>{
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:true})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})

    }

postComment=()=>{
  if(this.state.commentContent.length === 0){
    alert("content Empty!")
  }
  else{
        var comment = {
            'content': this.state.commentContent,
            'userId': '5823aad92853c404061b8673',
            }

        var formBody = []
        for (var property in comment) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(comment[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+this.state.postViewing+"/comments",{method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
            this.getComment()
        })

        document.getElementById("newComment").value = "";
      }
    }

    getComment=()=>{
        fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+this.state.postViewing+"/comments",{method:"get",headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData.data)
         this.setState({commentsViewing:responseData.data})
        })
    }
    
    uploadFile=(type)=>{
   //check if the file exist
       //var input = document.querySelector('input[type="file"]')
          //var input = document.getElementById("assignmentFile").value
        var data = new FormData()
        data.append('attachment', this.state.file)
       // data.append('user', 'hubot')
        fetch("http://localhost:8080/api/583a3f46be8ded122680ed37/files/"+ type +"/upload",{method:"POST",
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
        },
        body:data})
        .then((response) => response.json())
        .then((responseData) => {
        this.setFontWeight3()
        })      
} 
    downloadAssignment=(type,filename)=>{
        fetch("http://localhost:8080/api/583a3f46be8ded122680ed37/files/"+ type +"/download/"+filename,{method:"GET",
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
        }})
        .then((response) => response.json())
    }

    postQuestion=()=>{
      if(this.state.postTitle.length === 0 || this.state.postContent.length === 0){
        alert("title or content Empty!")
      }
      else{
        var post = {
            'title': this.state.postTitle,
            'content': this.state.postContent
            }

        var formBody = []
        for (var property in post) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(post[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts",{method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
        fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts",{headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({postSource:responseData.data})
            this.getContent(responseData.data[0]._id)
            this.setState({ifShowContent:!this.state.ifShowContent})

            this.setFontWeight1()
            document.getElementById("updatePostTitle").value = "";
            document.getElementById("updatePostContent").value = "";

        })

        })
      }
    }

    cancelPostQuestion=()=>{
      var r = confirm("are you sure you want to quit creating new post?");
      if(r==true){
        this.getContent(this.state.firstId)
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:true})
        document.getElementById("updatePostTitle").value = "";
        document.getElementById("updatePostContent").value = "";
      }
    }

    getContent(id){
       fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+id,{method:"get",headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData.data)
         this.setState({postViewing:responseData.data._id})
         this.setState({postTitle:responseData.data.title})
         this.setState({author:responseData.data.author.name})
         this.setState({authorId:responseData.data.author._id})
         this.setState({postContent:responseData.data.content})
         this.setState({commentsViewing:responseData.data.comments})
         this.setState({createdAt:responseData.data.createdAt})
        })
    }

    userPortfilio(){



    }

    deleteAssignment=(type,assn)=>{
       var r = confirm("Are you sure you want to delete this Assignment?");
    if (r == true) {
        fetch("http://localhost:8080/api/583a3f46be8ded122680ed37/files/"+type+"/"+assn,{method:"DELETE",
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
        }})
        .then((response) => response.json())
    }
    }

    deletePost=(id)=>{
      //alert("Are you sure you want to quit?");
      var body = {
          'userId': "5823aad92853c404061b8673"
          }

      var formBody = []
      for (var property in body) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(body[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
    var r = confirm("Are you sure you want to delete this post?");
    if (r == true) {
        fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+id,{method:"DELETE",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
        fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/",{headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({postSource:responseData.data})
          this.getContent(responseData.data[0]._id)
          this.setState({ifShowContent:this.state.ifShowContent})

          this.setFontWeight1()
          })
        })

    }
  }

  upvote=(commentId)=>{
    var body = {
        'userId': '5823aad92853c404061b8673',
        }

    var formBody = []
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+this.state.postViewing+"/comments/"+commentId+"/upvote",{method:"put",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
    },
    body:formBody})
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData)
    })
  }

logout=()=>{
  var r = confirm("Are you sure you want to logout?");
  if (r == true) {
  }
}

editPost=()=>{
    this.setState({ifshowtext:false})
    this.setState({ifShowQuestion:false})
    this.setState({ifShowContent:false})
    this.setState({ifShowEditPost:true})
}

updatePost=()=>{
  var body = {
      'userId': '5823aad92853c404061b8673',
      'title': this.state.postTitle,
      'content': this.state.postContent,
      }

  var formBody = []
  for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+this.state.postViewing,{method:"PUT",
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
  },
  body:formBody})
  .then((response) => response.json())
  .then((responseData) => {
    this.setState({postTitle:responseData.data.title})
    this.setState({postContent:responseData.data.content})
    fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/",{headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
      }})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({postSource:responseData.data})
      this.setState({ifShowContent:this.state.ifShowContent})

      this.setFontWeight1()
      })
  })

  this.setState({ifShowContent:true})
  this.setState({ifShowEditPost:false})
}

cancelUpdatePost=()=>{
    this.setState({ifShowContent:true})
    this.setState({ifShowEditPost:false})
}

editComment=(id)=>{
  this.setState({ifEditComment:true})
  console.log(id)
  this.setState({commentEditing:id})
}

updateNewComment=()=>{
  var body = {
      'userId': '583a3e35be8ded122680ed36',
      'content': this.state.commentContent,
      }

  var formBody = []
  for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch("http://localhost:8080/api/courses/583a3f46be8ded122680ed37/posts/"+this.state.postViewing+"/comments/"+this.state.commentEditing,{method:"PUT",
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lkIjoiMTg5NDgyMzYxNDA4NTE5MyIsInVzZXJJZCI6IjU4M2EzZTM1YmU4ZGVkMTIyNjgwZWQzNiIsInVzZXJUeXBlIjoic3R1ZGVudCIsImlhdCI6MTQ4MDIxMzU1MH0.gwm2kpNYs1FljTiDmBnoGxdgub2PMaloE43eyWB8wmo'
  },
  body:formBody})
  .then((response) => response.json())
  .then((responseData) => {
    this.getComment()
    //this.setState({commentContent:responseData.data.content})
    //this.setState({createdAt:responseData.data.updatedAt})
  })

    this.setState({ifEditComment:false})

}

cancelUpdateComment=()=>{
    this.setState({ifEditComment:false})
}

_handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
        this.setState({
             file: file,
             imagePreviewUrl: reader.result
           });
    console.log(file)
}


    
addCourse=()=>{
  this.setState({background:'none'})
  this.setState({ifshowtext:false})
  this.setState({ifShowQuestion:false})
  this.setState({ifShowContent:false})
  this.setState({ifShowEditPost:false})
  this.setState({selection:
    <div>
      <p style={{color:'white',fontSize:20,position:'relative',top:50}}>University of British Columbia</p>

    </div>

  })
}

renderList=()=>{
      if(this.state.ifShowEditPost){
        return(
          <div id="postPage">
            <div id="postTop">
                <p id="contentTitle">
                   <textarea id="updatePostTitle" onChange={this.updateQuestionTitle.bind(this)}>{this.state.postTitle}</textarea>
                </p>

                <p id="contentContent">
                    <textarea id="updatePostContent" onChange={this.updateQuestionContent.bind(this)}>{this.state.postContent}</textarea>
                </p>
                <p><button id="bu" onClick={()=>this.updatePost()}>submit</button><button id="bu" onClick={()=>this.cancelUpdatePost()}>cancel</button></p>
              </div>

              <ul id="commentList">
                {this.state.commentsViewing.map(function(comment,i){
                    return(
                        <li id="commentContent">
                            <p style={{fontSize:"10px",color:"#002859"}}>followup discussions</p>
                           <h2></h2>
                           <p>{comment.content}</p>

                          <h2></h2>
                          <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                          <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                          <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                        </li>
                    )
                },this)}
                <div id="commentContent">
                  <p style={{fontSize:"10px"}}>Start a new followup discussion</p>
                  <h2></h2>
                  <textarea onChange={this.updateComment.bind(this)}  id="newComment" ></textarea>
                  <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                  {/* <button id="newComment_cancel" onClick={()=>this.cancelPostComment()}>cancel</button> */}
                </div>
              </ul>

            </div>
        )
    }
        if(this.state.ifShowUploadForm){
            return(
            <div id="post_form">
             <input className="fileInput" id="assignmentFile" type="file" name='attachment' onChange={(e)=>this._handleImageChange(e)} />
             <p><button id="upload" onClick={()=>this.uploadFile('assignments')}>upload</button></p>
            </div>
            )
        }
        if(this.state.ifShowAssignment){
//            var filepath = "iCloudDrive/Doucuments/CPEN321/Cyann/uploads/" + "CPEN321" + "/" + "assignments" + "/Chapter5-Design.pdf"
//            console.log(filepath)
    return(
                
            <p> haha sha ye mei you </p>
                //<embed src='filepath' width="800px" height="2100px" />

        )
        }
        if(this.state.ifShowContent){
          if(this.state.curUserId===this.state.authorId){
            return(
              <div id="postPage">
                <div id="postTop">
                    <p id="contentTitle" >
                       {this.state.postTitle}
                    </p>

                    <p id="contentContent">
                        {this.state.postContent}
                    </p>
                    <p style={{fontSize:"12px",color:"#002859"}}> <button id="bu" onClick={()=>this.editPost()}>edit</button> Posted by {this.state.author} Created at {this.state.createdAt}</p>
                  </div>

                  <ul id="commentList">
                    {this.state.commentsViewing.map(function(comment,i){
                      if(!(this.state.curUserId===comment.author._id)){
                        return(
                          <li id="commentContent">
                            <p style={{fontSize:"10px",color:"#002859"}}>followup discussions</p>
                            <h2></h2>
                            <p>{comment.content}</p>

                            <h2></h2>
                            <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                            <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                            <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                          </li>
                    )

                      }
                      else if(this.state.ifEditComment&&comment._id===this.state.commentEditing){
                        return(
                          <li id="commentContent">
                        <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                         <h2></h2>
                         <textarea id="updateCom" onChange={this.updateComment.bind(this)} >{comment.content}</textarea>
                        <h2></h2>
                        <button id="bu" onClick={()=>this.updateNewComment()}>submit</button><button id="bu" onClick={()=>this.cancelUpdateComment()}>cancel</button>
                        </li>
                        )
                      }
                      else{
                          return(
                            <li id="commentContent">
                              <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                               <h2></h2>
                               <p>{comment.content}</p>

                              <h2></h2>
                              <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                              <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                              <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                            </li>
                        )
                      }
                    },this)}
                    <div id="commentContent">
                      <p style={{fontSize:"10px"}}>Start a new followup discussion</p>
                      <h2></h2>
                      <textarea onChange={this.updateComment.bind(this)}  id="newComment" ></textarea>
                      <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                      <button id="newComment_cancel" >cancel</button>
                    </div>
                  </ul>

                </div>
            )
          }
          else{
            return(
              <div id="postPage">
                <div id="postTop">
                    <p id="contentTitle">
                       {this.state.postTitle}
                    </p>

                    <p id="contentContent">
                        {this.state.postContent}
                    </p>
                    <p style={{fontSize:"12px",color:"#002859"}}> Posted by {this.state.author} Created at {this.state.createdAt}</p>
                  </div>

                  <ul id="commentList">
                    {this.state.commentsViewing.map(function(comment,i){
                      if(this.state.ifEditComment&&comment._id===this.state.commentEditing){
                        return(
                          <li id="commentContent">
                        <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                         <h2></h2>
                         <textarea id="updateCom" onChange={this.updateComment.bind(this)} >{comment.content}</textarea>
                        <h2></h2>
                        <button id="bu" onClick={()=>this.updateNewComment()}>submit</button><button id="bu" onClick={()=>this.cancelUpdateComment()}>cancel</button>
                        </li>
                        )
                      }
                      else{
                          return(
                            <li id="commentContent">
                              <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                               <h2></h2>
                               <p>{comment.content}</p>

                              <h2></h2>
                              <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                              <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                              <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                            </li>
                        )
                      }
                    },this)}
                    <div id="commentContent">
                      <p style={{fontSize:"10px"}}>Start a new followup discussion</p>
                      <h2></h2>
                      <textarea onChange={this.updateComment.bind(this)}  id="newComment" ></textarea>
                      <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                      <button id="newComment_cancel" >cancel</button>
                    </div>
                  </ul>

                </div>
            )
          }
        }
        if(this.state.ifshowtext){
            return(
                <div>
                    <input onChange={this.updateQuestionTitle.bind(this)} type="text"  id="newPost_title"/>
                    <textarea onChange={this.updateQuestionContent.bind(this)}  id="newPost_content" cols="70" rows="20" ></textarea>
                    <button id="newPost_submit" onClick={()=>this.postQuestion()}>submit</button>
                    <button id="newPost_cancel" onClick={()=>this.cancelPostQuestion()}>cancel</button>
                </div>
            )
        }
        if(this.state.ifShowQuestion){
            return(
                <div>
                    <p>welcome to Cyann</p>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="App">

                <div style={{display:'flex',flexDirection:'row'}}>

                    <div id="portfolio_bar">
                        <p id="name">{this.state.userName}</p>
                        <img src={this.state.user_picture} style={{position:"absolute",top:20,left:40,width:120,height:120}}/>
                        <FaCog id="setting" />
                        <FaSignOut id="signout" onClick={()=>this.logout()}/>
                        <button id="user" onClick={()=>this.userPortfilio()}><FaUser/></button>
                    </div>



                    <div style={{height:window.innerHeight,width:window.innerWidth/6,backgroundColor:'#17B3C1'}}>

                        <a href="#" id="addCourse" onClick={()=>this.addCourse()}>+ add another course</a>


                        <ul id="course_list">
                            <ul id="course" type="button" data-toggle="collapse" data-target="#content"
                                onClick={this.setBackground}
                                style={{background:this.state.background}}>
                                CPEN321
                            </ul>
                            <div id="content" className="collapse">
                                <ul>
                                    <button className="post" >
                                        <span
                                            onClick={this.setFontWeight1}
                                            style={{fontWeight:this.state.fontWeight1}}>
                                            Student Post
                                        </span>
                                    </button>

                                    <button className="post" >
                                        <span
                                            onClick={this.setFontWeight2}
                                            style={{fontWeight:this.state.fontWeight2}}>
                                            Professor Post
                                        </span>
                                    </button>

                                    <button className="post" >
                                        <span
                                            onClick={this.setFontWeight3}
                                            style={{fontWeight:this.state.fontWeight3}}>
                                            Resource
                                        </span>
                                    </button>
                                            
                                            <button className="post" >
                                        <span
                                            onClick={this.setFontWeight4}
                                            style={{fontWeight:this.state.fontWeight4}}>
                                            Enrolled Students
                                        </span>
                                    </button>

                                    <button className="post" >
                                        <span
                                            onClick={this.setFontWeight4}
                                            style={{fontWeight:this.state.fontWeight4}}>
                                            Enrolled Students
                                        </span>
                                    </button>
                                </ul>
                            </div>

                        </ul>
                    </div>

                    <div style={{height:window.innerHeight,width:window.innerWidth/3,backgroundColor:'#60848C'}}>

                        <div>
                            {this.state.selection}
                        </div>
                    </div>

                    <div style={{height:window.innerHeight,width:window.innerWidth/2,backgroundColor:'white'}}>
                        <div>
                            {this.renderList()}
                        </div>
                    </div>

                    {/* code for login */}
                    <div style={{display:'none'}}><FacebookLogin
                      appId="959862910786642"
                      autoLoad={true}
                      fields="name,email,picture"
                      callback={this.loginCallback}
                      size="small"
                      icon="fa-facebook"
                      textButton="Facebook Login"
                    /></div>

                    <Modal
                      show={this.state.showLoginModal}
                      onHide={this.loginModalClose}
                      backdrop='static'
                      bsSize="large">
                      <Modal.Header>
                        <Modal.Title style={{float:'left'}}>Please Login first.</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <div style={{padding:5}}><FacebookLogin
                          appId="959862910786642"
                          autoLoad={true}
                          fields="name,email,picture"
                          callback={this.loginCallback}
                          size="metro"
                          icon="fa-facebook"
                          textButton="Login via Facebook"
                        /></div>
                      </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}


export default Courses;
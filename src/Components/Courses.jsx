//
import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../css/App.css';
import '../css/main.css';


import face from '../../picture/face.jpg';
import searchicon from '../../picture/searchicon.png';
import plus from '../../picture/plus.png';


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: "Howdy dere",
            userName:"",
            password:"",
            message:'asd',
            fontWeight1:'300',
            fontWeight1:'300',
            fontWeight1:'300',
            fontWeight1:'300',
            data:"",
            selection:'',
            background1:'none',
            ifshowtext: false,
            ifShowQuestion:true,
            ifShowContent:false,
            background2:'none',
            postSource:[],
            questionTitle:'',
            questionContent:'',
            postTitle:'',
            postContent:'',
            postViewing:'',
            commentsViewing:[],
            commentContent:''

        }
    }

    componentWillMount(){

    }
    componentDidMount(){
      this.getPosts()
    }

    getPosts(){
      fetch("http://localhost:8080/api/courses/5823af0196ca1b048113562a/posts")
      .then((response) => response.json())
      .then((responseData) => {
          //console.log(responseData.data)
          this.setState({postSource:responseData.data})
      })
    }
    setUserName(event){
        this.setState({userName:"event.target.value"})
//        console.log("asdf")
    }
    setPassword(event){
        this.setState({password:event.target.value})
    }
    updateQuestionTitle(event){
        this.setState({questionTitle:event.target.value})
    }
    updateQuestionContent(event){
        this.setState({questionContent:event.target.value})
    }
    updateComment(event){
        this.setState({commentContent:event.target.value})
    }

    setBackground1=()=>{
        this.setState({background1:'#60848C'})
        this.setState({background2:'none'})
    }
    setBackground2=()=>{
        this.setState({background2:'#60848C'})
        this.setState({background1:'none'})
    }


    setFontWeight1=()=>{
        this.setState({selection:
                       <div id="student_post_list">
                           <input id="searchbar" placeholder="Search.."></input>

                           <img src={searchicon} id="picture" style={{width:25,height:25,top:23,left:145}}/>

                           <button id="new_post"  type="button" onClick={this.updateList.bind(this)}>New Post</button>

                           <img src={plus} id="picture" style={{width:23,height:23,top:23,left:295}}/>

                           <div>
                               <p id="post_h2">Post List</p>
                               <ul id="aaa">
                                   {this.state.postSource.map(function(post,i){
                                       return(
                                        <li id="b" onClick={this.showContent.bind(this)}><span><a href="#" onClick={()=>this.getContent(post._id)}>
                                        <dt id="post_title"> {post.title}</dt>
                                        <dd id="post_body">{post.content}</dd></a></span>
                                        </li>
                                       )
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
        this.setState({selection:
                       <div id="prof_post_list">
                           <input id="searchbar" placeholder="Search.."></input>
                           <img src={searchicon} id="picture" style={{width:25,height:25,top:23,left:145}}/>
                           <p id="post_h2">Post List</p>


                      </div>})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'900'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'300'})
    }
    setFontWeight3=()=>{
        this.setState({selection:
                      <div>
                       <table id="homework_list">
                           <caption style={{fontSize:20,color:"white"}}>Homework List</caption>
                           <tr>
                               <td>Homework</td>
                               <td>due date</td>
                           </tr>
                         <tr>
                             <th><a href="../../downloadfile/1intro.pdf" download target="_blank"><p id="homework">1intro</p></a></th>
                             <th>Oct 30, 2016</th>
                         </tr>
                         <th><a href="../../downloadfile/2lifecycle.pdf" download target="_blank"><p id="homework">2lifecycle</p></a></th>
                           <th>Nov 1, 2016</th>
                        </table>

                       </div>})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'900'})
        this.setState({fontWeight4:'300'})
    }
    setFontWeight4=()=>{
        this.setState({selection:'readings'})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'900'})
    }
    updateList=()=>{
        this.setState({ifshowtext:true})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
    }
    showContent=()=>{
        this.setState({ifShowContent:true})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})

    }
    showQuestion=(event)=>{
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:true})
        this.setState({ifShowContent:false})
    }

postComment=()=>{
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
        fetch("http://localhost:8080/api/courses/5823af0196ca1b048113562a/posts/"+this.state.postViewing+"/comments",{method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
//            this.setState({commentSource:responseData.data})
            this.getComment()

        })
    }

    getComment=()=>{
        fetch("http://localhost:8080/api/courses/5823af0196ca1b048113562a/posts/"+this.state.postViewing+"/comments",{method:"get"})
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData)
         this.setState({commentsViewing:responseData.data})
        })
    }

    postQuestion=()=>{
        var post = {
            'title': this.state.questionTitle,
            'content': this.state.questionContent,
            'userId': '5823aad92853c404061b8673'
            }

        var formBody = []
        for (var property in post) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(post[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("http://localhost:8080/api/courses/5823af0196ca1b048113562a/posts",{method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
        fetch("http://localhost:8080/api/courses/5823af0196ca1b048113562a/posts")
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            this.setState({postSource:responseData.data})
            this.getContent(responseData.data[responseData.data.length-1]._id)
            this.setState({ifShowContent:!this.state.ifShowContent})
        })

        })
    }

    getContent(id){
       fetch("http://localhost:8080/api/courses/5823af0196ca1b048113562a/posts/"+id,{method:"get"})
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData.data)
         this.setState({postViewing:responseData.data._id})
         this.setState({postTitle:responseData.data.title})
         this.setState({postContent:responseData.data.content})
         this.setState({commentsViewing:responseData.data.comments})
        })
    }

    renderList=()=>{
        if(this.state.ifShowContent){
            return(
              <div>
                    <p id="contentTitle">
                       {this.state.postTitle}
                    </p>

                    <p id="contentContent">
                        {this.state.postContent}
                    </p>
                  <ul id="commentList">
                    {this.state.commentsViewing.map(function(comment,i){
                        return(
                            <li id="commentContent">
                                <p>student's comment</p>
                               <h2></h2>
                               {comment.content}
                              <h2></h2>
                              <p>good question</p>
                            </li>

                        )
                    },this)}
                      <textarea onChange={this.updateComment.bind(this)}  id="newComment" cols="70" rows="7" ></textarea>
                      <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                      <button id="newComment_cancel" >cancel</button>
                  </ul>

                </div>
            )
        }
        if(this.state.ifshowtext){
            return(
                <div>
                    <input onChange={this.updateQuestionTitle.bind(this)} type="text"  id="newPost_title"/>
                    <textarea onChange={this.updateQuestionContent.bind(this)}  id="newPost_content" cols="70" rows="20" ></textarea>
                    <button id="newPost_submit" onClick={()=>this.postQuestion()}>submit</button>
                    <button id="newPost_cancel">cancel</button>
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

                    </div>

                    <img src={face} id="picture" style={{top:30,left:40,width:120,height:120}}/>

                    <div style={{height:window.innerHeight,width:window.innerWidth/6,backgroundColor:'#17B3C1'}}>
                        <ul id="course_list">
                            <ul id="course" type="button" data-toggle="collapse" data-target="#content"
                                onClick={this.setBackground1}
                                style={{background:this.state.background1}}>
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
                                            Homework
                                        </span>
                                    </button>

                                    <button className="post" >
                                        <span
                                            onClick={this.setFontWeight4}
                                            style={{fontWeight:this.state.fontWeight4}}>
                                            Lecture notes
                                        </span>
                                    </button>
                                </ul>
                            </div>
                            <ul id="course" button type="button"  data-toggle="collapse" data-target="#content2"
                                onClick={this.setBackground2}
                                style={{background:this.state.background2}}>
                                ELEC331
                            </ul>
                            <div id="content2" className="collapse">
                                <ul>
                                    <button className="post">
                                        <span
                                            onClick={this.setFontWeight1}
                                            style={{fontWeight:this.state.fontWeight1}}>
                                            Student Post
                                        </span>
                                    </button>
                                    <button className="post">
                                        <span
                                            onClick={this.setFontWeight2}
                                            style={{fontWeight:this.state.fontWeight2}}>
                                            Professor Post
                                        </span>
                                    </button>
                                    <button className="post">
                                        <span
                                            onClick={this.setFontWeight3}
                                            style={{fontWeight:this.state.fontWeight3}}>
                                            Homework
                                        </span>
                                    </button>
                                    <button className="post">
                                        <span
                                            onClick={this.setFontWeight4}
                                            style={{fontWeight:this.state.fontWeight4}}>
                                            Lecture notes
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
                </div>
            </div>
        );
    }
}
//
// class PostWithDisplay extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             something: ''
//         }
//     }
//     componentWillMount() {
//
//     }
//     componentDidMount() {
//
//     }
//     _handleImageChange(e) {
//         e.preventDefault();
//
//         let reader = new FileReader();
//         let file = e.target.files[0];
//
//         reader.onloadend = () => {
//           this.setState({
//             file: file,
//             imagePreviewUrl: reader.result
//           });
//         }
//
//         reader.readAsDataURL(file)
//     }
//     render() {
//         return (
//             <div id="PostWithDisplay">
//                 <h1 id="PostWithDisplay_title">{this.props.title}</h1>
//                 <p id="PostWithDisplay_content" >{this.props.content}</p>
//                 <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
//                 <textarea ref="newText" defaultValue="new text" id="form-control"></textarea>
//             </div>
//         );
//     }
// }

export default Courses;

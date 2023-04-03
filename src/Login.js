import React from 'react';
import startFirebase from './config/firedb';
import { set, ref ,get ,child } from 'firebase/database';
import { Navigate } from 'react-router-dom';
import Security from './Security';
import ForgotPassword from './ForgotPassword';
import { Link } from "react-router-dom";


class Login extends React.Component{



  constructor(props){
    super(props);
    this.state = {
      db:'',
      db_password:'',
      db_username:'',
      isLoggedIn: false,
      


    }
    this.interface= this.interface.bind(this);

  }
  
  componentDidMount(){
    this.setState({
      db:startFirebase()
    });
  }

  render(){
    if (this.state.isLoggedIn) {
        return <Navigate to={{pathname: '/Security'}} />
    }
      
    
    return (
      
    <div style={{ textAlign: 'center' }}>
        <div>
          <div>Username</div>
          <input name="db_username" placeholder="Enter Username.." type="text" value={this.state.db_username} onChange={e => {this.setState({db_username:e.target.value});}} />
        </div>

        <div>

          <div>Password</div>
          <input name="db_password" placeholder="Enter Password.." type="text" value={this.state.db_password} onChange={e => {this.setState({db_password:e.target.value});}} />
        </div>

        <button id="verifyBtn"onClick={this.interface}>Verify</button> 
        <li>
                    <Link to="/ForgotPassword">ForgotPassword</Link>
                </li> 
         
        </div>
        

        
  );
}
interface(event){
  const id=event.target.id;
  if(id=='verifyBtn')
  this.selectData();
  const db_username = this.getAllInputs().db_username;
this.setState({  db_username });

}

getAllInputs(){
  return {
    db_password :this.state.db_password,
    db_username :this.state.db_username,

  }

}
/*selectData(){
    const dbref=ref(this.state.db);
    const db_phone=this.getAllInputs().db_phone;

    

    get(child(dbref , 'Customer/'+db_phone)).then((snapshot) => {
        if(snapshot.exists()){
            this.setState({
                Email : snapshot.val().Email ,
                Password : snapshot.val().Password,
                Answer : snapshot.val().Answer

            })
            console.log("Data found: ", snapshot.val());
            alert("data found");

            
        }
        else{
            alert("No data found");
        }
    })
    .catch((error)=>{alert("there was an error ,details :"+error)});
}*/
selectData(){
    const dbref = ref(this.state.db);
    const db_username = this.getAllInputs().db_username;
  
    get(child(dbref, 'Customer/' + db_username)).then((snapshot) => {
      if (snapshot.exists()) {
        const { UserName, Password } = snapshot.val();
        const { db_username, db_password } = this.state;
  
        if (Password === db_password) {
          console.log("Login successful");
          this.setState({isLoggedIn: true});

          alert("Login successful"+db_username);

        } else {
          console.log("Invalid Username or password");
          alert("Invalid Username or password");
        }
      } else {
        alert("No data found");
      }
    }).catch((error) => {
      alert("There was an error, details: " + error)
    });
  }
  

  


  
}
export default Login;
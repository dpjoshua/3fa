import React from 'react';
import startFirebase from './config/firedb';
import { set, ref, get, child } from 'firebase/database';
import ImageSelector from './Dummy';


class Register extends React.Component {


  handleSecurityQChange(event) {
    this.setState({ db_security_q: event.target.value });
  }
  checkPasswordStrength(password) {
    // check password length
    if (password.length < 8) {
      return 'weak';
    }

    // check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'weak';
    }

    // check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return 'weak';
    }

    // check for number
    if (!/[0-9]/.test(password)) {
      return 'weak';
    }

    // check for symbol
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'weak';
    }

    return 'strong';
  }




  constructor(props) {
    super(props);
    this.state = {
      db: '',
      db_email: '',
      db_password: '',
      db_phone: '',
      db_security_q: '',
      db_answer: '',
      db_fullname: '',
      db_dob: '',
      db_username: '',
      passwordStrength: '',
      otherQuestion: false ,// new state property
      db_image: null // new state property for selected image




    }
    this.interface = this.interface.bind(this);
    this.handleSecurityQChange = this.handleSecurityQChange.bind(this);



  }
  componentDidMount() {
    this.setState({
      db: startFirebase()
    });
  }
  

  render() {
    return (
      <div style={{ textAlign: 'center' }}>

        <div>
          <div>
            <div>Full Name</div>
            <input name="db_fullname" placeholder="Enter Full Name.." type="text" value={this.state.db_fullname} onChange={e => { this.setState({ db_fullname: e.target.value }); }} />
          </div>
          <div>Email</div>
          <input name="db_email" placeholder="Enter Email.." type="text" value={this.state.db_email} onChange={e => { this.setState({ db_email: e.target.value }); }} />
        </div>

        <div>
          <div>Password</div>
          <input name="db_password" placeholder="Enter Password.." type="text" value={this.state.db_password} onChange={e => { this.setState({ db_password: e.target.value }); }} />
        </div>
        <div>
          <div>Date of Birth</div>
          <input name="db_dob" placeholder="Enter Date of Birth.." type="date" value={this.state.db_dob} onChange={e => { this.setState({ db_dob: e.target.value }); }} />
        </div>
        <div>
          <div>Username</div>
          <input name="db_username" placeholder="Enter Username.." type="text" value={this.state.db_username} onChange={e => { this.setState({ db_username: e.target.value }); }} />
        </div>
        <div>
          <div>Phone Number</div>
          <input name="db_phone" placeholder="Enter Phone Number.." type="text" value={this.state.db_phone} onChange={e => { this.setState({ db_phone: e.target.value }); }} />
        </div>
        <l1>Choose Security Questions..</l1>
        <br />
        <select name="db_security_q" value={this.state.db_security_q} onChange={(e) => { this.setState({ db_security_q: e.target.value }) }}>
          <option value="">Please select your question</option>
          <option value="In what city or town did your mother and father meet?">In what city or town did your mother and father meet?</option>
          <option value="Where did you go on your favorite vacation as a child?">Where did you go on your favorite vacation as a child?</option>
          <option value="What is your favorite color?">What is your favorite color?</option>
          <option value="What is your favorite book?">What is your favorite book?</option>
          <option value="Other">Other</option> {/* new option */}
        </select>
        {this.state.db_security_q === "Other" && (
          <div>
            <div>Other Security Question</div>
            <input name="other_security_q" placeholder="Enter your security question.." type="text"
              value={this.state.otherQuestion}
              onChange={(e) => { this.setState({ otherQuestion: e.target.value }) }}
            />
          </div>
        )}


        <br />
        <div>
          <div>Answer</div>
          <input name="db_answer" placeholder="Enter Answer.." type="text" value={this.state.db_answer} onChange={e => { this.setState({ db_answer: e.target.value }); }} />
        </div>
        <div>
          <h1>Select one Image</h1>
          <ImageSelector value={this.state.db_image} onChange={e => { this.setState({ db_image: e.target.value }); }} />
        </div>
        <button id="addBtn" onClick={this.interface}>Add Data</button>
      </div>
    );
  }
  interface(event) {
    const id = event.target.id;
    if (id == 'addBtn')
      this.insertData();
  }
  getAllInputs() {
    const inputs = {
      db_email: this.state.db_email,
      db_password: this.state.db_password,
      db_phone: Number(this.state.db_phone),
      db_security_q: this.state.db_security_q,
      db_answer: this.state.db_answer,
      db_fullname: this.state.db_fullname,
      db_dob: this.state.db_dob,
      db_username: this.state.db_username,
      db_image:this.state.db_image
    };
    if (this.state.db_security_q === "Other") {
      inputs.db_security_q = this.state.otherQuestion;
    }
    return inputs;
  }

  insertData() {
    const db = this.state.db;
    const data = this.getAllInputs();
    const dbref = ref(this.state.db);
    const passwordStrength = this.checkPasswordStrength(data.db_password);
    if (passwordStrength === 'weak') {
      alert('Password is too weak. Please choose a stronger password.');
      return;
    }
    // Check if username already exists
    const db_username = this.getAllInputs().db_username;
    get(child(dbref, 'Customer/' + db_username)).then((snapshot) => {
      if (snapshot.exists()) {
        alert("Username exists ");
        return;
      }

      set(ref(db, 'Customer/' + data.db_username), data)
        .then(() => {
          alert('Data added successfully');
          this.setState({
            Email: '',
            db_password: '',
            db_phone: '',
            db_security_q: '',
            db_answer: '',
            db_fullname: '',
            db_dob: '',
            db_username: '',
            otherQuestion: false, // reset otherQuestion state
            db_image:''
          });
        })
        .catch((error) => {
          console.error('Error adding data: ', error);
          alert('Error adding data. Please try again later.');
        });
    });
  }



}
export default Register;
import './styles.css';
import React from 'react';
import { Navigate } from 'react-router-dom';
import startFirebase from './config/firedb';
import { set, ref, get, child } from 'firebase/database';
import image1 from './Images/image1.jpg';
import image2 from './Images/image2.jpg';
import image3 from './Images/image3.jpg';
import image4 from './Images/image4.jpg';
import image5 from './Images/image5.jpg';
import image6 from './Images/image6.jpg';
import image7 from './Images/image7.jpg';
import image8 from './Images/image8.jpg';
import image9 from './Images/image9.jpg';
import { Link } from "react-router-dom";



class Register extends React.Component {

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };


  handleSecurityQChange(event) {
    this.setState({ db_security_q_1: event.target.value });
    this.setState({ db_security_q_2: event.target.value });
    this.setState({ db_security_q_3: event.target.value });

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
      db_security_q_1: '',
      db_security_q_2: '',
      db_security_q_3: '',
      db_answer_1: '',
      db_answer_2: '',
      db_answer_3: '',
      db_fullname: '',
      db_dob: '',
      db_username: '',
      passwordStrength: '',
      otherQuestion_1: null,// new state property
      otherQuestion_2: null,
      otherQuestion_3: null,
      selectedImage: null,
      isRegistered:false

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
    const images = [
      { src: image1, alt: 'Image 1' },
      { src: image2, alt: 'Image 2' },
      { src: image3, alt: 'Image 3' },
      { src: image4, alt: 'Image 4' },
      { src: image5, alt: 'Image 5' },
      { src: image6, alt: 'Image 6' },
      { src: image7, alt: 'Image 7' },
      { src: image8, alt: 'Image 8' },
      { src: image9, alt: 'Image 9' },
    ];
    
    const { selectedImage } = this.state;

    
    if (this.state.isRegistered) {
      return (

        <Navigate to={{ pathname: '/Login' }} />


      );

    }
    return (
      <div style={{ textAlign: 'left' }} className='bc'>

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
          <input name="db_password" placeholder="Enter Password.." type="password" value={this.state.db_password} onChange={e => { this.setState({ db_password: e.target.value }); }} />
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
        <l1>Choose First Security Questions..</l1>
        <br />
        <select name="db_security_q_1" value={this.state.db_security_q_1} onChange={(e) => { this.setState({ db_security_q_1: e.target.value }) }}>
          <option value="">Please select your question</option>
          <option value="one_s_1">What is your nickname?</option>
          <option value="one_s_2">Who is your best friend?</option>
          <option value="one_s_3">Where did you meet your life partner?</option>
          <option value="one_s_4">What is your favourite toy?</option>
          <option value="one_other">Other</option> {/* new option */}
        </select>
        {this.state.db_security_q_1 === "one_other" && (
          <div>
            <div>Other Security Question</div>
            <input name="other_security_q_1" placeholder="Enter your security question.." type="text"
              value={this.state.otherQuestion_1}
              onChange={(e) => { this.setState({ otherQuestion_1: e.target.value }) }}
            />
          </div>
        )}


        <br />
        <div>
          <div>First Answer</div>
          <input name="db_answer_1" placeholder="Enter Answer.." type="text" value={this.state.db_answer_1} onChange={e => { this.setState({ db_answer_1: e.target.value }); }} />
        </div>
        <l1>Choose Second Security Questions..</l1>
        <br />
        <select name="db_security_q_2" value={this.state.db_security_q_2} onChange={(e) => { this.setState({ db_security_q_2: e.target.value }) }}>
          <option value="">Please select your question</option>
          <option value="two_s_1">What is your mother's maiden name?</option>
          <option value="two_s_2">Where do your grand parents live?</option>
          <option value="two_s_3">What is your pet's name?</option>
          <option value="two_s_4">What is your favourite animal?</option>
          <option value="two_other">Other</option> {/* new option */}
        </select>
        {this.state.db_security_q_2 === "two_other" && (
          <div>
            <div>Other Security Question</div>
            <input name="other_security_q_2" placeholder="Enter your security question.." type="text"
              value={this.state.otherQuestion_2}
              onChange={(e) => { this.setState({ otherQuestion_2: e.target.value }) }}
            />
          </div>
        )}


        <br />
        <div>
          <div>Second Answer</div>
          <input name="db_answer_2" placeholder="Enter Answer.." type="text" value={this.state.db_answer_2} onChange={e => { this.setState({ db_answer_2: e.target.value }); }} />
        </div>
        <l1>Choose Third Security Questions..</l1>
        <br />
        <select name="db_security_q_3" value={this.state.db_security_q_3} onChange={(e) => { this.setState({ db_security_q_3: e.target.value }) }}>
          <option value="">Please select your question</option>
          <option value="three_s_1">What is the best food you ever had?</option>
          <option value="three_s_2">How many countries you have travelled?</option>
          <option value="three_s_3">How many languages do you speak?</option>
          <option value="three_s_4">What is your favourite colour?</option>
          <option value="three_other">Other</option> {/* new option */}
        </select>
        {this.state.db_security_q_3 === "three_other" && (
          <div>
            <div>Other Security Question</div>
            <input name="other_security_q_3" placeholder="Enter your security question.." type="text"
              value={this.state.otherQuestion_3}
              onChange={(e) => { this.setState({ otherQuestion_3: e.target.value }) }}
            />
          </div>
        )}


        <br />
        <div>
          <div>Third Answer</div>
          <input name="db_answer_3" placeholder="Enter Answer.." type="text" value={this.state.db_answer_3} onChange={e => { this.setState({ db_answer_3: e.target.value }); }} />
        </div>
        <div>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              onClick={() => this.handleImageClick(image)}
              style={{ border: selectedImage === image ? '2px solid red' : 'none' }}
            />
          ))}
          <p>Selected Image: {selectedImage ? selectedImage.alt : 'None'}</p>
        </div>

        <button id="addBtn" className="button" onClick={this.interface}>Register</button>
        <p>
                    <Link to="/Login">Already have an account?</Link>
                </p>      </div>
    );
  }
  interface(event) {
    const id = event.target.id;
    const { selectedImage } = this.state;
    

    if (id === 'addBtn'){}
    if(!selectedImage)
    {
      alert('Select Image');
    }

    this.insertData();
  }
  getAllInputs() {
    const inputs = {
      db_email: this.state.db_email,
      db_password: this.state.db_password,
      db_phone: Number(this.state.db_phone),
      db_security_q_1: this.state.db_security_q_1,
      db_security_q_2: this.state.db_security_q_2,
      db_security_q_3: this.state.db_security_q_3,
      db_answer_1: this.state.db_answer_1,
      db_answer_2: this.state.db_answer_2,
      db_answer_3: this.state.db_answer_3,
      db_fullname: this.state.db_fullname,
      db_dob: this.state.db_dob,
      db_username: this.state.db_username,
      db_image: this.state.selectedImage.alt
    };
    if (this.state.db_security_q_1 === "one_other") {
      inputs.db_security_q_1 = this.state.otherQuestion_1;
    }
    if (this.state.db_security_q_2 === "two_other") {
      inputs.db_security_q_2 = this.state.otherQuestion_2;
    }
    if (this.state.db_security_q_3 === "three_other") {
      inputs.db_security_q_3 = this.state.otherQuestion_3;
    }
    return inputs;
  }

  insertData() {
    const db = this.state.db;
    const data = this.getAllInputs();
    const dbref = ref(this.state.db);
    const passwordStrength = this.checkPasswordStrength(data.db_password);

    if (this.state.selectedImage === null) {
      alert("Please select an image.");
      return;
    }


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
          alert('Registered Successfully');
          this.setState({ isRegistered: true })

          this.setState({
            Email: '',
            db_password: '',
            db_phone: '',
            db_security_q_1: '',
            db_security_q_2: '',
            db_security_q_3: '',
            db_answer_1: '',
            db_answer_2: '',
            db_answer_3: '',
            db_fullname: '',
            db_dob: '',
            db_username: '',
            otherQuestion: false, // reset otherQuestion state
            db_image: ''
          });
        })
        .catch((error) => {
          console.error('Error adding data: ', error);
          alert('Error . Please try again later.');
        });
    });
  }



}
export default Register;
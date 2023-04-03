import './styles.css'
import React, { createContext } from 'react';
import startFirebase from './config/firedb';
import { set, ref, get, child } from 'firebase/database';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import image1 from './Images/image1.jpg';
import image2 from './Images/image2.jpg';
import image3 from './Images/image3.jpg';
import image4 from './Images/image4.jpg';
import image5 from './Images/image5.jpg';
import image6 from './Images/image6.jpg';
import image7 from './Images/image7.jpg';
import image8 from './Images/image8.jpg';
import image9 from './Images/image9.jpg';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      db: '',
      lg_password: '',
      lg_username: '',
      isLoggedIn: false,
      first_hint: '',
      answerOne:'',
      answerTwo:'',
      answerThree:'',
      selectedImage:null
    }
    this.interface = this.interface.bind(this);



  }
  componentDidMount() {
    this.setState({
      db: startFirebase()
    });

  }
  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  getHintOne = () => {
    const dbref = ref(this.state.db);
    const lg_username = this.getAllInputs().lg_username;

    get(child(dbref, 'Customer/' + lg_username))
      .then((snapshot) => {
        if (snapshot.exists()) {

          const { db_security_q_1 } = snapshot.val();
          console.log("*****************", db_security_q_1);
          alert('db_sequirity_1: ' + db_security_q_1);
        } else {
          alert('No data found');
        }
      })
      .catch((error) => {
        alert('There was an error, details: ' + error);
      });
  };

  getHintTwo = () => {
    const dbref = ref(this.state.db);
    const lg_username = this.getAllInputs().lg_username;

    get(child(dbref, 'Customer/' + lg_username))
      .then((snapshot) => {
        if (snapshot.exists()) {

          const { db_security_q_2 } = snapshot.val();
          console.log("*****************", db_security_q_2);
          alert('db_sequirity_2: ' + db_security_q_2);
        } else {
          alert('No data found');
        }
      })
      .catch((error) => {
        alert('There was an error, details: ' + error);
      });

  };
  getHintThree = () => {
    const dbref = ref(this.state.db);
    const lg_username = this.getAllInputs().lg_username;

    get(child(dbref, 'Customer/' + lg_username))
      .then((snapshot) => {
        if (snapshot.exists()) {

          const { db_security_q_3 } = snapshot.val();
          console.log("*****************", db_security_q_3);
          alert('db_sequirity_1: ' + db_security_q_3);
        } else {
          alert('No data found');
        }
      })
      .catch((error) => {
        alert('There was an error, details: ' + error);
      });
  };



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

    if (this.state.isLoggedIn) {
      return (

       <Navigate to={{ pathname: '/Home', state: { lg_username: this.state.lg_username } }} />


      );

    }
    return (
      <html className='bc' >
      <div style={{ textAlign: 'left' }}>
        <div>
          <div>Username</div>
          <input name="lg_username" placeholder="Enter Username.." type="text" value={this.state.lg_username} onChange={e => { this.setState({ lg_username: e.target.value }); }} />
        </div>

        <div>

          <div>Password</div>
          <input name="lg_password" placeholder="Enter Password.." type="text" value={this.state.lg_password} onChange={e => { this.setState({ lg_password: e.target.value }); }} />
        </div>
        <div>
          <div>First Security Answer </div>
          <input
            name="answerOne"
            placeholder="Enter Answer.."
            type="text"
            value={this.state.answerOne}
            onChange={(e) => {
              this.setState({ answerOne: e.target.value });
            }}
          />
          <button id="hintOne" onClick={this.getHintOne}>Hint</button>

        </div>
        <div>
          <div>
            <div>Second Security Answer </div>
            <input
              name="answerTwo"
              placeholder="Enter Answer.."
              type="text"
              value={this.state.answerTwo}
              onChange={(e) => {
                this.setState({ answerTwo: e.target.value });
              }}
            />
            <button id="hintTwo" onClick={this.getHintTwo}>Hint</button>

          </div>
          <div>
            <div>
              <div>Third Security Answer </div>
              <input
                name="answerThree"
                placeholder="Enter Answer.."
                type="text"
                value={this.state.answerThree}
                onChange={(e) => {
                  this.setState({ answerThree: e.target.value });
                }}
              />
              <button id="hintThree" onClick={this.getHintThree}>Hint</button>

            </div>


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
          <button id="verifyBtn" className="button" onClick={this.interface}>Login</button>
          <br></br>
          <ll>
            <Link to="/ForgotPassword">ForgotPassword?</Link>
          </ll>

        </div>
      </div>
      </html>

    );
  }
  interface(event) {
    const id = event.target.id;
    const { selectedImage } = this.state;

    if (id == 'verifyBtn')
      this.selectData();
    const lg_username = this.getAllInputs().lg_username;
    this.setState({ lg_username });

    this.props.getUserName(lg_username)
  }

    getAllInputs() {
      const inputs = {
        lg_username: this.state.lg_username,
        lg_password: this.state.lg_password,
        answerOne : this.state.answerOne,
      answerTwo : this.state.answerTwo,
      answerThree : this.state.answerThree,
     // selectedImage: this.state.selectedImage.alt
      };
      if (this.state.selectedImage && this.state.selectedImage.alt) {
        inputs.selectedImageAlt = this.state.selectedImage.alt;
      }
      return inputs;
    }
    

  
  selectData() {
    const dbref = ref(this.state.db);
    const lg_username = this.getAllInputs().lg_username;
    const answerOne = this.getAllInputs().answerOne;
    const answerTwo = this.getAllInputs().answerTwo;
    const answerThree = this.getAllInputs().answerThree;
    const selectedImage = this.getAllInputs().selectedImage;

    get(child(dbref, 'Customer/' + lg_username)).then((snapshot) => {
      if (snapshot.exists()) {
        const { UserName, db_password , db_answer_1, db_answer_2, db_answer_3 ,db_image } = snapshot.val();
        const { lg_username, lg_password } = this.state;

        if (this.state.selectedImage === null) {
          alert("Please select an image.");
          return;
        }
    


        if ((db_password == lg_password) && (db_answer_1 == answerOne) && (db_answer_2 == answerTwo) && (db_answer_3 == answerThree) && (db_image == selectedImage) ) {
          console.log("Login successful");
          this.setState({ isLoggedIn: true });

          alert("Login successful" + lg_username);
        } else if(db_password != lg_password) {
          console.log("Invalid Username or password");
          alert("Invalid Username or password");
        }
        else if((db_answer_1  !=answerOne) || (!answerOne))
        {
          alert("Invalid Answer One")
        }
        else if((db_answer_2 !=answerTwo) || (!answerTwo))
        {
          alert("Invalid Answer Two")
        }
        else if((db_answer_3 != answerThree) || (!answerThree))
        {
          alert("Invalid Answer Three")
        }
        else if(db_image !=selectedImage)
        {
          alert("Invalid Image Selected ")

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
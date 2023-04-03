import React, { useContext } from 'react';
import startFirebase from './config/firedb';
import { ref, get, child } from 'firebase/database';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { MainContext } from './MainContext';

// Use the db_phone variable here

class Security extends React.Component {

  static contextType = MainContext;

  constructor(props) {
    super(props);

    this.state = {
      db: '',
      db_password: '',
      db_phone: '',
      isLoggedIn: false,
      isVerifiedCap: false,
      isFirst: false,
      isSecond: false,
      isFinal: false,
      db_sequrity_1:''
    };


  }


  componentDidMount() {
    this.setState({
      db: startFirebase(),
    });

  }
  getHint = () => {
    const dbref = ref(this.state.db);
    const db_phone = this.state.db_phone;

    get(child(dbref, 'Customer/' + db_phone))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { Security } = snapshot.val();
          alert('Security: ' + Security);
        } else {
          alert('No data found');
        }
      })
      .catch((error) => {
        alert('There was an error, details: ' + error);
      });
  };




  render() {
    const { data } = this.props.location.state;


    if (this.state.isFinal) {
      return (
        <Navigate
          to={{ pathname: '/Home' }}
        />
      );
    }




    return (

          <div style={{ textAlign: 'center' }}>
            <div>
              <div>Phone Number</div>
              < input
                name="db_phone"
                placeholder="Enter Phone Number.."
                type="text"
                value={this.state.db_phone}

                onChange={(e) => {
                  this.setState({ db_phone: e.target.value });
                }}
              />
              <div>
                <div>Answer </div>
                <input
                  name="answer"
                  placeholder="Enter Answer.."
                  type="text"
                  value={this.state.answer}
                  onChange={(e) => {
                    this.setState({ answer: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <button id="hint" onClick={this.getHint}>
                Hint
              </button>
            </div>
            <div>
              <button id="verifyBtn" onClick={this.selectData}>
                Verify
              </button>
            </div>
          </div>

    );
  }

  selectData = () => {
    const dbref = ref(this.state.db);
    const db_phone = this.state.db_phone;
    const answer = this.state.answer;

    get(child(dbref, 'Customer/' + db_phone))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { Phonenumber, Password, Security, Answer } = snapshot.val();
          this.setState({ isFirst: true })
          if (answer == Answer && { isVerifiedCap: true }) {
            this.setState({ isFinal: true })
          } else {
            alert("Enter correct details and do the captcha");
          }
        } else {
          alert('No data found');
        }
      })
      .catch((error) => {
        alert('There was an error, details: ' + error);
      });
  };
}

export default Security;

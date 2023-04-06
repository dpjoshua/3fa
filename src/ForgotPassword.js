import React from 'react';
import startFirebase from './config/firedb';
import { ref, get, child, update } from 'firebase/database';
import { Navigate } from 'react-router-dom';
import emailjs from 'emailjs-com'



class ForgotPassword extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      db_username: '',
      isSent: false



    }
    this.interface = this.interface.bind(this);

  }

  componentDidMount() {
    this.setState({
      db: startFirebase()
    });
  }

  sendEmail(db_email, tempPassword, db_username) {
    emailjs.send('service_uek70dg', 'template_31pp9ur', {
        to_email: db_email,
        temp_password: tempPassword, // add temporary password to email parameters
        db_username: db_username
        // add other email parameters here
    }, '1DEL9tdZVda_oTplm')
        .then((result) => {
            console.log(result.text);

        }, (error) => {
            console.log(error.text);
        });
}
  


  render() {

    if (this.state.isSent) {
      return (

        <Navigate to={{ pathname: '/Login' }} />


      );

    }



    return (

      <div style={{ textAlign: 'center' }}>
        <div>
          <div>Username</div>
          <input name="db_username" placeholder="Enter Username.." type="text" value={this.state.db_username} onChange={e => { this.setState({ db_username: e.target.value }); }} />
        </div>
        <button id="submitBtn" onClick={this.interface}>Submit</button>
      </div>



    );
  }
  interface(event) {
    const id = event.target.id;
    if (id == 'submitBtn')
      this.selectData();
    const db_username = this.getAllInputs().db_username;
    this.setState({ db_username });

  }

  getAllInputs() {
    return {
      db_username: this.state.db_username,

    }

  }
  generateTempPassword() {
    const length = 10;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?,./';
    let tempPassword = '';
    let hasNumber = false;
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;

    for (let i = 0; i < length; i++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      tempPassword += randomChar;

      if (!hasNumber && /\d/.test(randomChar)) {
        hasNumber = true;
      }

      if (!hasUpper && /[A-Z]/.test(randomChar)) {
        hasUpper = true;
      }

      if (!hasLower && /[a-z]/.test(randomChar)) {
        hasLower = true;
      }

      if (!hasSymbol && /[\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\<\>\?\,\.\/]/.test(randomChar)) {
        hasSymbol = true;
      }
    }

    if (!hasNumber || !hasUpper || !hasLower || !hasSymbol || tempPassword.length < 8) {
      // If the generated password does not meet the criteria, generate a new one recursively
      return this.generateTempPassword();
    }

    return tempPassword;
  }


  selectData() {
    const dbref = ref(this.state.db);
    const db_username = this.getAllInputs().db_username;

    get(child(dbref, 'Customer/' + db_username)).then((snapshot) => {
      if (snapshot.exists()) {
        const { db_email } = snapshot.val();
        const tempPassword = this.generateTempPassword();


        // Replace db_password with temporary password in the database
        update(child(dbref, 'Customer/' + db_username), { db_password: tempPassword }).then(() => {
          // Send email with temporary password
          const user_email = db_email;
           this.sendEmail( user_email, tempPassword, db_username);
          alert("Success");
          this.setState({ isSent: true })


        }).catch((error) => {
          alert("There was an error, details: " + error)
        });
      } else {
        alert("No data found");
      }
    }).catch((error) => {
      alert("There was an error, details: " + error)
    });
  }



}
export default ForgotPassword;

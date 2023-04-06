import { useRecoilValue } from 'recoil';
import { userData } from './state';
import startFirebase from './config/firedb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { ref, update } from 'firebase/database';


function ChangePassword() {
    const [changedPassword, setChangedPassword] = useState('');
    const userVal = useRecoilValue(userData);
    console.log('testing =====>>>', userVal)
    const [db, setDb] = useState(null);
    const userName = userVal.default?.name || '';
  const converted_user = userName.toString();


    useEffect(() => {
        setDb(startFirebase());
    }, []);

    function handleChangedPassword(e) {
        setChangedPassword(e.target.value);
    }
    function checkPasswordStrength(password) {
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
    const selectData = () => {

        if (!db) {
          console.error('Database reference is null');
          return;
        }

        const passwordStrength =checkPasswordStrength(changedPassword);
        if (passwordStrength === 'weak') {
          alert('Password is too weak. Please choose a stronger password.');
          return;
        }
      
        
        const dbref = ref(db, `Customer/${converted_user}`);
      
        update(dbref, { db_password: changedPassword })
          .then(() => {
            console.log('Password changed successfully');
            alert("Password changed successfully");
            navigate('/Login');
          })
          .catch((error) => {
            console.error('There was an error changing the password', error);
            toast.error('There was an error changing the password');
          });
      };
      const navigate = useNavigate();

    
    return (
        <div className="bc">
            <h1>Welcome </h1>
            <div>
                <div>{userVal.default?.name}</div>
            </div>
            <input
                name="changed_Password"
                placeholder="Enter Password.."
                type="text"
                value={changedPassword}
                onChange={handleChangedPassword}
            />
            <button onClick={selectData}>Change Password</button>
        </div>
    );
}

export default ChangePassword;

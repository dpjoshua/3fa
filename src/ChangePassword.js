import { useRecoilState, useRecoilValue } from 'recoil';
import { userData } from './state';


function ChangePassword(){




    const userVal = useRecoilValue(userData);
    console.log('testing =====>>>', userVal)
    const converted_user = JSON.stringify(userVal);




    return(
        <div className="bc">
            <h1>Welcome </h1>
            <div>
                <div>Username {userVal.default?.name}</div>   
            </div>
            </div>
    )

}
export default ChangePassword;

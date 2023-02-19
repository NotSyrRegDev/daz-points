import React , {useState , useEffect , useContext} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { collection , where , query , db , getDocs , increment , doc , updateDoc } from '../firebase';
import './ConfirmComponent.css';
import VerificationInput from "react-verification-input";
import { AppContext } from '../context/AppContext';



const ConfirmComponent = ( {phoneCodeSended} ) => {

  let navigate = useNavigate();

  const [error , setError ] = useState(false);
  const userLoggedIn = JSON.parse(localStorage.getItem("user"));
  

  const [userExist , setUserExist] = useState(false);
  const [userAuthArray , setUserAuthArray] = useState([]);
  const [verifyNumber , setVerifyNumber] = useState('');

  const {phoneCode} = useContext(AppContext);
  const [phoneCodeVerify ] = phoneCode;



  const incrementPoints = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      points: increment(50)
    }
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, data);
  } 

 const signInWithPhone =  async (sentCodeId ) => {
        
        
    const q = query(collection(db, "users"), where("phone_number", "==", phoneCodeSended));
 
 const querySnapshot = await getDocs(q);

 const foundedDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';

 if (foundedDataArray.length === 0) {
   setUserExist(false);
 } else {
   setUserAuthArray(foundedDataArray[0]);
   setUserExist(true);
 }


window.confirmationResult.confirm(verifyNumber).then((result) => {
 

  const user = result.user;
  if (user) {


    if (userExist === false) {
     
      navigate('/info');
    } else {

      incrementPoints();
      navigate('/points');

    }


  }

 
  // ...
}).catch((error) => {
  setError("رمز التحقق المدخل خطأ");
  setTimeout(() => {
    setError('')
  } , 2500);
  
  
});

  
 }



  return (
  
    
          
    <div className="main_dz_points">
        
        <div className="dz_content">
          <div className="text-center"> 
          <img src="/images/logo-white.png" className='logo_dz' alt="" />

<h1 className="mt-3 headline_main">نقاط سذ</h1>

<h1 className="mt-1 subheadline_main"> يرجى ادخال الرمز الخاص بك للمتابعة </h1>

          </div>


          <div className="confirms_page mt-1">

         

          <VerificationInput
          onChange={setVerifyNumber }
          autoFocus={true}
        value={verifyNumber}
          validChars='0-9'
        classNames="react_angle_input"
      />

          </div>

        
          <div className="text-center">
          {error && (
                        <>
                        <h1 className="error_headline"> {error} </h1>
                        </>
                    )}
                    
          <button id='signInWithPhone' className="btn_next" onClick={() => signInWithPhone(phoneCodeVerify) }  >دخول</button>
          {/* <Link to="/points" >
          
          <button className="mt-3 btn  btn_next">التالي</button>
          </Link> */}
        
          </div>
           
        </div>
    </div>


   
  )
}

export default ConfirmComponent
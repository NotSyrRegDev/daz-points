import React , {useState , useEffect , useContext} from 'react';
import    {auth ,signInWithPhoneNumber , RecaptchaVerifier  } from '../firebase';
import { Link , useNavigate } from 'react-router-dom';
import './Home.css';
import { AppContext } from '../context/AppContext';
import ConfirmComponent from '../components/ConfirmComponent';




export const Home = () => {

  let navigate = useNavigate();

    const {phoneCode} = useContext(AppContext);
    const {phoneNumberContext} = useContext(AppContext);

    const [phoneCodeVerify , setPhoneCodeVerify] = phoneCode;

    const [phoneNumber , setPhoneNumber] = phoneNumberContext;

    const [codeFirst , setCodeFirst] = useState('+966');

  const [verifyCode , setVerifyCode] = useState(false);
  const [nextStep , setNextStep ] = useState(false);
  const [error , setError] = useState('');
  

    useEffect(() => {
   
      
      setuprecaptcha();
    
    } , [])
  
    function setuprecaptcha (){

    
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
         
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth);
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });

  }

const sendVerivationCode = async () => {
  setVerifyCode(true);

  const phoneNumberSend = codeFirst.concat(phoneNumber);


 const appVerifier = window.recaptchaVerifier;

 signInWithPhoneNumber(auth , phoneNumberSend , appVerifier )
 .then( (confirmationResult) => {
   console.log(confirmationResult)
   window.confirmationResult = confirmationResult;
   const sentCodeId = confirmationResult.verificationId;
   
   setPhoneCodeVerify(sentCodeId);

  
  
 }).catch((error) => {
  setError("حدث خطأ في عملية التحقق يرجى المحاولة مرة اخرى");
  setTimeout(() => {
    setError('')
  } , 2500);

 })

};


const handleChange = () => {
  sendVerivationCode();

  if (error !== '' ) {
    setTimeout(() => {
      setNextStep(true);
    } , 1200);
  }

}



  return (
    <div>
           
           <div id="recaptcha-container"></div>

      {nextStep ? (
          <ConfirmComponent phoneCodeSended={codeFirst.concat(phoneNumber)} />
      ) : (
        <div className="main_dz_points">
    
    <div className="dz_content">
      <div className="text-center"> 
      <img src="/images/logo-white.png" className='logo_dz' alt="" />

<h1 className="mt-3 headline_main">نقاط سذ</h1>

<h1 className="mt-1 subheadline_main"> تفضل ادخل رقمك واحصل على نقاط للفوز معنا</h1>

 

      </div>

    
        <div className="action_form_div mt-5 ">
        <label htmlFor="phone" className="label_main text-right">رقم جوالك</label>
            <div className="inputs_div_form">
                <input id="phone" type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value) } placeholder="5xxxxxxxx"  className="input_form flex_1 mx-1" />
                <input type="text" readOnly value={"+966"} className="input_form flex_2" />
            </div>
        </div>

       
      <div className="text-center">
     
      <button onClick={() => handleChange() } className="mt-3 btn  btn_next">التالي</button>
     
    
      </div>

    
       
    </div>
</div>
      )}

        

   
    </div>
  )
}

import React , {useState , useContext} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {doc, setDoc , db } from '../firebase';
import './InformationPage.css';


const InformationPage = () => {

  const makeid = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const {phoneNumberContext} = useContext(AppContext);
const [phoneNumber ] = phoneNumberContext;

  const [name , setName] = useState('');

  const [email , setEmail ] = useState('');

  const [gender , setGender] = useState('');

  const [error , setError] = useState('');
  const [success , setSuccess] = useState('');
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();
  
  const addNewUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    if (name === ''  ) {
      setError('يرجى ادخال اسمك الكامل')
    }

  if (email === ''  ) {
        setError('يرجى ادخال ايميلك')
  }

  if (gender === ''  ) {
        setError('يرجى ادخال نوعك')
  }

  if (  name !== '' && email !== '' && gender !== ''  ) {

    setError('');

    const user = await setDoc(doc(db, "users", makeid(20)), {
        is_admin: 0,
        name: name,
        email: email,
        gender: gender,
        phone: phoneNumber,
        points: 10,

      });

      const objectUser = {
        is_admin: 0,
        name,
        email,
        gender,
        phone: phoneNumber,
        points: 10,
    }
   
        localStorage.setItem("user",JSON.stringify(objectUser));

      setSuccess(true);

      setTimeout(() => {
          setSuccess(false);
          navigate('/points');
      } , 1800)
      
  }



  }


  return (
    <div>
      
            
    <div className="main_dz_points">
        
        <div className="dz_content">
          <div className="text-center"> 
          <img src="/images/logo-white.png" className='logo_dz' alt="" />

<h1 className="mt-3 headline_main">نقاط سذ</h1>

<h1 className="mt-1 subheadline_main"> يرجى تعبئة معلوماتك الشخصية للمتابعة والحصول على النقاط </h1>

          </div>

          {error && (
                        <>
                        <h1 className="my-1 error_headline"> {error} </h1>
                        </>
                    )}

          {success && (
            <div className='popup_success_info' >
                <img src="/images/accept.png" alt="" />
            </div>
          )}

        <form  onSubmit={addNewUser} >

        
          <div className="fill_info_div text-center mt-3">

          <div className='my-2' >
          <label htmlFor="phone" className="label_main "> الاسم الكامل</label>
          <input id="phone" type="text" value={name} onChange={(e) => setName(e.target.value) }   className="input_form mx-1" />
          </div>

          <div className='my-2' >
          <label htmlFor="email" className="label_main ">  الايميل</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value) }   className="input_form mx-1" />
          </div>

          <div className='my-2' >
          <label htmlFor='gender' className="label_main ">  الجنس </label>
          <select style={{ height: '3rem' }} required 
          value={gender} onChange={(e) => {
                            const selectedGender = e.target.value;
                            setGender(selectedGender);
                          }} name="gender" id="gender" className="input_form">
            <option value="">....</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
         
          </div>

          </div>

          <div className="text-center">
          {loading ? (
                            <>
                                <img src="/images/loading-spinner.gif" className='loading_spinner' alt="" />
                            </>
                        ) : (
                            <>
                            <input className="mt-3 btn  btn_next" style={{ width: '40%' }} value="التالي" type="submit" /> 
                            </>
                        )}
                 
        
          
        
          </div>

          </form>



           
        </div>
    </div>

    </div>
  )
}

export default InformationPage
import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import './ConfirmPage.css';


const ConfirmPage = (  ) => {

  const [success , setSuccess ] = useState(false);
  const [error , setError ] = useState(false);





  return (
    <div  >
    
          
    <div className="main_dz_points">
        
        <div className="dz_content">
          <div className="text-center"> 
          <img src="/images/logo-white.png" className='logo_dz' alt="" />

<h1 className="mt-3 headline_main">نقاط سذ</h1>

<h1 className="mt-1 subheadline_main"> يرجى ادخال الرمز الخاص بك للمتابعة </h1>

          </div>


          <div className="confirms_page mt-3">

          <input type="number" className="react_angle_input" />
          <input type="number" className="react_angle_input" />
          <input type="number" className="react_angle_input" />
          <input type="number" className="react_angle_input" />

          </div>


          <div className="text-center">
          <Link to="/info" >
          <button className="mt-3 btn  btn_next">التالي</button>
          </Link>
        
          </div>
           
        </div>
    </div>


    </div>
  )
}

export default ConfirmPage
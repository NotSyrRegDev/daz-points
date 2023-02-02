import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';




export const Home = () => {

    const [phone , setPhoneNumber] = useState('');

  return (
    <div>
           
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
                      <input id="phone" type="number" value={phone} onChange={(e) => setPhoneNumber(e.target.value) }   className="input_form flex_1 mx-1" />
                      <input type="text" readOnly value={"+966"} className="input_form flex_2" />
                  </div>
              </div>
            <div className="text-center">
            <Link to="/confirm" >
            <button className="mt-3 btn  btn_next">التالي</button>
            </Link>
          
            </div>
             
          </div>
      </div>
        

   
    </div>
  )
}

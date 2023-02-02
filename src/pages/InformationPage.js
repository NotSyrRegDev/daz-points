import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import './InformationPage.css';


const InformationPage = () => {


  const [name , setName] = useState('');

  const [email , setEmail ] = useState('');

  const [gender , setGender] = useState('');

  


  return (
    <div>
      
            
    <div className="main_dz_points">
        
        <div className="dz_content">
          <div className="text-center"> 
          <img src="/images/logo-white.png" className='logo_dz' alt="" />

<h1 className="mt-3 headline_main">نقاط سذ</h1>

<h1 className="mt-1 subheadline_main"> يرجى تعبئة معلوماتك الشخصية للمتابعة والحصول على النقاط </h1>

          </div>


          <div className="fill_info_div text-center mt-3">

          <div className='my-2' >
          <label htmlFor="phone" className="label_main "> الاسم الكامل</label>
          <input id="phone" type="number" value={name} onChange={(e) => setName(e.target.value) }   className="input_form mx-1" />
          </div>

          <div className='my-2' >
          <label htmlFor="email" className="label_main ">  الايميل</label>
          <input id="email" type="number" value={email} onChange={(e) => setEmail(e.target.value) }   className="input_form mx-1" />
          </div>

          <div className='my-2' >
          <label  className="label_main ">  الجنس </label>
          <select  className="input_form" style={{ height: '3rem' }} >
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
         
          </div>

          </div>


          <div className="text-center">
          <Link to="/points" >
          <button className="mt-3 btn  btn_next">التالي</button>
          </Link>
        
          </div>
           
        </div>
    </div>

    </div>
  )
}

export default InformationPage
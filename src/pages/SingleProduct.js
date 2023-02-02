import React, {   useContext , useState , useEffect } from 'react';
import {  db , doc , setDoc} from '../firebase';
import './SingleProduct.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const SingleProduct = ( {userAssignedId , setUserAssignedId} ) => {

 

 

  const navigate = useNavigate();
  const {retrive} = useContext(AppContext);

  const [retreivealProduct  ] = retrive;



  const [totalPrice , setTotalPrice] = useState(parseInt(retreivealProduct.price));
  const [userChoosen , setUserChoose] = useState([]);
  const [notes , setNotes ] = useState('');

  const handleChange = (event , price , option) => {

    let userChooseObject = {
      "option" : option,
      "option_price": price,
    };
 

    setUserChoose(oldArray => [...oldArray, userChooseObject]);



    let checkedState = event.target.checked;
    if (checkedState) {
      setTotalPrice(totalPrice + parseInt(price))
    }
    else {
      setTotalPrice(totalPrice - parseInt(price))
    }
   
  }

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


useEffect(() => {
  setUserAssignedId( makeid(20) );
} , [])



  const addNewProduct =  async (e) => {

    e.preventDefault();
   
  

    const packages = await setDoc(doc(db, "package", makeid(20)), {

      package_name: retreivealProduct.title,
      package_price: retreivealProduct.price,
      package_total_price: totalPrice,
      user_choose: userChoosen,
      notes: notes,
      userId: userAssignedId,

    });
  

    setTimeout(() => {
     
      return navigate('/confirm');
    } , 1800  );
  }

  return (
    <div>
    <div className="section section_single_product">

      <div className="single_flex_section">
      
      <div className=" navigate_back ">
      <img src="/images/icons/arrow-right.png" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} alt="" />
      </div>  
    <form  onSubmit={addNewProduct} >
      <div className="flex_one single_product_page">
        <img src={retreivealProduct.image} alt="" className="product_img" />

        <h1 className="product_headline"> {retreivealProduct.title} </h1>

      <div className="mt-1"></div>
        <h6 className="product_price_page"> SAR {retreivealProduct.price} </h6>
        
      <div className="mt-1"></div>
        <h4 className="product_subheadline"> اضافة خدمات خاصة مع البكج </h4>

     
        <div className="body_product_card">

          {retreivealProduct.services.map(({headline , icon ,options}) => {
   
            return (
              <div className='single_choose_option' key={headline} >
            <div className="text-right">

  

         
            <h1 className='mb-1 product_subheadline  flex_center' >    <img className="icon_mid"  src={icon} /> -   { headline }    </h1>
           

          
            </div>
         
         {options.map(( {option , option_price}) => (
            <>
            <div className="flex_choose" key={option} >

            <div className="d-flex-c text-center">
          <h4 className='product_choose' >تاكيد الاختيار</h4>
          <input type="checkbox"    className='checkbox_product' onChange={(e) => handleChange(e , option_price , option)} />
          </div>

            <h6 className="product_choose"> {option} - <span className="span_darkblue">{option_price} ريال</span>  </h6>
          
          </div>

        
            </>
         ))}
       

         
        </div>
            );
          })}


        
      
        
      
        
        <div className='single_choose_option' >
        <h6 className="product_choose text-right"> 🏃 اكتب لنا اقتراحاتك لتطوير مشروعنا </h6>

          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value) } className='input_textarea_form' placeholder='أخبرنا رايك ؟' />

         
        </div>
          
        </div>
        <h1 className="mt-1 product_choose">  {totalPrice} :السعر الاجمالي بعد اضافة الخدمات  </h1>

      
        <button className="btn btn_order_package">طلب البكج</button>
      
       
      
    </div>

    </form>
         

      </div>
   

    </div>
  

    </div>
  )
}

export default SingleProduct
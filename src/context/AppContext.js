import React , {  useState, createContext } from 'react';


export const AppContext = createContext();

export const AppProvider = (props) => {


    const [phoneCodeVerify , setPhoneCodeVerify] = useState('');
    const [phoneNumber , setPhoneNumber] = useState('');


  



   
   


    return (
            <AppContext.Provider value={{ phoneCode: [ phoneCodeVerify , setPhoneCodeVerify ] ,
                phoneNumberContext: [phoneNumber , setPhoneNumber]
             }} >
                {props.children}
            </AppContext.Provider>
    )
}
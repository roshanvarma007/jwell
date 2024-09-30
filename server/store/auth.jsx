import api from "../src/Compoonents/Api";
import axios from "axios";
import { createContext, useContext, useState, useEffect, useMemo, useLayoutEffect } from "react";

export const AuthContext = createContext();


export const Authprovider = ({children}) =>{
     

   

     
     const [user,setUser] = useState()
     const [userId, setUserId] = useState();
     const [userEmail, setUserEmail] = useState("")
     const [credit,setCredit] = useState()
   

     // const navigate = useNavigate()
     const [userData,setUserData] = useState()
  useLayoutEffect(()=>{
    axios.get("http://localhost:3000/linkedin/success",{ withCredentials: true}).then((res)=>{
      setUserData(res.data)
      console.log("from user",res.data)

      if(res.data.logtype=="user already exist"){
          console.log("user exist")
          // window.open("http://localhost:3000/logout")
      }

     //  access from user database
      axios.get(`http://localhost:3000/userid/${res.data.type?.email}`).then((res)=>{
       console.log(res.data)
       setUser(res.data)
       setCredit(res.data.userData.credits)

      }).catch((err)=>{
       console.log("user id err", err)
      })
     })

  },[credit])
  
  console.log("credits", credit)


  const updateCredits = (email, minus) =>{
     console.log("user credits", user.userData.credits, minus)
     const creditss = user?.userData.credits - minus
     console.log(creditss)
     api.post("/update-credit", {email, credits: creditss}).then((res)=>{
          console.log(res.data)
          setCredit(creditss)
          console.log("from update credits", credit, creditss)
     }).catch((err)=>{
          console.log("error in while updating credits", err)
     })
 }

 

  
     return <AuthContext.Provider value={{ userData, user, updateCredits, credit}}>
            {children}
            </AuthContext.Provider>

}

export const useAuth = () =>{
     const authContextValue = useContext(AuthContext);
     if(!authContextValue){
          throw new Error("UseAuth used Outside of the provider");
     }
     return authContextValue;
}
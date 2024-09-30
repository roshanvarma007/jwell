import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useCountries } from "use-react-countries"
import Logo from "./Logo";
import { useEffect, useState } from "react";
import axios from "axios";

function Register() {

  const countries = useCountries()
  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    email: "",
    profile: "",
    country: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: ""
  })

  const submit = (e) =>{
    e.preventDefault()
    console.log(userData)
    axios.post("http://localhost:3000/register", userData).then((res)=>{
      console.log(res.data)

    

    if(res.status==200){
      navigate(`/verify-id/${userData?.email}`)
    }

  }).catch((err)=>{
    console.log("from err", err)
  })

  }

  const handlechange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
}


  


  return (
        <>
      <div className="pt-[120px]"></div>
      <div color="transparent" className="flex items-center justify-center" >

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl">
          <div className="flex justify-center items-center -ml-5">
            <Logo />
          </div>
          <Typography variant="h3" className="text-center my-5 luxuria italic">
            Register
          </Typography>

          <div className="mb-1 flex flex-col gap-6">
          <a href="http://localhost:3000/auth"><Button className="mt-6 bg-light rounded-full bg-gray-500" fullWidth>
            Login with google
          </Button></a>
          <span className="text-center -my-4 text-gray-500">or</span>
         <a href="http://localhost:3000/linkedin"><Button className="mt-2 bg-light rounded-full bg-gray-500" fullWidth>
            Login with Linkedin
          </Button></a>

            <div className="my-4 flex items-center gap-4">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  First Name
                </Typography>
                <Input
                  containerProps={{ className: "min-w-[72px]" }}
                  placeholder="first Name"
                  name="firstName"
                  value={userData?.firstName}
                   onChange={(e) => { handlechange(e) }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Last Name
                </Typography>
                <Input
                  containerProps={{ className: "min-w-[72px]" }}
                  placeholder="Last name"
                  name="lastName"
                  value={userData?.lastName}
                   onChange={(e) => { handlechange(e) }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900   bg-white shadow-lg"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your phone
            </Typography>
            <Input
              size="lg"
              placeholder="00000 00000"
              type="number"
              name="phone"
              value={userData?.phone}
               onChange={(e) => { handlechange(e) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={userData?.email}
               onChange={(e) => { handlechange(e) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              value={userData?.password}
               onChange={(e) => { handlechange(e) }}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Country
            </Typography>
            <Input
              list="browsers"
              size="lg"
              placeholder="Country"
              name="country"
              value={userData?.country}
               onChange={(e) => { handlechange(e) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <datalist id="browsers">
              {
                countries.countries.map((el)=>{
                  return(
                    <option value={el.name} key={el.name}>{el.name}</option>
                  )
                })
              }
            </datalist>


                    </div>
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center font-normal"
                        >
                          I agree the
                          <a
                            href="#"
                            className="font-medium transition-colors hover:text-gray-900"
                          >
                            &nbsp;Terms and Conditions
                          </a>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6 ac-bg" fullWidth onClick={(e)=>submit(e)}>
                      sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                      Already have an account?{" "}
                      <Link to="/login" className="font-medium text-gray-900">
                        Sign In
                      </Link>
                    </Typography>
                  </form>
                </div>
              </>
              );
  }

              export default Register
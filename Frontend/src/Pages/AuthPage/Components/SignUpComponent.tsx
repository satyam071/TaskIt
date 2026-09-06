import React, { useContext } from "react";
import { Formik } from "formik";
import Auth_photo from "../../../Image/SignUp.png";
import { AuthContext } from "../../../Context/AuthContext";
import { useDispatch } from "react-redux";
import {RegisterApi} from "../../../API/User.Auth"
import { loginFailure, loginStart, loginSuccess } from "../../../Redux/Slices/loginSlice";

interface Props {}

const SignUpComponent: React.FC<Props> = () => {
  const authContext = useContext(AuthContext)
  const dispatch = useDispatch()





  return (
    <div className="h-screen p-3 sm:p-5 md:p-8 flex items-center justify-center">
      <div className="border border-[#181818] rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl h-full bg-[#F6EEE3]">

        {/* IMAGE SIDE */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F6EEE3] flex items-center justify-center ">
          <img
            src={Auth_photo}
            alt="Auth Picture"
            className=" h-full object-contain md:object-cover rounded-2xl"
          />
        </div>

        {/* FORM SIDE */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-[#F6EEE3]">

          <h1 className="font-bowlby text-5xl sm:text-6xl md:text-7xl text-center text-[#DA2A35]">
            TaskIt
          </h1>

          <p className="font-zeyada text-lg sm:text-xl text-center text-[#181818] mt-2">
            All of your tasks at one place
          </p>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {
              const errors: {
                username?: string;
                password?: string;
              } = {};

              if (!values.username) {
                errors.username = "Required";
              }

              if (!values.password) {
                errors.password = "Required";
              }

              return errors;
            }}
            onSubmit={async(values) => {
              try {
                dispatch(loginStart())
                const response = await RegisterApi(values);
                dispatch(loginSuccess(response.user))
                console.log({
                  message:"Login Successfully",
                  response,
                })
                
              } catch (error) {
                dispatch(loginFailure())
                
              }
              

              
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-6 w-full max-w-md mx-auto"
              >

                {/* USERNAME */}
                <div className="w-full">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="border font-questrial text-[#181818] border-[#181818] rounded-lg p-3 w-full outline-none focus:ring-2 focus:ring-[#DA2A35]"
                  />

                  {errors.username && touched.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="w-full">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="border font-questrial text-[#181818] border-[#181818] rounded-lg p-3 w-full outline-none focus:ring-2 focus:ring-[#DA2A35]"
                  />

                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border font-questrial border-[#181818] rounded-lg p-3 w-full text-[#181818] cursor-pointer transition duration-200 hover:bg-[#DA2A35] hover:text-[#F6EEE3]"
                >
                  Sign Up
                </button>
                <a onClick={()=>{
                  authContext?.setAuth("login"),
                  console.log(authContext?.auth)
                }} className="text-center font-questrial cursor-pointer text-[#DA2A35]" >
                  Login Instead?


                </a>

              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
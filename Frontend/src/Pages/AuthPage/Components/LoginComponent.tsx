import React, { useContext } from "react";
import { Formik } from "formik";
import Auth_photo from "../../../Image/Auth_page_image.webp";
import { AuthContext } from "../../../Context/AuthContext";
import { useDispatch } from "react-redux";
import { LoginApi } from "../../../API/User.Auth";
import { loginFailure, loginStart, loginSuccess } from "../../../Redux/Slices/loginSlice";

interface Props { }

const LoginComponent: React.FC<Props> = () => {
  const authContext = useContext(AuthContext)
  const dispatch  = useDispatch()
  

  return (
    <div className="p-3 sm:p-4 h-screen text-white">
      <div className="border border-black rounded-3xl flex flex-col md:flex-row h-full overflow-hidden">

        {/* LEFT SIDE */}
        <div className="p-5 sm:p-6 w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center bg-[#E2DFD2]">

          <h1 className="font-questrial text-5xl sm:text-6xl md:text-7xl text-center text-[#E7B539]">
            TaskIt
          </h1>

          <p className="font-zeyada text-lg sm:text-xl text-center text-[#181818]">
            All of your tasks at one place
          </p>

          <Formik
            initialValues={{ username: "", password: "" }}
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
                const response = await LoginApi(values);
                dispatch(loginSuccess(response.user))
                console.log({
                  message: "Login Successfully",
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
                className="flex flex-col gap-4 mt-6 justify-center items-center"
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className="border font-questrial text-[#181818] border-[#181818] rounded-lg p-2 w-3/4"
                />

                {errors.username && touched.username && (
                  <p className="text-red-400">{errors.username}</p>
                )}

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="border font-questrial border-[#181818] text-[#181818] rounded-lg p-2 w-3/4"
                />

                {errors.password && touched.password && (
                  <p className="text-red-400">{errors.password}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border font-questrial border-[#181818] rounded-lg p-2 w-3/4 text-[#181818] cursor-pointer hover:bg-[#E7B539]"
                >
                  Login
                </button>
                <a onClick={() => {
                  authContext?.setAuth("Signup"),
                    console.log(authContext?.auth)
                }}
                  className="text-end font-questrial cursor-pointer text-[#DA2A35]" >
                  Sign Up Instead?


                </a>
              </form>
            )}
          </Formik>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#E2DFD2] flex items-center justify-center p-4 sm:p-6 md:p-0">
          <img
            src={Auth_photo}
            alt="Auth Picture"
            className="w-full h-full object-cover rounded-xl md:rounded-none"
          />
        </div>

      </div>
    </div>
  );
};

export default LoginComponent;
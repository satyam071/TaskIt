import React, { useContext } from "react";
import LoginComponent from "./Components/LoginComponent";
import SignUpComponent from "./Components/SignUpComponent";
import { AuthContext } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";


interface Props { }

const AuthPage: React.FC<Props> = (props) => {
  const authContext = useContext(AuthContext)
  return (
    <div className="p-4 ">
      <AnimatePresence mode="wait">
        {authContext?.auth === "login" ? (
          <motion.div
            key="login"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <LoginComponent />
          </motion.div>

        ) : (
          <motion.div
            key="signup"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ transformStyle: "preserve-3d" }}
          >

            <SignUpComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
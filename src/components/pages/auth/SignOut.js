import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });
  return <Navigate to="/" />;
};

export default SignOut;

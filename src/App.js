import { useState, useEffect } from "react";

import "./App.css";
import GlobalStyle from "./components/GlobalStyle";
import Nav from "./components/Nav";
import "./utils/firebase";
import Home from "./components/pages/HomePage";
import Login from "./components/pages/auth/LoginPage";
import Register from "./components/pages/auth/RegisterPage";
import SignOut from "./components/pages/auth/SignOut";
import Profile from "./components/pages/auth/Profile";
import DeleteProfile from "./components/pages/auth/DeleteProfile";
import AllItems from "./components/pages/content/AllItems";
import AboutUs from "./components/pages/content/AboutUs";
import UpdateProduct from "./components/pages/content/UpdateProduct";
import AddItem from "./components/pages/content/AddItem";
import ItemDetailed from "./components/pages/content/ItemDetailed";
import Contact from "./components/pages/content/Contact";
import PasswordReset from "./components/pages/auth/PasswordReset";
import ChangeEmail from "./components/pages/auth/ChangeEmail";
import DeleteItem from "./components/pages/content/DeleteItem";
import AuthorContact from "./components/pages/content/AuthorContact";
import EditItem from "./components/pages/content/EditItem";

//Router
import { Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./utils/firebase";
import { UserProvider } from "./components/context/UserContext";
import { AnimatePresence } from "framer-motion";

function App() {
  let location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, [user]);

  return (
    <main>
      <UserProvider>
        <GlobalStyle />

        <AnimatePresence>
          <Nav user={user} />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/profile" element={<Profile {...user} />} />
            <Route path="/auth/passwordReset" element={<PasswordReset />} />
            <Route path="/auth/change-email" element={<ChangeEmail />} />
            <Route path="/auth/delete-profile" element={<DeleteProfile />} />
            <Route path="/all-items" element={<AllItems />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/items/delete-item/:id" element={<DeleteItem />} />
            <Route
              path="/items/author-contact/:id"
              element={<AuthorContact {...user} />}
            />
            <Route
              path="/items/item-edit/:id"
              element={<EditItem {...user} />}
            />
            <Route path="/items/item-detailed/:id" element={<ItemDetailed />} />
            <Route path="/add-item" element={<AddItem />} />

            <Route
              path="/update-product"
              element={<UpdateProduct name="GamePlay" />}
            />
            <Route path="/auth/signOut" element={<SignOut />} />
          </Routes>
        </AnimatePresence>
      </UserProvider>
    </main>
  );
}

export default App;

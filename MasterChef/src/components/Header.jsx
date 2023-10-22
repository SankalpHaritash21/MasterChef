import React, { useState, useContext } from "react";
import Logo from "../Images/master.webp";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import cartI from "../Images/shopping-cart.png";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Title = () => {
  return (
    <a href="/">
      <img
        alt="Logo"
        src={Logo}
        className="h-[3rem] flex items-center justify-center"
      />
    </a>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { loggedInUser } = useContext(UserContext);
  const isOnline = useOnline();
  const [mobileMenu, setMobileMenu] = useState(false);

  //Subescribing to store using selector

  const cartItems = useSelector((store) => store.cart.items);
  const mobileMenuToggle = () => {
    console.log("Mobile Menu Toggled");
    setMobileMenu(!mobileMenu);
  };

  return (
    <div className="flex flex-col items-center flex-wrap p-5 justify-between z-10 shadow-lg min-w-full ">
      <div className="flex items-center justify-between w-full">
        <Title />
        <button className="md:hidden" onClick={mobileMenuToggle}>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/menu--v6.png"
            alt="menu--v6"
          />
        </button>

        {/*Window Menu*/}
        <div className="hidden md:flex items-center justify-center">
          <ul className="  md:flex py-2 pr-2 text-2xl items-center justify-center gap-x-3">
            <li className="px-2   hover:text-blue-500  hover:text-m rounded-md">
              <Link to="/home ">Home</Link>
            </li>
            <li className="px-2 hover:text-blue-500  hover:text-m rounded-md">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-2 hover:text-blue-500  hover:text-m rounded-md">
              <Link to="/About">About</Link>
            </li>
            <li className=" hover:text-blue-500   hover:text-m rounded-md w-[5.5rem] h-[1.5rem] text-black flex items-center justify-center">
              <div className="">
                <Link to="/cart">
                  <img src={cartI} alt="cart icom" className="w-5 h-5" />
                </Link>
              </div>
              <span className="w-5 h-5 flex items-center justify-center ml-2">
                ({cartItems.length})
              </span>
            </li>
          </ul>
          <div className="grid  justify-items-start">
            <ul className="status px-1 flex gap-x-2 items-center justify-center">
              <li>
                {isLoggedIn ? (
                  <button
                    className="bg-orange-400 hover:bg-orange-600 w-[5rem] text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="bg-orange-400 hover:bg-orange-600 text-white w-[5rem] font-bold py-2 px-4 rounded-full"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Logout
                  </button>
                )}
              </li>

              <li>
                <h3>{isOnline ? "✅" : "🔴"} </h3>
              </li>
              <li>{loggedInUser}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-yellow-200 flex-wrap items-center justify-center z-50  ">
        {/*Mobile Menu*/}
        {mobileMenu && (
          <div className="flex flex-col md:hidden bg-[url('https://25.media.tumblr.com/df3783f59b47c9fffbd757d702b995ec/tumblr_mjmgnnppkt1qlhq6zo1_500.gif')] bg-cover bg-center  h-[30rem] items-center justify-center w-[30rem] opacity-100 absolute -translate-x-[15rem] translate-y-[1rem]">
            <ul className=" flex flex-col mt-4 py-2 pr-2 text-2xl items-center justify-center gap-x-3 gap-y-10 font-bold">
              <li className="px-2   hover:text-blue-500 text-3xl hover:text-m rounded-md  w-[20rem] flex flex-col items-center justify-center">
                <Link to="/home " onClick={mobileMenuToggle}>
                  Home
                </Link>
              </li>
              <li className="px-2 hover:text-blue-500 text-3xl  hover:text-m rounded-md w-[20rem] flex flex-col items-center justify-center">
                <Link to="/contact" onClick={mobileMenuToggle}>
                  Contact
                </Link>
              </li>
              <li className="px-2 hover:text-blue-500  hover:text-m text-3xl rounded-md w-[20rem] flex flex-col items-center justify-center">
                <Link to="/About" onClick={mobileMenuToggle}>
                  About
                </Link>
              </li>
              <li
                className=" hover:text-blue-500    hover:text-m rounded-md  text-3xl h-[1.5rem] text-black  w-[20rem] flex items-center justify-center"
                onClick={mobileMenuToggle}
              >
                <div className="">
                  <Link to="/cart">
                    <img
                      src={cartI}
                      alt="cart icom"
                      className="w-8 h-8 md:w-5 md:h-5"
                    />
                  </Link>
                </div>
                <span className="w-5 h-5 flex items-center justify-center ml-2">
                  ({cartItems.length})
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;

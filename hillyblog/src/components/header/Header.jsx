import React from "react";
import { Logo,Logoutbutton,  } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
       
    },

    {
      name: "all post",
      slug: "/all-post",
      active: authStatus
    },

    {
      name: "add post",
      slug: "/add-post",
      active: authStatus

      
    },
  ];
  return (
    <header className="p-3 shadow bg-slate-500">

      
        <nav className="flex w-full ">
          <div className="mr-4 ">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto ">
            {navItems.map((item) =>
              item.active ? (
                <li  key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-6 duration-200 hover:bg-blue-100"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
             {authStatus && ( 
                <li>
                    <Logoutbutton/>
                </li>
            )}
          </ul>
        </nav>
        
      
        
    </header>
  )
}

export default Header;

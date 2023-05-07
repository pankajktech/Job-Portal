import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserContext } from "../Context/userContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("https://job-portal-app-kzk0.onrender.com/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const Logout = async () => {
    try {
      setUser(null);
      const response = await fetch(
        "https://job-portal-app-kzk0.onrender.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const id = user?.id;
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-around text-blue-gray-900">
          <Link to={"/"}>
            <img src={Logo} alt="" className="w-44" />
          </Link>
          <div className="flex items-center gap-4">
            {id && (
              <>
                <Link to={"/addjob"}>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    Add JOB
                  </Button>
                </Link>

                <Menu className="hidden lg:inline-block">
                  <MenuHandler className="hidden lg:inline-block">
                    <Button
                      variant="text"
                      size="sm"
                      className="p-2 rounded-full hover:bg-gray-300"
                    >
                      <UserCircleIcon className="h-8 w-8" />
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem onClick={Logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}

            {!id && (
              <>
                <Link to={"/login"}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button
                    variant="outlined"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav} className="">
          <hr />
          {id && (
            <>
              <Link to={"/register"}>
                <Button
                  variant="outlined"
                  size="sm"
                  fullWidth
                  className="my-10"
                >
                  <span>Add Job</span>
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button
                  variant="outlined"
                  size="sm"
                  fullWidth
                  className="my-5"
                  onClick={Logout}
                >
                  <span>Logout</span>
                </Button>
              </Link>
            </>
          )}

          {!id && (
            <>
              <Link to={"/register"}>
                <Button
                  variant="gradient"
                  size="sm"
                  fullWidth
                  className="my-10"
                >
                  <span>Register</span>
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button variant="gradient" size="sm" fullWidth className="my-5">
                  <span>Login</span>
                </Button>
              </Link>
            </>
          )}
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;

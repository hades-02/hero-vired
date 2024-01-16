import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import DropdownMenu from "../Dropdown/Dropdown";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/myPrograms",
    display: "Dashboard",
  },
  {
    path: "/addProgram",
    display: "Add Program",
  },
];

const Header = () => {
  const { token } = useContext(authContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        {token !== "" && (
          <div className="flex items-center justify-between">
            <button className="border-solid my-auto bg-transparent font-[400] text-white rounded-md text-[30px] hidden md:block">
              &#9776; {/* Unicode for three horizontal lines */}
            </button>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu flex items-center gap-[2.7rem]">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "sm:text-black md:text-white text-[20px] leading-7 font-[600]"
                          : "sm:text-black md:text-white text-[20px] leading-7 font-[100]"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center my-auto gap-4">
              <DropdownMenu />
            </div>
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-8 h-8 text-white cursor-pointer" />
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

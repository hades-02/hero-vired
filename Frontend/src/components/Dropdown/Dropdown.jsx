import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        className="bg-transparent text-white text-sm px-2 py-1 hover:bg-white hover:text-black focus:outline-none border border-white rounded-md"
        onClick={toggleDropdown}
      >
        {`Admin | ${formattedTime} `}&#9662;
      </button>

      {isOpen && (
        <div className="w-[200px] absolute bg-white border rounded shadow-lg right-0">
          <div>
            <button
              className="w-full px-4 text-black hover:bg-[#1D2B53] hover:text-white"
              onClick={() => {
                setIsOpen(false);
                navigate("/changePassword");
              }}
            >
              Change Password
            </button>
            <button
              className="w-full px-4 text-black hover:bg-[#1D2B53] hover:text-white"
              onClick={() => {
                setIsOpen(false);
                dispatch({ type: "LOGOUT" });
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

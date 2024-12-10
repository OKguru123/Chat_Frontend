import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogOut = ({ setOpenDialog, isLogoutshow, setToken, setUserInfo }) => {
  //   const handleMouseLeave = () => {
  //     setIsLogoutShow(false);
  //   };
  const Logoutuser = () => {
    localStorage.clear();
    setToken("");
    setUserInfo(null);
    toast.success(`User Logout successfully `);

    setOpenDialog(true);
  };
  console.log("is logout show value", isLogoutshow);
  return (
    <div>
      <div
        style={{
          left: isLogoutshow ? "0px" : "-600px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          marginTop: "0px",
          width: "50%",
          height: "50px",
          transition: "300ms",

          zIndex: "1000",
        }}
        //   onMouseLeave={handleMouseLeave}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FF5722",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={Logoutuser}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogOut;

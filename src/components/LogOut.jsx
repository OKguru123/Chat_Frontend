import { useEffect } from "react";
import { toast } from "react-toastify";

const LogOut = ({
  setOpenDialog,
  isLogoutshow,
  setToken,
  setUserInfo,
  ismobil,
}) => {
  
  const Logoutuser = () => {
    localStorage.clear();
    setToken("");
    setUserInfo(null);
    toast.success(`User Logout successfully `);

    setOpenDialog(true);
  };

  useEffect(() => {
    console.log(ismobil);
  }, [ismobil]);
  console.log("is logout show value", isLogoutshow);
  return (
    <div
      style={{
        left: isLogoutshow ? "0px" : "-600px",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginTop: "0px",
        // width: "50%",

        height: "50px",
        transition: "300ms",
        // backgroundColor: "red",

        zIndex: "1000",
      }}
      
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
          marginLeft: ismobil ? "500px" : "100px",
        }}
        onClick={Logoutuser}
      >
        Logout
      </button>
    </div>
  );
};

export default LogOut;

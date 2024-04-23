import React, { useEffect,useContext, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import Style from "./NavBar.module.css";
//import { imageOptimizer } from 'next/dist/server/image-optimizer';
import { Model, Error } from "../index";
import { ChatAppContect } from '../../Context/ChatAppContext';
import images from "../../assets";
import { ST } from 'next/dist/shared/lib/utils';

const CreateAccount = () => {
  
  const menuItems = [
    // {
    //   menu:"All Users",
    //   link: "/alluser",
    // },
    {
      menu:"Chat",
      link: "/",
    },
    // {
    //   menu:"Contact ",
    //   link: "/",
    // },
    // {
    //   menu:"Settings",
    //   link: "/",
    // },
    // {
    //   menu:" FAQS",
    //   link: "/",
    // },
    // {
    //   menu:"Terms of use",
    //   link: "/",
    // }
  ];
  
  //USESTATE
  const[active,setActive] = useState(2);
  const[open,setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false); // Add this if you intend to use 'openModel'
  
  const { account, userName, connectWallet, createAccount, error,Logout } = useContext(ChatAppContect);
  const handleLogout = () => {
    Logout();
    }
    
  return (
<div>
    {/* //CONNECT WALLET */}
            <div className={Style.NavBar_box_right_connect} style={{marginLeft:"30px;"}}>
              { account == "" ? (
                <div onClick={()=> connectWallet()}>
                  {""}<span>Connect</span>
                </div>
              ) : (
                <button style={{backgroundColor:"#3a3b3c",width:"max-content",marginLeft:"30px;"}} onClick={()=> setOpenModel(true)}>
                  {""}
                  <Image
                    src={userName ? images.accountName : images.create2}
                    alt="account Image"
                    width={20}
                    height={20}
                    />
                    {""}
                    <small>{userName || "Sign In "}</small>
                </button>
              )}
          {userName ? (
            <small>
    <button style={{backgroundColor:"#3a3b3c",width:"max-content",marginLeft:"10px"}} onClick={handleLogout}>Logout</button>
  </small>
) : (
  <span></span>
)}

            <div className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}>
              <Image src={images.open} alt="open" width={30} height={30}/>
              </div>

          </div>

        {/* MODEL COMPONENT */}

        {openModel && (
          <div className={Style.modelBox}>
            <Model openBox={setOpenModel}
              title="WELCOME TO"
              head="D-CS System"
              info='Volunter in our project.'
              smalInfo="Heartful Congratualtionss ."
              image={images.hero}
              functionName={createAccount}
              address={account}
            />
          </div>
        )}
        {error== "" ? "" : <Error error={error} />}
       </div>

  );
};

export default CreateAccount;


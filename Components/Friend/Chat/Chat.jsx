import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Style from './Chat.module.css';
import images from '../../../assets';
import { useContext } from "react";
import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";
import AddFriend from "../../AddFriend/AddFriend";
import CreateAccount from "../../CreateAccount/CreateAccount";
import { ChatAppContect } from '../../../Context/ChatAppContext';

const Chat = ({ functionName, readMessage, friendMsg, account, userName, Loading, currentUserName, currentUserAddresss }) => {
  const { deleteMessages } = useContext(ChatAppContect);
  const [message, setMessage] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track index of hovered message
  const router = useRouter();
  const { name, address } = router.query;

  const handleDelete = async (friendAddress, index) => {
    try {
      console.log("Deleted")
      await deleteMessages(friendAddress, index);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // Reset hovered index when leaving message
  };

  return (
    
    <div className={Style.ChatSystem}>
      <div className={Style.ChatSystem_Header}>
        <div className={Style.UserLogo}>
          <Image src={images.accountName} alt="image" className={Style.ImageAccount} />
        </div>
        <div className={Style.UserName} style={{color:"hotpink"}}>
          {name}
        </div>
        <div className={Style.AddFriend} style={{ color: '#F18303',marginRight:'20px' }}>
          <AddFriend />
        </div>
        <div className={Style.CreateAccount} style={{ marginLeft: '60px' }}>
          <CreateAccount />
        </div>
      </div>
      <div className={Style.Chat}>
        {currentUserName && currentUserAddresss ? (
          <div className={Style.Chat_user_info}>
            <Image src={images.accountName} alt="image" width={70} height={70} />
            <div className={Style.Chat_user_info_box}>
              <h4>{currentUserName}</h4>
              <p className={Style.show}>{currentUserAddresss}</p>
            </div>
          </div>
        ) : ("")}
        <div className={Style.Chat_box_box}>
          <div className={Style.Chat_box}>
            <div className={Style.Chat_box_left}>
              {friendMsg.map((eL, i) => (
                <div>
                  {eL.sender === address ? (
                    <div className={Style.Chat_box_left_title}>
                      <span className={Style.UserNameq}>{name}</span>
                    </div>
                  ) : (
                    <div className={Style.Chat_box_left_title}>
                      <span className={Style.UserNameq}>
                        {/* {userName} sent a message: */}
                      </span>
                    </div>
                  )}
                   <div className={eL.sender === address ?  Style.Chat_Message_Hold1: Style.Chat_Message_Hold_User }>
                    {eL.msg === "" ? (
                    <span></span>
                    ) : (
                      <div
                        className={Style.Chat_Message_Hold10}
                        onMouseEnter={() => handleMouseEnter(i)} 
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className={eL.sender === address ?  Style.Chat_Message_Hold: Style.Chat_Message_Hold_Msg}>
                        <p className={Style.Chat_box_color} key={i + 1}>
                          {eL.msg} 
                        </p>
                        </div>
                        <span style={{color:"white",fontSize:"10px"}}>{converTime(eL.timestamp).toString()}</span>
                        {hoveredIndex === i && ( 
                          <div className={Style.Chat_Message_Delete}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16" height="16" fill="currentColor"
                              className="bi bi-trash3-fill" viewBox="0 0 16 16"
                              onClick={() => handleDelete(address, eL.hindex)}
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {name && address ? (
            <div className={Style.Chat_box_send}>
              <div className={Style.Chat_box_send_image}>
                <input
                  type='text'
                  placeholder="Enter your message here"
                  onChange={(e) => setMessage(e.target.value)}
                  className={Style.Chat_msg_boxes}
                />
                {Loading ? (
                  <Loader />
                ) : (
                  <Image
                    src={images.send}
                    alt='file'
                    width={30}
                    height={30}
                    style={{ marginLeft: '5px', marginTop: '5px' }}
                    onClick={() => {
                      if (message.trim() === '') {
                        alert('Please enter a message');
                      } else {
                        functionName({ msg: message, address: address });
                        setMessage('');
                      }
                    }}
                  />
                )}
              </div>
            </div>
          ) : ("")}
        </div>
      </div>
    </div>
  );
};

export default Chat;

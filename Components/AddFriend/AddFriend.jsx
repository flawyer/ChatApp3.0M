import React, {useState, useContext} from "react";
import Image from "next/image";

import Style from './Filter.module.css';
import images from '../../assets';
import {ChatAppContect} from '../../Context/ChatAppContext';
import {Model} from '../index';

const AddFriend = () => {
  const {account, addFriends}=useContext(ChatAppContect);
  const [addFriend, setAddFriend]= useState(false);
  console.log("Account")
  return (
    // <div className={Style.Filter}>
    //   <div className={Style.Filter_box}>
    //     <div className={Style.Filter_box_left}>
    //       <div className={Style.Filter_box_left_search}>
    //         <Image src={images.search} alt="image" width={20} height={20} />
    //         <input type="text" placeholder="search.."/>
    //       </div>
    //     </div>
    //     <div className={Style.Filter_box_right}>
    //       <button>
    //         <Image src={images.clear} alt="clear"
    //         width={20} height={20} />
    //         CLEAR CHAT
    //       </button>

   

    //     </div>
    //   </div>

    // {/*//Model component*/}
   
    // </div><>
  <>
           <div onClick={()=> setAddFriend(true)} className="chatButton">
           <svg onClick={()=> setAddFriend(true)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
</svg>
          </div>
          {addFriend && (
      <div className={Style.Filter_model}>
        <Model
        openBox={setAddFriend} 
        title="WELCOME TO"
        head="D-CS"
        info="hello"
        smallInfo="Select Your Friend's Name & Address"
      image={images.hero}
      functionName={addFriends}
        />
      </div>
    )}
  </>
    );
};

export default AddFriend;

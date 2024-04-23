import React, {useState, useContext} from "react";
import Image from "next/image";

//INTERNAL IMPORT 
import Style from './Model.module.css';
import images from '../../assets';
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";

const Model = ({
  openBox, address, title, head, info, smallInfo, image, functionName
    }) => {
       console.log("Model");
      //USE STATE
      const [name, setName] = useState('');
      const [accountAddress, setAccountAddress] = useState("");
    
      const {loading} = useContext(ChatAppContect);
      console.log("Model");
return (
  <div className={Style.Model}>
    <div className={Style.Model_box}>
    <div className={Style.Model_box_left}>
        {/* <Image src={image} alt="BUDDY" width={700} height={700}/> */}
        </div> 
      <div className={Style.Model_box_right}>
        <h1>
          {title} <span>{head}</span>
        </h1>
        {/* <p>{info}</p> */}
        <small>{smallInfo}</small>

        {
          loading == true ? (
            <Loader/>
          ) : (
          <div className={Style.Model_box_right_name}>
          <div className={Style.Model_box_right_name_info}>
            {/* <Image src={images.username} alt="user" width={30} height={30} /> */}
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={Style.Model_box_right_name_info}>
            {/* <Image src={images.account} alt="user" width={30} height={30} /> */}
            <input
              type="text"
              placeholder={address || "Enter address.."}
              onChange={(e) => setAccountAddress(e.target.value)}
            />
          </div>
          <div className={Style.Model_box_right_name_btn}>
            <button
              onClick={() => functionName({ name, accountAddress })}>
                {""}
                {/* <Image src={images.send} alt="send" width={30} height={30}/> */}
                {""}
                Submit
              </button>
              <button
              onClick={() => openBox(false)}>
                {""}
                {/* <Image src={images.close} alt="close" width={30} height={30}/> */}
                {""}
                Cancel
              </button>
              
          </div>
          </div>
          )
        }

      </div>
    </div>
  </div>
  );
};

export default Model;

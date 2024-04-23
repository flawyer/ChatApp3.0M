import React from "react";
import  Link from "next/link"; // Assuming you're using React Router
import image from "../../../assets";
import Style from "./Card.module.css";
import Image from "next/image";
const Card = ({ readMessage, el, i, readUser }) => {
  console.log(el);
 console.log("Helllo")
  const handleClick = () => {
    readMessage(el.pubkey);
    readUser(el.pubkey);
  };
  return (
    <Link href={{ pathname: '/', query: { name: `${el.name}`, address: `${el.pubkey}` } }}>
    <div onClick={handleClick}>
      <div className={Style.Card}>

        <div className={Style.Card_box}>

          <div className={Style.Card_box_left}>

           <Image src={image.accountName} alt={el.name} width={50} height={50} className={Style.Card_box_left_img} /> 
          </div>

          <div className={Style.Card_box_right}>

            <div className={Style.Card_box_right_middle} style={{color:"hotpink"}}>
              <h4>{el.name}</h4>
              <small>{el.pubkey.slice(21)}..</small>
            </div>


             <div className={Style.Card_box_right_end}>
              {/* <small>{i + 1} </small> */}
            </div>

          </div>
        </div>

      </div>
    </div>
    </Link>
  );
};

export default Card;

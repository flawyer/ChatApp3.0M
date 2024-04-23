import React,{useState, useContext} from "react";
import Image from "next/image";

import style from './Friend.module.css';
import images from '../../assets';
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

import {ChatAppContect} from "../../Context/ChatAppContext";
import Link from "next/link";

const Friend = () => {
  const {sendMessage, account, friendLists, readMessage, userName, loading,
  currentUserName, currentUserAddress, readUser, friendMsg } = useContext(ChatAppContect)
  console.log(friendLists);
  console.log("FriendList");
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter friendLists based on searchQuery
  const filteredFriendLists = friendLists.filter(friend => {
    return friend.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
 
  return ( 
  <div className={style.GridChat}>
      <div className={style.Friend_box_left}>
        <div className={style.Friend_box_left_header}>
          <div className={style.FriendChatHeader}>Chats</div>
          <div className={style.FrindChatHeader1}>
            <div className={style.HeaderItem}>
          
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
</svg>

            </div>
            <Link href="/alluser">
            <div className={style.HeaderItem1}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>
            </div>
            </Link>
            </div>     
          </div>
          <div  className={style.SearchItem}>
          <div className={style.spanSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></div>
          <input type="text" placeholder="Search Messenger" className={style.SearchButton} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <div className={style.Inbox1}>
            <div className={style.Inbox}>Inbox</div>
                      </div>
                      {filteredFriendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el} i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
      <div className={style.Friend_box_right}>
       <Chat functionName={sendMessage}
        readMessage={readMessage}
        friendMsg={friendMsg}
        account={account}
        userName={userName}
        loading={loading}
        currentUserName={currentUserName}
        currentUserAddress={currentUserAddress}
        /> 
      </div>
      
  </div>
  )
};

export default Friend;

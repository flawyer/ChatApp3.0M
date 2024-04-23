import { ChatAppContext } from "../Context/ChatAppContext";
import React, { useEffect,useState, useContext } from 'react';

import {Filter, Friend} from "../Components/index";
import { BrowserRouter } from 'react-router-dom';
const ChatApp = () => {
 // const { } = useContext(ChatAppContext);

  return (
    <div>
      <style>
        {`
          html,body {
            height:100%;
            margin: 0;
            background-color: #292F3F
          }
        `}
      </style>
      
      <Filter />
      <Friend />

    </div>
  );
};

export default ChatApp;

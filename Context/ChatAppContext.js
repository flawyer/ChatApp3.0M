import { checkIfWalletIsConnected, connectWallet, connectingWithContract } from '../Utils/apiFeature';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
 
export const ChatAppContect = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setloading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // Chat user data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");
  const router = useRouter();
 const fetchDataq = async () => {
  try{  
  const contract = await connectingWithContract();
  const userList = await contract.getAllAppUser();
  setUserLists(userList);
  console.log("hello");
  return userList; }
  catch(error){
    console.log(error);
  }
 
}

// Call it within an async function
const fetchDataWrapper = async () => {
  console.log(await fetchDataq());
}

// Call fetchDataWrapper
fetchDataWrapper();

 // Fetch data on page load
  const fetchData = async () => {
    try {

      // Get contract
      const contract = await connectingWithContract();
      // Get account
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // Get username
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);
      
     // Get friend list
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      // Get all app user list
  
      
    } catch (error) {
      //setError('Please Install and Connect Your Wallet');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Read message
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError('No Message Found');
    }
  };
// Delete Message
const deleteMessages = async (friendAddress, index) => {
  try {
    const contract = await connectingWithContract();
    await contract.deleteMessage(friendAddress, index);
    // Assuming you want to refresh messages after deletion
    readMessage(friendAddress);
  } catch (error) {
    console.log(error);
  }
};
  // Create Account
  const createAccount = async ({ name, accountAddress }) => {
    try {
      //if (name || accountAddress) {
        //setError('Name and Account Address are required');
       // return;
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setloading(true);
      await getCreatedUser.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Add Friend
  const addFriends = async ({name, accountAddress}) => {
    try {
      //if (name || accountAddress) {
       // setError('Name and Account Address are required');
        //return;
        console.log("here");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setloading(true);
      await addMyFriend.wait();
      setloading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
//Logout ko lagi 
const Logout = async () => {
setUserName("");
setFriendLists([]);
setFriendMsg([]); 
setUserLists([]); 
setError(""); 
setCurrentUserName(""); 
setCurrentUserAddress(""); 
router.push("/");
}
  // Send Message
  const sendMessage = async ({msg, address}) => {
    try {
      /*if (msg || address) {
        setError('Message is required');
        return;
      }*/
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
    
      setloading(true);
      await addMessage.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Read User
  const readUser = async (userAddress) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      setError('No Message Found');
    }
  };

  return (
    <ChatAppContect.Provider
      value={{  
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletIsConnected,
        deleteMessages,
        Logout,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress
      }}
    >
      {children}
    </ChatAppContect.Provider>
  );
};
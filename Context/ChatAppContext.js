import { checkIfWalletIsConnected, connectWallet, connectingWithContract } from '../Utils/apiFeature';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [freindLists, setFreindLists] = useState([]);
  const [freindMsg, setFreindMsg] = useState([]);
  const [loading, setloading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState('');

  // Chat user data
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserAddress, setCurrentUserAddress] = useState('');
  const router = useRouter();

  // Fetch data on page load
  const fetchData = async () => {
    try {
      // Get contract
      const contract = await connectingWithContract();
      // Get account
      const connectAccount = await checkIfWalletIsConnected();
      setAccount(connectAccount);
      // Get username
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);
      // Get friend list
      const friendList = await contract.getMyFriendList(connectAccount);
      setFreindLists(friendList);
      // Get all app user list
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (err) {
      setError('Please Install and Connect Your Wallet');
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
      setFreindMsg(read);
    } catch (err) {
      setError('No Message Found');
    }
  };

  // Create Account
  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress) {
        setError('Name and Account Address are required');
        return;
      }
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setloading(true);
      await getCreatedUser.wait();
      setloading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Add Friend
  const addFriends = async (name, accountAddress) => {
    try {
      if (!name || !accountAddress) {
        setError('Name and Account Address are required');
        return;
      }
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setloading(true);
      await addMyFriend.wait();
      setloading(false);
      router.push('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Send Message
  const sendMessage = async (msg, address) => {
    try {
      if (!msg || !address) {
        setError('Message is required');
        return;
      }
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setloading(true);
      await addMessage.wait();
      setloading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Read User
  const readUser = async (userAddress) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (err) {
      setError('No Message Found');
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletIsConnected,
        account,
        userName,
        freindLists,
        freindMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

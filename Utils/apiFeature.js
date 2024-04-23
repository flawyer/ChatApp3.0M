import {ethers} from "ethers";
import Web3Modal from "web3modal";
import { chatAppAddress,chatAppABI } from "../Context/constants";

export const checkIfWalletIsConnected = async () => {
 try{
    if(!window.ethereum){
        return console.log("Make sure you have metamask!");
    }
 const accounts = await window.ethereum.request({ 
    method: "eth_accounts", });
 const firstAccount = accounts[0];
 return firstAccount;
 }
 catch(error){
     console.log(error);
 }
}
export const connectWallet = async () => {
    try{
        if(!window.ethereum){
            return console.log("Make sure you have metamask!");
        }
     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
     const firstAccount = accounts[0];
     return firstAccount;
     }
     catch(error){
         console.log(error);
     }
 }
 const fetchContract =(signerOrProvider)=>
    new ethers.Contract(chatAppAddress, chatAppABI,signerOrProvider);
    
export const connectingWithContract = async () => {
try{
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
}
catch(error){
    console.log(error);
}
}
export const converTime = (time) => {
    const date = new Date(time * 1000);

    // Get the individual components of the date
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
    const day = ('0' + date.getDate()).slice(-2);
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Return the formatted date and time
    return `${year}-${month}-${day} ${hours}:${minutes}${ampm}`;
}

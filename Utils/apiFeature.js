import {ethers} from "ethers";
import Web3Modal from "web3modal";
import { chatAppAddress,chatAppABI } from "../Context/constants";
export const checkIfWalletIsConnected = async () => {
 try{
    if(!window.ethereum){
        return console.log("Make sure you have metamask!");
    }
 const accounts = await window.ethereum.request({ method: "eth_accounts" });
 const firstAccount = accounts[0];
 return firstAccount;
 }
 catch(err){
     console.log(err);
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
     catch(err){
         console.log(err);
     }
 }
 const fetchContract =(signOrProvider)=>{
    new ethers.Contract(chatAppABI,chatAppAddress,signOrProvider);
 }
export const connectingWithContract = async () => {
try{
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
}
catch(err){
    console.log(err);
}
}
export const converTime =(time)=>{
    const newTime = new Date(time.toNumber());
    const realTime = newTime.getHours()+":"+newTime.getMinutes()+":"+newTime.getSeconds()+"Date:"+newTime.getDate()+"Month:"+(newTime.getMonth()+1)+"Year:"+newTime.getFullYear();
    return realTime;
}
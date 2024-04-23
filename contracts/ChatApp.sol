
pragma solidity ^0.8.17;

contract ChatApp{
    struct user{
        string name;
        friend[] friendList;
    }
    
    struct friend{
        address pubkey;
        string name;
    }
    struct message{
        address sender;
        uint256 timestamp;
        uint256 hindex;
        string msg;
    }
    struct AllUserStruct{
        //add all user information here
        string name;
        address accountAddress;
    }
   AllUserStruct[]  getAllUser;
    mapping(address=> user) userList;
    mapping(bytes32 => message[]) allMessages;
   //Check User Exist
    function checkUserExists(address pubkey) public view returns(bool){
       return bytes(userList[pubkey].name).length > 0;
   }
   //Create Account
   function createAccount(string calldata name) external{
       require(checkUserExists(msg.sender)==false,"User Already Exists");
       require(bytes(name).length > 0,"Name Cannot be Empty");
       userList[msg.sender].name=name;
       getAllUser.push(AllUserStruct(name,msg.sender));
   }
   //get UserName
   function getUserName(address pubkey) external view returns(string memory){
       require(checkUserExists(pubkey),"User Does Not Exists");
       return userList[pubkey].name;
   }
  //Add friend
  function addFriend(address friend_key,string calldata name) external{
    require(checkUserExists(msg.sender),"Create an account first");
    require(checkUserExists(friend_key),"User is not registered!");
    require(msg.sender!=friend_key,"Users cannot add themselves as a friend");
    require(checkAlreadyFriends(msg.sender,friend_key)==false,"User is already a friend");
   _addFriend(msg.sender,friend_key,name);
   _addFriend(friend_key,msg.sender,userList[msg.sender].name);
  }
  //check Already Friends
  function checkAlreadyFriends(address pubkey1,address pubkey2) internal view returns(bool){
      if(userList[pubkey1].friendList.length>userList[pubkey2].friendList.length){
              address temp=pubkey1;
              pubkey1=pubkey2;
               pubkey2=temp;  
      }
      for(uint256 i=0;i<userList[pubkey1].friendList.length;i++){
          if(userList[pubkey1].friendList[i].pubkey==pubkey2){
              return true;
          }
      } 
        return false;
  }
  //Add friend
  function _addFriend(address me,address friend_key,string memory name) internal{
      friend memory newFriend=friend(friend_key,name);
      userList[me].friendList.push(newFriend);
  }
  //get friend list
  function getMyFriendList() external view returns(friend[] memory){
      return userList[msg.sender].friendList;
  }
   //get chat code
   function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
       if(pubkey1<pubkey2){
           return keccak256(abi.encodePacked(pubkey1,pubkey2));
       }
       else return keccak256(abi.encodePacked(pubkey2,pubkey1));
   }
   //send message
   function sendMessage(address friend_key,string calldata _msg) external{
       require(checkUserExists(msg.sender),"Create an account first");
       require(checkUserExists(friend_key),"User is not registered!");
       require(checkAlreadyFriends(msg.sender,friend_key),"User is not a friend");
      
       bytes32 chatCode=_getChatCode(msg.sender,friend_key);
       uint256 hindex = allMessages[chatCode].length;
       message memory newMessage=  message(msg.sender,block.timestamp,hindex,_msg);
       allMessages[chatCode].push(newMessage);
   }
   //Delete ko lagi
   function deleteMessage(address friend_key, uint256 index) external {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        require(index < allMessages[chatCode].length, "Invalid message index");

        // Delete the selected message
        delete allMessages[chatCode][index];
    }

   //read message
    function readMessage(address friend_key) external view returns(message[] memory){
        //  require(checkUserExists(msg.sender),"Create an account first");
        //  require(checkUserExists(friend_key),"User is not registered!");
        //  require(checkAlreadyFriends(msg.sender,friend_key),"User is not a friend");
         bytes32 chatCode=_getChatCode(msg.sender,friend_key);
         return allMessages[chatCode];
    }
 
    //fetch all user
     function getAllAppUser() public view returns(AllUserStruct[] memory){
        return getAllUser;
     }


}
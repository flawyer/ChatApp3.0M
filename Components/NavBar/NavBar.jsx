import Link from 'next/link';
import { useContext, useState } from 'react';
import { ChatAppContext } from '../../Context/ChatAppContext';
function Navigation() {
  const { account, userName, connectWallet } = useContext(ChatAppContext);
  const [openModel, setOpenModel] = useState(false); // Add this if you intend to use 'openModel'
  return (
    <nav>
      
      <Link href="/">Home</Link><br/>
      <Link href="/about">About</Link>
      <div>
              {account ? (
                <button onClick={connectWallet}>
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <button onClick={() => setOpenModel(true)}>
                  <span>{userName}Flawyer</span>
                </button>
              )}
            </div>
            <div>  <button onClick={connectWallet}>
                  <span>Connect Wallet</span>
                </button></div>
    </nav>
  );
}

export default Navigation;


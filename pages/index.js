import { ChatAppContext } from '../Context/ChatAppContext';
import { useContext } from 'react';

const ChatApp = () => {
  const { title } = useContext(ChatAppContext);

  return (
    <div>
      {title}
    </div>
  );
};

export default ChatApp;

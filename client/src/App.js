import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat.js'
// eslint-disable-next-line
const socket = io.connect('http://localhost:3001');

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (name !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ?
        (<div className="joinChatContainer">
          <h3>Join A Room</h3>
          <input type="text" placeholder='Enter your name' onChange={(e) => {
            setName(e.target.value);
          }} />
          <input type="text" placeholder='Enter the room ID' onChange={(e) => {
            setRoom(e.target.value);
          }} />
          <button onClick={joinRoom}>JOIN</button>
        </div>)
        :
        (<Chat socket={socket} name={name} room={room} />)
      }
    </div>
  );
}

export default App;

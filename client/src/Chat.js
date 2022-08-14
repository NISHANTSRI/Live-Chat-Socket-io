import React from 'react'
import { useState } from 'react'


function Chat({ socket, name, room }) {

    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds(),
            };

            await socket.emit('send_message', messageData);
        }
    }

    return (
        <div>
            <div className="chat-header">
                <p> Live Chat </p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input type='text' placeholder='Hey!'
                    onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
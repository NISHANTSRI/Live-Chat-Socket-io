import React from 'react'
import { useState, useEffect } from 'react'


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

    // this use effect hook was created because after we have received the messsage from our own what we want to do is to let ohet also send and recieve our mesaage ,,, so what we did is we crete anoter socket event receive message in the use effect hook and gave it the data that was recieved in the index.js vis the send_message event to asychrunosly.
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
        })
    }, [socket])


    return (
        <div className='chat-window'>
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
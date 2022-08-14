import React from 'react'
import { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'


function Chat({ socket, name, room }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds(),
            };

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    // this use effect hook was created because after we have received the messsage from our own what we want to do is to let ohet also send and recieve our mesaage ,,, so what we did is we crete anoter socket event receive message in the use effect hook and gave it the data that was recieved in the index.js vis the send_message event to asychrunosly.
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])


    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p> Live Chat </p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent) => {
                        return <div className="message" id={name === messageContent.author ? 'you' : 'other'}>
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id='time'>{messageContent.time}</p>
                                    <p id='author'>{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type='text' placeholder='Hey!'
                    value={currentMessage}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}

                    onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
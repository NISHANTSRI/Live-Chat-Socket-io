import React from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";

function Chat({ socket, name, room }) {
    return (
        <div>
            <div className="chat-header">
                <p> Live Chat </p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input type='text' placeholder='Hey!' />
                <button><FaArrowAltCircleRight /></button>
            </div>
        </div>
    )
}

export default Chat
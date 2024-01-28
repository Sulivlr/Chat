import React, { useEffect, useState } from 'react';
import { Message } from "../../types";

const Message: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessages, setLastMessages] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState('User');

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://146.185.154.90:8000/messages?datetime=${lastMessages}`);
            const newMessages: Message[] = await response.json();
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            if (newMessages.length > 0) {
                const lastMessage = newMessages[newMessages.length - 1];
                setLastMessages(lastMessage.datetime);
            }
        } catch (error) {
            console.error('Error fetching messages');
        }
    };

    const sendMessage = async () => {
        const url = 'http://146.185.154.90:8000/messages';

        const data = new URLSearchParams();
        data.set('message', newMessage);
        data.set('author', author);

        try {
            const response = await fetch(url, {
                method: 'post',
                body: data,
            });

            const sentMessage: Message = await response.json();
            setMessages((prevMessages) => [...prevMessages, sentMessage]);
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message');
        }
    };

    return (
        <>
            <div>
                <h1>Chat</h1>
            </div>
            <div>
                {messages.map((message) => (
                    <div key={message._id}>
                        <p>{message.author}</p>
                        <p>{message.datetime}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <input type="text"
                   value={author}
                   onChange={(e) => setAuthor(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </>
    );
};

export default Message;

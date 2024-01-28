import React, {useEffect, useState} from 'react';
import {Message} from "../../types";

const Message: React.FC = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessages, setLastMessages] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages()
        },2000);
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://146.185.154.90:8000/messages?datetime=${lastMessages}`);
            const newMessages: Message[] = await response.json()
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            if (newMessages.length > 0) {
                const lastMessage = newMessages[newMessages.length -1];
                setLastMessages(lastMessage.datetime)
            }
        } catch (error) {
            console.error('error message');
        }
    }

    return (

    );
};

export default Message;
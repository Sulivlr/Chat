import React, {useEffect, useState} from 'react';
import {Message} from "../../types";

const Message: React.FC = () => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {

        },2000);

        return () => clearInterval(interval);

    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('');
            const newMessages = Message[] = await response.json()
        }
    }

    return (

    );
};

export default Message;
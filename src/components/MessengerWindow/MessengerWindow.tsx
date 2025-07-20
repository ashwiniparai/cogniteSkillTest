import React, { useState } from 'react';
import { Box } from '@mui/material';
import Users from '../Users/Users';
import ChatWindow from '../ChatWindow/ChatWindow';
const userList = ['Akshay', 'Anwita', 'Veera', 'Bhoomika'];


const MessengerWindow: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>('Akshay');
    const [messages, setMessages] = useState<Record<string, { text: string; sender: 'me' | 'other'; timestamp: string }[]>>({
        Akshay: [{ text: 'Hello!', sender: 'other', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { text: 'Hi Akshay!', sender: 'me', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],

        Anwita: [],
        Veera: [],
        Bhoomika: []
    });


    const handleSendMessage = (text: string) => {
        if (!selectedUser) return;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => ({
            ...prev,
            [selectedUser]: [...prev[selectedUser], { text, sender: 'me', timestamp }]
        }));
        setTimeout(() => {
            setMessages(prev => ({
                ...prev,
                [selectedUser]: [...prev[selectedUser], { text: 'Auto-reply to: ' + text, sender: 'other', timestamp }]
            }));
        }, 1200);
    };

    return (
        <Box display="flex" height="95vh" >
            <Users userList={userList} selectedUser={selectedUser} onUserChange={setSelectedUser} />
            {selectedUser && (
                <ChatWindow
                    user={selectedUser}
                    messages={messages[selectedUser]}
                    onSend={handleSendMessage}
                />
            )}
        </Box>
    );
};

export default MessengerWindow;
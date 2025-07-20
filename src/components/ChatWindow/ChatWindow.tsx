import React, { useState } from 'react';
import {
    Box, Paper, TextField, IconButton, Typography, CircularProgress, Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
}

interface ChatWindowProps {
    user: string;
    messages: Message[];
    onSend: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, messages, onSend }) => {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput('');
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1200);
        }
    };

    return (
        <Box flexGrow={1} display="flex" flexDirection="column" sx={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #ccc', m: 1, height: '100%' }}>
            <Box bgcolor="#e3f2fd" p={1} borderRadius={1} height={'3rem'} display={'flex'}>
                <Avatar>{user[0]}</Avatar>
                <Box pl={1}>
                    <Typography variant="h6">{user}</Typography>
                    <Typography variant="caption" color="text.secondary">Last seen just now</Typography></Box>
            </Box>
            <Box sx={{ background: '#f7f7f7', height: '100%' }}>
                <Box sx={{ flexGrow: 1, mb: 2, p: 2, overflowY: 'auto', borderRadius: 2, height: '34.5rem' }}>
                    {
                        messages.map((msg, i) => (
                            <Box key={i} display="flex" justifyContent={msg.sender === 'me' ? 'flex-end' : 'flex-start'} mb={1} >
                                <Box
                                    sx={{
                                        bgcolor: msg.sender === 'me' ? '#1976d2' : '#e3f2fd',
                                        color: msg.sender === 'me' ? 'white' : 'black',
                                        px: 2, py: 1, borderRadius: 3, maxWidth: '60%'
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                    <Typography variant="caption" display="block" align={msg.sender === 'me' ? 'right' : 'left'}>
                                        {msg.timestamp}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    }
                    {isTyping && (
                        <Box display="flex" alignItems="center" mt={1}>
                            <CircularProgress size={18} sx={{ mr: 1 }} />
                            <Typography variant="caption">User is typing...</Typography>
                        </Box>
                    )}
                </Box>
                <Box display="flex" gap={1} p={1} pb={0}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        InputProps={{
                            style: { borderRadius: '20px', background: "white" }, endAdornment: (
                                <IconButton color="primary" onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            )
                        }}
                        placeholder="Type a message"
                        variant="outlined"
                    />

                </Box>
            </Box >
        </Box >
    );
};

export default ChatWindow;
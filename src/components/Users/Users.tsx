import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Avatar, Typography, Grid, ListItemAvatar, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../common/Header/Header';

interface UsersProps {
    userList: string[];
    selectedUser: string | null;
    onUserChange: (user: string) => void;
}
const Users: React.FC<UsersProps> = ({ userList, selectedUser, onUserChange }) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredUsers = userList.filter(user =>
        user.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (

        <Box bgcolor="#ffffff" boxShadow={1} height={'100vh'} width="40vh">
            <Header />
            <hr style={{ margin: '0 16px' }} />
            <Grid size={{ xs: 4, md: 3 }}>
                <TextField
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search users...'
                    InputProps={{
                        style: {
                            borderRadius: "20px",
                            color:'#1976d2'
                        },
                        startAdornment: ( // Use startAdornment for icon on the left
                            <InputAdornment position="start">
                                <IconButton edge="start" sx={{ color: '#1976d2' }}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ m: 2, mb: 2, mr: 3, ml: 3, borderRadius: '40px' }} // Adjust width as needed
                />
                <List>
                    {filteredUsers.map(user => (
                        <ListItemButton
                            component="li"
                            selected={user === selectedUser}
                            onClick={() => onUserChange(user)}
                        >
                            <ListItemAvatar><Avatar>{user[0]}</Avatar></ListItemAvatar>
                            <ListItemText primary={user} secondary="Online" />
                        </ListItemButton>
                    ))}
                </List>
            </Grid>
        </Box>
    )
};

export default Users;
import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const Header: React.FC = () => (
    <Toolbar>
        <MessageIcon sx={{ mr: 2, height: "2.5rem", width: "2.5rem" ,mt:1, color: '#1976d2'}} />
        <Typography variant="h5" >
            Messenger          </Typography>
    </Toolbar>
);

export default Header;
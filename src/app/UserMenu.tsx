import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { signOutEndpoint } from './backend';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from './authContext';

const useStyles = makeStyles({
    userDetails: {
        borderBottom: '1px solid rgb(224, 224, 224)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '8px',
        '& > *': {
            marginBottom: '8px',
        },
    },
});

export function UserMenu() {
    const { user, onSignOut } = useAuthContext();

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        signOutEndpoint();
        onSignOut();
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar>
                    <Icon>person</Icon>
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Box className={classes.userDetails}>
                    <Avatar>
                        <Icon>person</Icon>
                    </Avatar>
                    <div>{user.name}</div>
                    <small>{user.email}</small>
                </Box>
                <MenuItem onClick={signOut}>Sair</MenuItem>
            </Menu>
        </>
    );
}

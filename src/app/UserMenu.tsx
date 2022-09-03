import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { IUser, signOutEndpoint } from './backend';
import { makeStyles } from '@material-ui/core/styles';

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
        }
    }
});

interface IUserMenuProps {
    onSignOut: () => void;
    user: IUser;
}

export function UserMenu(props: IUserMenuProps) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const signOut = () => {
        signOutEndpoint();
        props.onSignOut();
    }

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
                    <div>{props.user.name}</div>
                    <small>{props.user.email}</small>
                </Box>
                <MenuItem onClick={signOut}>Sair</MenuItem>
            </Menu>
        </>
    );
}

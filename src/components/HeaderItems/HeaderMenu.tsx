'use client';
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { IUserBase } from '@/services/auth';

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: session } = useSession();
  const initials = useMemo(() => {
    if (!session?.user) return '';
    const user = session.user as IUserBase;
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }, [session]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };
  return (
    <>
      <Tooltip title="Menu">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            className="avatar-icon"
            sx={{ width: 32, height: 32 }}
          >
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 150,
            '& .MuiAvatar-root': {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            '& .MuiButtonBase-root': {
              color: '#212121',
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Divider className="text-xs">Shop</Divider>
        <MenuItem
          dense
          onClick={handleClose}
        >
          <Typography>Orders</Typography>
        </MenuItem>
        <MenuItem
          dense
          onClick={handleClose}
        >
          <Typography>Products</Typography>
        </MenuItem>
        <Divider className="text-xs">Account</Divider>
        <MenuItem
          dense
          onClick={handleClose}
        >
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem
          dense
          onClick={handleSignOut}
        >
          <Typography>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

'use client';

import React from 'react';
import { AiOutlineAppstoreAdd, AiOutlineClose } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

function AddProductButton() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="outlined"
				className="bg-primary text-light hover:bg-primary/90"
				startIcon={<AiOutlineAppstoreAdd size={18} />}
				onClick={handleClickOpen}
			>
				New
			</Button>
			<BootstrapDialog
				fullWidth
				maxWidth="xl"
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle
					sx={{ m: 0, p: 2 }}
					id="customized-dialog-title"
					className="flex justify-between"
				>
					<span>Add Product</span>
					<IconButton onClick={handleClose}>
						<AiOutlineClose size={18} />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
						ac consectetur ac, vestibulum at eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
						Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
						auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
						cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
						dui. Donec ullamcorper nulla non metus auctor fringilla.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						className="bg-light text-primary"
						variant="outlined"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						autoFocus
						className="bg-primary text-light hover:bg-primary/90"
						variant="outlined"
						onClick={handleClose}
					>
						Save
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</>
	);
}

export default AddProductButton;

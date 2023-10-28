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
				startIcon={<AiOutlineAppstoreAdd size={18} />}
				onClick={handleClickOpen}
			>
				New
			</Button>
			<BootstrapDialog
				fullWidth
				maxWidth="xl"
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
				<DialogContent dividers></DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						autoFocus
						variant="contained"
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

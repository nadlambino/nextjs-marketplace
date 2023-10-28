'use client';

import React from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Button from '@mui/material/Button';
import ProductFormModal from './ProductFormModal';

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
				variant="contained"
				className="bg-primary"
				startIcon={<AiOutlineAppstoreAdd size={18} />}
				onClick={handleClickOpen}
			>
				New
			</Button>
			<ProductFormModal
				isOpen={open}
				handleClose={handleClose}
			/>
		</>
	);
}

export default AddProductButton;

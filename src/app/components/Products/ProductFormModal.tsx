import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
	Autocomplete,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

type PropTypes = {
	isOpen: boolean;
	handleClose: () => void;
};

function ProductFormModal({ isOpen, handleClose }: PropTypes) {
	const categories = [
		'Electronics',
		'Clothing',
		'Home & Kitchen',
		'Books',
		'Toys',
		'Sports & Outdoors',
		'Beauty & Personal Care',
		'Health & Wellness',
		'Automotive',
		'Jewelry',
		'Furniture',
		'Garden & Outdoor',
		'Office Products',
		'Food & Grocery',
	];

	return (
		<BootstrapDialog
			fullWidth
			maxWidth="sm"
			aria-labelledby="Add Product"
			open={isOpen}
		>
			<DialogTitle
				sx={{ m: 0, p: 2 }}
				id="Add Product"
				className="flex justify-between"
			>
				<span>Add Product</span>
				<IconButton onClick={handleClose}>
					<AiOutlineClose size={18} />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<form>
					<div className="section flex flex-col gap-5">
						<Typography
							variant="subtitle2"
							className="text-gray-500 uppercase tracking-widest font-semibold -mb-3"
						>
							Details
						</Typography>
						<FormControl fullWidth>
							<TextField
								label="Name"
								variant="outlined"
								size="small"
								fullWidth
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								label="Description"
								variant="outlined"
								size="small"
								fullWidth
								multiline
								rows={4}
							/>
						</FormControl>
						<FormControl fullWidth>
							<Autocomplete
								multiple
								id="tags-standard"
								freeSolo
								options={categories}
								getOptionLabel={(option) => option}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Categories"
										variant="outlined"
										size="small"
									/>
								)}
							/>
						</FormControl>
						<FormControl
							fullWidth
							size="small"
						>
							<InputLabel id="Product Condition">Condition</InputLabel>
							<Select
								labelId="Product Condition"
								label="Condition"
							>
								<MenuItem value={0}>Brand New</MenuItem>
								<MenuItem value={1}>Slightly Used</MenuItem>
								<MenuItem value={2}>Old</MenuItem>
							</Select>
						</FormControl>
					</div>
				</form>
			</DialogContent>
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
	);
}

export default ProductFormModal;

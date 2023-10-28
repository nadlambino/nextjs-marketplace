'use client';

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Button,
	Autocomplete,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Container,
	Grid,
	FormHelperText,
	OutlinedInput,
	InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useStepper from '@/app/hooks/stepper';

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
	const {
		StepperComponent,
		activeStep,
		isLastStep,
		handleBack,
		handleComplete,
		handleReset,
	} = useStepper(['Details', 'Specifications', 'Pricing']);

	const handleModalClose = () => {
		handleClose();
		handleReset();
	};

	return (
		<BootstrapDialog
			fullWidth
			maxWidth="md"
			aria-labelledby="Add Product"
			open={isOpen}
			PaperProps={{ sx: { height: '560px' } }}
		>
			<DialogTitle
				sx={{ m: 0, p: 2 }}
				id="Add Product"
				className="flex justify-between"
			>
				<span>Add Product</span>
				<IconButton onClick={handleModalClose}>
					<AiOutlineClose size={18} />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<form className="flex gap-5 flex-col">
					{StepperComponent}
					<Container
						className="flex flex-col gap-5 p-0"
						style={{ display: activeStep === 0 ? 'flex' : 'none' }}
					>
						<div className="flex gap-2">
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
									label="SKU"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</FormControl>
						</div>
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
						<div className="flex gap-2">
							<FormControl fullWidth>
								<TextField
									label="Brand"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									label="Model"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</FormControl>
						</div>
						<div className="flex gap-2">
							<FormControl fullWidth>
								<TextField
									label="Manufacturer"
									variant="outlined"
									size="small"
									fullWidth
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
					</Container>
					<Container
						className="flex flex-col gap-5 p-0"
						style={{ display: activeStep === 1 ? 'flex' : 'none' }}
					>
						<div className="flex gap-2">
							<FormControl
								variant="outlined"
								size="small"
								fullWidth
							>
								<InputLabel htmlFor="input-weight">Weight</InputLabel>
								<OutlinedInput
									type="number"
									id="input-weight"
									label="Weight"
									endAdornment={
										<InputAdornment position="end">kg</InputAdornment>
									}
									aria-describedby="outlined-weight-helper-text"
									inputProps={{
										'aria-label': 'weight',
									}}
								/>
							</FormControl>
							<FormControl
								variant="outlined"
								size="small"
								fullWidth
							>
								<InputLabel htmlFor="input-dimension">
									Dimension (width x height)
								</InputLabel>
								<OutlinedInput
									id="input-dimension"
									label="Dimension (width x height)"
									endAdornment={
										<InputAdornment position="end">in</InputAdornment>
									}
									aria-describedby="outlined-dimension-helper-text"
									inputProps={{
										'aria-label': 'dimension',
									}}
								/>
							</FormControl>
						</div>
						<div className="flex gap-2">
							<FormControl fullWidth>
								<TextField
									fullWidth
									label="Color"
									size="small"
									variant="outlined"
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									fullWidth
									label="Material"
									size="small"
									variant="outlined"
								/>
							</FormControl>
						</div>
						<FormControl fullWidth>
							<TextField
								label="Other Specifications"
								variant="outlined"
								size="small"
								fullWidth
								multiline
								rows={4}
							/>
						</FormControl>
					</Container>
					<Container
						className="flex flex-col gap-5 p-0"
						style={{ display: activeStep === 2 ? 'flex' : 'none' }}
					>
						<div className="flex gap-2">
							<FormControl
								variant="outlined"
								size="small"
								fullWidth
							>
								<InputLabel htmlFor="input-weight">Price</InputLabel>
								<OutlinedInput
									type="number"
									id="input-price"
									label="Price"
									startAdornment={
										<InputAdornment position="start">₱</InputAdornment>
									}
									aria-describedby="outlined-price-helper-text"
									inputProps={{
										'aria-label': 'price',
									}}
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									type="number"
									label="Quantity"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</FormControl>
						</div>
					</Container>
				</form>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={handleModalClose}
					className="w-24"
				>
					Cancel
				</Button>

				{activeStep > 0 && (
					<Button
						variant="outlined"
						onClick={handleBack}
						className="w-24"
					>
						Back
					</Button>
				)}
				{isLastStep ? (
					<Button
						autoFocus
						type="submit"
						role="create-product-button"
						variant="contained"
						color="primary"
						className="bg-primary w-24"
						onClick={handleClose}
					>
						Save
					</Button>
				) : (
					<Button
						autoFocus
						type="submit"
						role="create-product-button"
						variant="contained"
						color="primary"
						className="bg-primary w-24"
						onClick={handleComplete}
					>
						Next
					</Button>
				)}
			</DialogActions>
		</BootstrapDialog>
	);
}

export default ProductFormModal;

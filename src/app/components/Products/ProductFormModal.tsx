'use client';

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Autocomplete,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Container,
	OutlinedInput,
	InputAdornment,
	Chip,
	FormControlLabel,
	Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useStepper from '@/app/hooks/stepper';
import { Controller, useForm } from 'react-hook-form';
import { Product, ProductSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';

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

const stepFields = [
	[
		'name',
		'sku',
		'description',
		'brand',
		'model',
		'manufacturer',
		'condition',
		'categories',
	],
	['weight', 'dimension', 'color', 'material', 'specs'],
	['price', 'quantity', 'deliverable', 'pickupable'],
];

function ProductFormModal({ isOpen, handleClose }: PropTypes) {
	const {
		StepperComponent,
		activeStep,
		isLastStep,
		handleBack,
		handleComplete,
		handleReset,
	} = useStepper(['Details', 'Specifications', 'Preferences']);
	const {
		control,
		register,
		handleSubmit,
		reset,
		clearErrors,
		setValue,
		getValues,
		formState: { errors, isDirty },
	} = useForm<Product>({
		resolver: zodResolver(ProductSchema),
	});
	const [deliverable, setDeliverable] = React.useState(false);
	const [pickupable, setPickupable] = React.useState(false);
	const {mutate, isLoading} = useMutation({
		mutationFn: async (data: Product) => {
			return await fetch('/api/products', {
				method: 'POST',
				headers: {
					contentType: 'application/json'
				},
				body: JSON.stringify(data)
			})
		}
	})

	React.useEffect(() => {
		console.log(errors);
		handleNextStep();
	}, [errors, isDirty]);

	const handleNextStep = () => {
		const errorFields = new Set(Object.keys(errors));
		const fields = stepFields[activeStep];
		if (errorFields.size === 0 || fields === undefined) return;

		const hasFormError = !fields?.some((field) => errorFields.has(field));
		if (isDirty && hasFormError) {
			handleComplete();
			clearErrors();
		}
	};

	const onSubmit = (data: Product) => {
		if (!isLastStep) {
			handleComplete();
			return;
		}

		mutate(data);
	};

	const handleModalClose = () => {
		handleClose();
		handleReset();
		reset();
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
			<form
				method="post"
				className="contents"
				onSubmit={handleSubmit(onSubmit)}
			>
				<DialogContent dividers>
					{StepperComponent}
					<Container
						className="flex flex-col gap-5 p-0 mt-5"
						style={{ display: activeStep === 0 ? 'flex' : 'none' }}
					>
						<div className="flex gap-2">
							<FormControl fullWidth>
								<TextField
									{...register('name')}
									type="text"
									label="Name"
									variant="outlined"
									size="small"
									fullWidth
									error={errors?.name?.message !== undefined}
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									{...register('sku')}
									type="text"
									label="SKU"
									variant="outlined"
									size="small"
									fullWidth
									error={errors?.sku?.message !== undefined}
								/>
							</FormControl>
						</div>
						<FormControl fullWidth>
							<TextField
								{...register('description')}
								type="text"
								label="Description"
								variant="outlined"
								size="small"
								fullWidth
								multiline
								rows={4}
								error={errors?.description?.message !== undefined}
							/>
						</FormControl>
						<div className="flex gap-2">
							<FormControl fullWidth>
								<TextField
									{...register('brand')}
									type="text"
									label="Brand"
									variant="outlined"
									size="small"
									fullWidth
									error={errors?.brand?.message !== undefined}
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									{...register('model')}
									type="text"
									label="Model"
									variant="outlined"
									size="small"
									fullWidth
									error={errors?.model?.message !== undefined}
								/>
							</FormControl>
						</div>
						<div className="flex gap-2">
							<FormControl fullWidth>
								<TextField
									{...register('manufacturer')}
									type="text"
									label="Manufacturer"
									variant="outlined"
									size="small"
									fullWidth
									error={errors?.manufacturer?.message !== undefined}
								/>
							</FormControl>
							<FormControl
								fullWidth
								size="small"
							>
								<InputLabel id="Product Condition">Condition</InputLabel>
								<Select
									{...register('condition')}
									labelId="Product Condition"
									label="Condition"
									defaultValue=""
									error={errors?.condition?.message !== undefined}
								>
									<MenuItem value="new">New</MenuItem>
									<MenuItem value="used">Used</MenuItem>
									<MenuItem value="old">Old</MenuItem>
								</Select>
							</FormControl>
						</div>
						<FormControl fullWidth>
							<Controller
								control={control}
								name="categories"
								render={({ field: { onChange } }) => (
									<Autocomplete
										multiple
										id="tags-standard"
										freeSolo
										options={categories}
										onChange={(_, values) => onChange(values)}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li
													{...props}
													key={option}
												>
													{option}
												</li>
											);
										}}
										renderTags={(tagValue, getTagProps) => {
											return tagValue.map((option, index) => (
												<Chip
													{...getTagProps({ index })}
													key={option}
													label={option}
												/>
											));
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												error={errors?.categories?.message !== undefined}
												type="text"
												label="Categories"
												variant="outlined"
												size="small"
												onChange={onChange}
											/>
										)}
									/>
								)}
							/>
						</FormControl>
					</Container>
					<Container
						className="flex flex-col gap-5 p-0 mt-5"
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
									{...register('weight')}
									error={errors?.weight?.message !== undefined}
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
									{...register('dimension')}
									error={errors?.dimension?.message !== undefined}
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
									{...register('color')}
									error={errors?.color?.message !== undefined}
									type="text"
									fullWidth
									label="Color"
									size="small"
									variant="outlined"
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									{...register('material')}
									error={errors?.material?.message !== undefined}
									type="text"
									fullWidth
									label="Material"
									size="small"
									variant="outlined"
								/>
							</FormControl>
						</div>
						<FormControl fullWidth>
							<TextField
								{...register('specs')}
								error={errors?.specs?.message !== undefined}
								type="text"
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
						className="flex flex-col gap-5 p-0 mt-5"
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
									{...register('price', {
										valueAsNumber: true,
									})}
									error={errors?.price?.message !== undefined}
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
									{...register('quantity', {
										valueAsNumber: true,
									})}
									error={errors?.quantity?.message !== undefined}
									type="number"
									label="Quantity"
									variant="outlined"
									size="small"
									fullWidth
								/>
							</FormControl>
						</div>
						<div className="flex gap-2">
							<FormControl fullWidth>
								<FormControlLabel
									className="flex justify-between ml-2"
									{...register('deliverable')}
									control={<Switch color="primary" />}
									label="Available for Delivery"
									labelPlacement="start"
								/>
							</FormControl>
							<FormControl fullWidth>
								<FormControlLabel
									className="flex justify-between ml-2"
									control={<Switch 
										color="primary" 
										{...register('pickupable')}
										value={pickupable}
										onChange={(e) => {
											setPickupable(!pickupable)
											setValue('pickupable', !pickupable)
										}}
										/>
									}
									label="Available for Pickup"
									labelPlacement="start"
								/>
							</FormControl>
						</div>
						{pickupable && (
							<>
								<TextField
									{...register('pickupLocation.establishment')}
									error={errors?.pickupable?.message !== undefined}
									type="text"
									label="Establishment"
									variant="outlined"
									size="small"
									fullWidth
								/>
								<TextField
									{...register('pickupLocation.building')}
									error={errors?.pickupable?.message !== undefined}
									type="text"
									label="Building"
									variant="outlined"
									size="small"
									fullWidth
								/>
								<TextField
									{...register('pickupLocation.address')}
									error={errors?.pickupable?.message !== undefined}
									type="text"
									label="Exact Address"
									variant="outlined"
									size="small"
									fullWidth
									multiline
									rows={4}
								/>
							</>
						)}
					</Container>
				</DialogContent>
				<DialogActions>
					<Button
						type="button"
						variant="outlined"
						onClick={handleModalClose}
						className="w-24"
					>
						Cancel
					</Button>

					{activeStep > 0 && (
						<Button
							type="button"
							variant="outlined"
							onClick={handleBack}
							className="w-24"
						>
							Back
						</Button>
					)}
					{isLastStep ? (
						<Button
							key="save"
							type="submit"
							role="create-product-button"
							variant="contained"
							color="primary"
							className="bg-primary w-24"
						>
							Save
						</Button>
					) : (
						<Button
							key="next"
							type="submit"
							role="create-product-button"
							variant="contained"
							color="primary"
							className="bg-primary w-24"
						>
							Next
						</Button>
					)}
				</DialogActions>
			</form>
		</BootstrapDialog>
	);
}

export default ProductFormModal;

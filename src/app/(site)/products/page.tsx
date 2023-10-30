import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddProductButton from '@/app/components/Products/AddProductButton';
import { Box, Chip, ChipPropsColorOverrides, TableContainer } from '@mui/material';
import { Product } from '@/types';
import { getProducts } from '@/services/products';
import { OverridableTypeMap } from '@mui/material/OverridableComponent';

const conditionClassMap = {
	new: 'success',
	used: 'warning',
	old: 'error'
} as const

export default async function Products() {
	const products: Product[] = await getProducts();
	
	return (
		<Box className="flex flex-col gap-4 h-full w-full overflow-hidden">
			<Box className="flex justify-end">
				<AddProductButton />
			</Box>
			<TableContainer sx={{ maxHeight: '100%' }}>
				<Table
					stickyHeader
					aria-label="sticky table"
				>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Condition</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Estimated Sale</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow
								hover
								key={product._id}
							>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>
									{product.categories.map(category =>(
										<Chip size="small" label={category} />
									))}
								</TableCell>
								<TableCell>
									<Chip 
										size="small" 
										label={product.condition} 
										color={conditionClassMap[product.condition]} 
										className="uppercase" 
									/>
								</TableCell>
								<TableCell>{product.quantity.toLocaleString('en-US', {
									minimumFractionDigits: 0,
								})}</TableCell>
								<TableCell>₱ {product.price.toLocaleString('en-US', {
									minimumFractionDigits: 2,
								})}</TableCell>
								<TableCell>₱ {(product.price * product.quantity).toLocaleString('en-US', {
									minimumFractionDigits: 2,
								})}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

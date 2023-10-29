import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddProductButton from '@/app/components/Products/AddProductButton';
import { Box, TableContainer } from '@mui/material';

type Condition = 'new' | 'used';

type Variants = {
	colors: string[];
	sizes: string[];
};

type Shipping = {
	delivery: boolean;
	pickUp: boolean;
};

type Item = {
	_id: string;
	sellerId: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	thumbnail: string;
	gallery: string[];
	category: string;
	tags: string[];
	condition: Condition;
	variants: Variants;
	shipping: Shipping;
	pickupAddress: string;
};

// Example array of objects
const items: Item[] = [
	{
		_id: 'item-1',
		sellerId: 'seller-1',
		name: 'Laptop',
		description: 'High-performance laptop with the latest specs.',
		price: 1299.99,
		quantity: 15,
		thumbnail: 'laptop-thumbnail-url',
		gallery: ['laptop-gallery-url-1', 'laptop-gallery-url-2'],
		category: 'Electronics',
		tags: ['laptop', 'computer', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['silver', 'black'],
			sizes: ['13-inch', '15-inch'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '123 Main Street, City',
	},
	{
		_id: 'item-2',
		sellerId: 'seller-2',
		name: 'Smartphone',
		description: 'Latest smartphone with advanced features.',
		price: 899.99,
		quantity: 20,
		thumbnail: 'smartphone-thumbnail-url',
		gallery: ['smartphone-gallery-url-1', 'smartphone-gallery-url-2'],
		category: 'Electronics',
		tags: ['smartphone', 'phone', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['black', 'blue', 'white'],
			sizes: ['64GB', '128GB', '256GB'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '456 Elm Street, Town',
	},
	{
		_id: 'item-3',
		sellerId: 'seller-3',
		name: 'Graphic T-Shirt',
		description: 'Cool graphic t-shirt for casual wear.',
		price: 24.99,
		quantity: 30,
		thumbnail: 'tshirt-thumbnail-url',
		gallery: ['tshirt-gallery-url-1', 'tshirt-gallery-url-2'],
		category: 'Clothing',
		tags: ['tshirt', 'clothing', 'fashion'],
		condition: 'new',
		variants: {
			colors: ['black', 'white', 'red'],
			sizes: ['S', 'M', 'L', 'XL'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '789 Oak Avenue, Village',
	},
	{
		_id: 'item-4',
		sellerId: 'seller-4',
		name: 'Running Shoes',
		description: 'Comfortable running shoes for active individuals.',
		price: 89.99,
		quantity: 25,
		thumbnail: 'shoes-thumbnail-url',
		gallery: ['shoes-gallery-url-1', 'shoes-gallery-url-2'],
		category: 'Shoes',
		tags: ['shoes', 'running', 'sports'],
		condition: 'new',
		variants: {
			colors: ['blue', 'gray', 'green'],
			sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '101 Maple Lane, County',
	},
	{
		_id: 'item-5',
		sellerId: 'seller-5',
		name: 'Wireless Headphones',
		description: 'High-quality wireless headphones for music lovers.',
		price: 129.99,
		quantity: 12,
		thumbnail: 'headphones-thumbnail-url',
		gallery: ['headphones-gallery-url-1', 'headphones-gallery-url-2'],
		category: 'Electronics',
		tags: ['headphones', 'music', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['black', 'white', 'gold'],
			sizes: ['Over-Ear', 'On-Ear', 'In-Ear'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '222 Pine Street, Town',
	},
	{
		_id: 'item-6',
		sellerId: 'seller-6',
		name: 'Dress Shirt',
		description: 'Elegant dress shirt for formal occasions.',
		price: 54.99,
		quantity: 18,
		thumbnail: 'dress-shirt-thumbnail-url',
		gallery: ['dress-shirt-gallery-url-1', 'dress-shirt-gallery-url-2'],
		category: 'Clothing',
		tags: ['dress shirt', 'clothing', 'fashion'],
		condition: 'new',
		variants: {
			colors: ['white', 'blue', 'pink'],
			sizes: ['S', 'M', 'L', 'XL'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '444 Oak Street, City',
	},
	{
		_id: 'item-7',
		sellerId: 'seller-7',
		name: 'Gaming Mouse',
		description: 'High-performance gaming mouse for gamers.',
		price: 39.99,
		quantity: 22,
		thumbnail: 'gaming-mouse-thumbnail-url',
		gallery: ['gaming-mouse-gallery-url-1', 'gaming-mouse-gallery-url-2'],
		category: 'Electronics',
		tags: ['gaming', 'mouse', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['black', 'red'],
			sizes: ['Standard', 'Pro'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '555 Elm Avenue, Village',
	},
	{
		_id: 'item-8',
		sellerId: 'seller-8',
		name: 'Backpack',
		description: 'Durable backpack for everyday use.',
		price: 34.99,
		quantity: 28,
		thumbnail: 'backpack-thumbnail-url',
		gallery: ['backpack-gallery-url-1', 'backpack-gallery-url-2'],
		category: 'Accessories',
		tags: ['backpack', 'bags', 'travel'],
		condition: 'new',
		variants: {
			colors: ['black', 'gray', 'blue'],
			sizes: ['Small', 'Medium', 'Large'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '777 Maple Lane, County',
	},
	{
		_id: 'item-9',
		sellerId: 'seller-9',
		name: 'Wireless Earbuds',
		description: 'Compact wireless earbuds for on-the-go listening.',
		price: 79.99,
		quantity: 15,
		thumbnail: 'earbuds-thumbnail-url',
		gallery: ['earbuds-gallery-url-1', 'earbuds-gallery-url-2'],
		category: 'Electronics',
		tags: ['earbuds', 'music', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['black', 'white'],
			sizes: ['In-Ear'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '888 Pine Street, Town',
	},
	{
		_id: 'item-10',
		sellerId: 'seller-10',
		name: 'Sneakers',
		description: 'Classic sneakers for everyday comfort.',
		price: 64.99,
		quantity: 20,
		thumbnail: 'sneakers-thumbnail-url',
		gallery: ['sneakers-gallery-url-1', 'sneakers-gallery-url-2'],
		category: 'Shoes',
		tags: ['sneakers', 'shoes', 'casual'],
		condition: 'new',
		variants: {
			colors: ['white', 'black', 'gray'],
			sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '999 Oak Avenue, City',
	},
	{
		_id: 'item-11',
		sellerId: 'seller-11',
		name: 'Coffee Mug',
		description: 'Stylish coffee mug for hot beverages.',
		price: 12.99,
		quantity: 35,
		thumbnail: 'mug-thumbnail-url',
		gallery: ['mug-gallery-url-1', 'mug-gallery-url-2'],
		category: 'Home & Kitchen',
		tags: ['mug', 'coffee', 'kitchen'],
		condition: 'new',
		variants: {
			colors: ['white', 'black', 'blue'],
			sizes: ['Regular', 'Large'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '111 Pine Street, City',
	},
	{
		_id: 'item-12',
		sellerId: 'seller-12',
		name: 'Smart Watch',
		description: 'Feature-rich smartwatch for fitness and productivity.',
		price: 149.99,
		quantity: 8,
		thumbnail: 'smartwatch-thumbnail-url',
		gallery: ['smartwatch-gallery-url-1', 'smartwatch-gallery-url-2'],
		category: 'Electronics',
		tags: ['smartwatch', 'fitness', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['black', 'silver', 'gold'],
			sizes: ['Small', 'Medium', 'Large'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '222 Oak Street, Town',
	},
	{
		_id: 'item-13',
		sellerId: 'seller-13',
		name: 'Sunglasses',
		description: 'Stylish sunglasses to protect your eyes from the sun.',
		price: 39.99,
		quantity: 14,
		thumbnail: 'sunglasses-thumbnail-url',
		gallery: ['sunglasses-gallery-url-1', 'sunglasses-gallery-url-2'],
		category: 'Accessories',
		tags: ['sunglasses', 'eyewear', 'fashion'],
		condition: 'new',
		variants: {
			colors: ['black', 'brown', 'blue'],
			sizes: ['Standard'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '333 Elm Avenue, Village',
	},
	{
		_id: 'item-14',
		sellerId: 'seller-14',
		name: 'Winter Jacket',
		description: 'Warm and cozy winter jacket for cold days.',
		price: 79.99,
		quantity: 10,
		thumbnail: 'jacket-thumbnail-url',
		gallery: ['jacket-gallery-url-1', 'jacket-gallery-url-2'],
		category: 'Clothing',
		tags: ['jacket', 'winter', 'outerwear'],
		condition: 'new',
		variants: {
			colors: ['black', 'gray', 'navy'],
			sizes: ['S', 'M', 'L', 'XL'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '444 Maple Lane, County',
	},
	{
		_id: 'item-15',
		sellerId: 'seller-15',
		name: 'Bluetooth Speaker',
		description: 'Portable Bluetooth speaker for music enthusiasts.',
		price: 59.99,
		quantity: 18,
		thumbnail: 'speaker-thumbnail-url',
		gallery: ['speaker-gallery-url-1', 'speaker-gallery-url-2'],
		category: 'Electronics',
		tags: ['bluetooth speaker', 'music', 'electronics'],
		condition: 'new',
		variants: {
			colors: ['black', 'blue', 'red'],
			sizes: ['Regular', 'Mini'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '555 Pine Street, Town',
	},
	{
		_id: 'item-16',
		sellerId: 'seller-16',
		name: 'Leather Wallet',
		description: 'Classy leather wallet for cards and cash.',
		price: 29.99,
		quantity: 20,
		thumbnail: 'wallet-thumbnail-url',
		gallery: ['wallet-gallery-url-1', 'wallet-gallery-url-2'],
		category: 'Accessories',
		tags: ['wallet', 'accessories', 'fashion'],
		condition: 'new',
		variants: {
			colors: ['brown', 'black'],
			sizes: ['Standard'],
		},
		shipping: {
			delivery: true,
			pickUp: false,
		},
		pickupAddress: '777 Elm Street, City',
	},
	{
		_id: 'item-17',
		sellerId: 'seller-17',
		name: 'Yoga Mat',
		description: 'Comfortable yoga mat for exercise and meditation.',
		price: 34.99,
		quantity: 25,
		thumbnail: 'yoga-mat-thumbnail-url',
		gallery: ['yoga-mat-gallery-url-1', 'yoga-mat-gallery-url-2'],
		category: 'Sports & Fitness',
		tags: ['yoga mat', 'exercise', 'fitness'],
		condition: 'new',
		variants: {
			colors: ['purple', 'blue', 'green'],
			sizes: ['Regular', 'Extra Thick'],
		},
		shipping: {
			delivery: true,
			pickUp: true,
		},
		pickupAddress: '888 Oak Avenue, Village',
	},
];

export default function Products() {
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
							<TableCell>ID</TableCell>
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
						{items.map((item) => (
							<TableRow
								hover
								key={item._id}
							>
								<TableCell>{item._id}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.description}</TableCell>
								<TableCell>{item.category}</TableCell>
								<TableCell>{item.condition}</TableCell>
								<TableCell>{item.quantity}</TableCell>
								<TableCell>{item.price}</TableCell>
								<TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

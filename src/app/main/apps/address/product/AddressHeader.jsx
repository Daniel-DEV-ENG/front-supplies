import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	useCreateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useUpdateECommerceProductMutation
} from '../../cities/CitiesApi';

/**
 * The product header.
 */
function ProductHeader({address}) {
	const routeParams = useParams();
	const { productId } = routeParams;
	const [createProduct] = useCreateECommerceProductMutation();
	const [saveProduct] = useUpdateECommerceProductMutation();
	const [removeProduct] = useDeleteECommerceProductMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();

	function handleSaveProduct() {
		saveProduct(getValues());
	}

	function handleCreateProduct() {
		createProduct(getValues())
			.unwrap()
			.then((data) => {
				navigate(`/apps/e-commerce/products/${data.id}`);
			});
	}

	function handleRemoveProduct() {
		removeProduct(productId);
		navigate('/apps/e-commerce/products');
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/cities"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">المدينة</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{address?.name}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							تفاصيل المدينة
						</Typography>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default ProductHeader;

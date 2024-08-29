import { lighten, styled } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import { useEffect } from 'react';

const Root = styled('div')(({ theme }) => ({
	'& .productImageFeaturedStar': {
		position: 'absolute',
		top: 0,
		right: 0,
		color: '#f44336',
		opacity: 0
	},
	'& .productImageUpload': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	'& .productImageItem': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& .productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& .productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover .productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

/**
 * The product images tab.
 */
function UploadImage({ EditImage }) {
	const methods = useFormContext();
	const { control, watch, setValue } = methods;
	const image = watch('image');

	useEffect(() => {
		if (EditImage) {
			setValue('image', EditImage);
		}
	}, [EditImage, setValue]);

	const handleRemoveImage = () => {
		setValue('image', null);
	};

	return (
		<Root>
			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				{image ? (
					<Box
						className={clsx('productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden')}
					>
						<img src={image.file ? URL.createObjectURL(image.file) : `${import.meta.env.VITE_APP_Image + image}`} alt="Product" className="w-full h-full object-cover" />
						<FuseSvgIcon
							className="productImageFeaturedStar"
							size={32}
							onClick={handleRemoveImage}
						>
							heroicons-outline:trash
						</FuseSvgIcon>
					</Box>
				) : (
					<Controller
						name="image"
						control={control}
						render={({ field: { onChange } }) => (
							<Box
								sx={{
									backgroundColor: (theme) =>
										theme.palette.mode === 'light'
											? lighten(theme.palette.background.default, 0.4)
											: lighten(theme.palette.background.default, 0.02)
								}}
								component="label"
								htmlFor="button-file"
								className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
							>
								<input
									accept="image/*"
									className="hidden"
									id="button-file"
									type="file"
									onChange={(e) => {
										const file = e.target.files[0];
										if (file) {
											const newImage = {
												file: file,
												type: 'image'
											};
											onChange(newImage);
											setValue('image', newImage);
										}
									}}
								/>
								<FuseSvgIcon
									size={32}
									color="action"
								>
									heroicons-outline:upload
								</FuseSvgIcon>
							</Box>
						)}
					/>
				)}
			</div>
		</Root>
	);
}

export default UploadImage;
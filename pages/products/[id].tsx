/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaRegHeart, FaRegCopy } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { toast } from 'sonner';

import { useDispatch } from 'react-redux';

import Layout from '../../components/wrappers/Layout';
import { Button } from '../../components/ui/button';
import { setCartItem } from '../../redux/features/shopCartSlice';

import { useGetAllProductByIDQuery } from '../api/productsApi';
import { SizeSelector } from '../../components/sizeSelector';
import { Separator } from '../../components/ui/separator';
import { Drawer, DrawerType } from '../../components/drawer';

const ProductDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const [descriptionDrawerOpen, setDescriptionDrawerOpen] = useState(false);
  const [deliveryDrawerOpen, setDeliveryOpen] = useState(false);
  const [sizesGuideDrawerOpen, setSizesGuideDrawerOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const { data, isLoading } = useGetAllProductByIDQuery(id);
  if (isLoading) return <div>Loading...</div>;
  const { data: productDetail, quantity, ids } = data;
  const setItemToCart = () => {
    const cartItem = {
      product: ids[selectedSize],
      name: productDetail.name,
      price: productDetail.price,
      image: productDetail.image,
      size: selectedSize,
      quantity: 1,
      discount_percentage: productDetail.discount_percentage,
    };
    dispatch(setCartItem(cartItem));
  };
  // TODO MAKE DIFFERENT COMPONENTS -> IMAGES, INFO PRODUCT, SIZES, REVIEWS
  return (
    <Layout>
      {!isLoading && (
        <div className='grid w-full grid-cols-2'>
          <div className='flex flex-row'>
            <div className='relative ml-10 h-[40rem] w-[25rem]'>
              <Image
                src={
                  productDetail.image
                    ? productDetail.image
                    : '/product-image-placeholder.png'
                }
                sizes='50vw'
                alt='Product'
                quality={100}
                fill
              />
            </div>
            <div className='relative ml-10 h-[40rem] w-[25rem]'>
              <Image
                src={
                  productDetail.image
                    ? productDetail.image
                    : '/product-image-placeholder.png'
                }
                sizes='50vw'
                alt='Product'
                quality={100}
                fill
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='mt-10 flex flex-col items-center'>
              <h1 className='text-[0.9rem] font-bold'>
                {productDetail.name.toUpperCase()}
              </h1>
              <h2 className='text-[0.5rem] text-slate-400'>
                {productDetail.description.toUpperCase()}
              </h2>
              <div className='flex items-center gap-2'>
                {productDetail.discount_percentage > 0 ? (
                  <>
                    <h2 className='text-xs text-red-500 line-through'>
                      CLP ${productDetail.price}
                    </h2>
                    <h2 className='text-xs font-bold'>
                      CLP $
                      {(
                        productDetail.price *
                        (1 - productDetail.discount_percentage / 100)
                      ).toFixed(0)}
                    </h2>
                  </>
                ) : (
                  <h2 className='text-xs text-black'>
                    CLP ${productDetail.price}
                  </h2>
                )}
              </div>
              <div className='flex flex-row gap-x-10 py-8'>
                <FaRegHeart className='cursor-pointer' />
                <FaRegCopy
                  className='cursor-pointer'
                  onClick={() => toast('¡Se ha copiado el link del producto!')}
                />
              </div>
              <SizeSelector
                isOpen={sizesGuideDrawerOpen}
                setIsOpen={setSizesGuideDrawerOpen}
                setSize={setSelectedSize}
                productSizes={quantity}
              />
              <Button
                onClick={setItemToCart}
                className='my-5 w-full rounded-full text-xs'
              >
                ADD TO BAG
              </Button>
              <Separator className='my-2' />
              <div
                className='flex w-full cursor-pointer justify-between px-4 py-3'
                onClick={() => setDescriptionDrawerOpen(!descriptionDrawerOpen)}
              >
                <p className='text-[0.6rem] font-bold text-black'>
                  DESCRIPTION
                </p>
                <IoIosArrowForward />
              </div>
              <div
                className='flex w-full cursor-pointer justify-between px-4 py-3'
                onClick={() => setDeliveryOpen(!deliveryDrawerOpen)}
              >
                <p className='text-[0.6rem] font-bold text-black'>
                  DELIVERY & RETURNS
                </p>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
      )}
      <Drawer
        isOpen={descriptionDrawerOpen}
        setIsOpen={setDescriptionDrawerOpen}
        type={DrawerType.ProductDescription}
      />
      <Drawer
        isOpen={deliveryDrawerOpen}
        setIsOpen={setDeliveryOpen}
        type={DrawerType.Delivery}
      />
      <Drawer
        isOpen={sizesGuideDrawerOpen}
        setIsOpen={setSizesGuideDrawerOpen}
        type={DrawerType.Size}
      />
    </Layout>
  );
};

export default ProductDetail;

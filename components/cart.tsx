'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash3 } from 'react-icons/bs';

import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';

import { cn } from './ui/utils';
import { removeCartItem } from '../redux/features/shopCartSlice';
import { Separator } from './ui/separator';

export function ShopCart({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);

  const removeCartItemHandler = (id: string) => {
    dispatch(removeCartItem(id));
  };
  return (
    <div className='grid grid-cols-2 gap-2'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          className={cn(
            'flex h-lvh max-h-lvh w-[100%] flex-col gap-[0] p-0',
            'transition-[width] duration-300 ease-in-out'
          )}
        >
          <SheetHeader className='flex h-[5%] flex-row justify-center px-6'>
            <SheetTitle className='flex items-center gap-x-4 text-xs'>
              Tu Bolsa
            </SheetTitle>
          </SheetHeader>
          {cartItems.length > 0 ? (
            <SheetDescription className='mx-10 my-10 flex h-full flex-col gap-y-2 text-black'>
              <div className='flex flex-grow flex-col gap-y-2'>
                {cartItems.map((item) => (
                  <div key={item.id} className='flex flex-col gap-y-4'>
                    <div className='flex h-full flex-row gap-x-2'>
                      <Image
                        src={
                          item.image
                            ? item.image
                            : '/product-image-placeholder.png'
                        }
                        alt={`product ${item.id}`}
                        width={100}
                        height={100}
                        className='h-[3.5cm] w-[3cm]'
                      />
                      <div className='flex flex-col gap-y-0.5'>
                        <h1 className='text-xs text-slate-700'>
                          {item.name} {item.size}
                        </h1>
                        <div className='flex items-center gap-2'>
                          {item.discount_percentage > 0 ? (
                            <>
                              <h2 className='text-xs text-red-500 line-through'>
                                CLP ${item.price}
                              </h2>
                              <h2 className='text-xs font-bold'>
                                CLP $
                                {(
                                  item.price *
                                  (1 - item.discount_percentage / 100)
                                ).toFixed(0)}
                              </h2>
                            </>
                          ) : (
                            <h2 className='text-xs text-black'>
                              CLP ${item.price}
                            </h2>
                          )}
                        </div>
                        <div className='flex h-full items-end'>
                          <div className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-200'>
                            <BsTrash3
                              className='text-gray-600'
                              onClick={() =>
                                removeCartItemHandler(item.product)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
              <Link href='/checkout'>
                <Button className='w-full self-end text-xs'>
                  Go to checkout
                </Button>
              </Link>
            </SheetDescription>
          ) : (
            <SheetDescription className='flex h-[80%] flex-col items-center justify-center gap-x-4 gap-y-10'>
              <h2>Tu bolsa se encuentra vacía 😥</h2>
              <div className='flex flex-row items-center justify-center gap-x-4'>
                <Button className='text-xs'>SHOP WOMEN</Button>
                <Button className='text-xs'>VIEW ACCESSORIES</Button>
              </div>
            </SheetDescription>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

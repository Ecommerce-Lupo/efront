/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardFooter } from './ui/card';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

export function CarouselPlugin({ products }: { products: any }) {
  return (
    <Carousel className='w-[100%]'>
      <CarouselContent className='overflow-x-auto'>
        {products.map((product: any, index: any) => (
          <Link
            href={{
              pathname: `/products/${product.id}`,
            }}
            key={index}
          >
            <CarouselItem key={index} className='basis-1/2'>
              <Card className='cursor-pointer rounded-none border-0'>
                <CardContent className='flex min-h-[30rem] px-0'>
                  <div className='relative h-[30rem] w-[25rem]'>
                    <Image
                      src={
                        product.image
                          ? product.image
                          : '/product-image-placeholder.png'
                      }
                      alt='product'
                      quality={100}
                      sizes='50vw'
                      fill
                    />
                    {product.discount_percentage > 0 && (
                      <div className='absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white'>
                        {product.discount_percentage}% OFF
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className='my-0 flex flex-col items-start justify-start px-0 pt-0.5'>
                  <p className='text-xs'>{product.description}</p>
                  <p className='text-[0.7rem] text-slate-500'>{product.name}</p>
                  {product.discount_percentage > 0 ? (
                    <div className='flex items-center'>
                      <p className='mr-2 text-[0.7rem] font-bold line-through'>
                        CLP ${product.price}
                      </p>
                      <p className='text-[0.7rem] font-bold text-red-500'>
                        CLP $
                        {(
                          product.price *
                          (1 - product.discount_percentage / 100)
                        ).toFixed(0)}
                      </p>
                    </div>
                  ) : (
                    <p className='text-[0.7rem] font-bold'>
                      CLP ${product.price}
                    </p>
                  )}
                </CardFooter>
              </Card>
            </CarouselItem>
          </Link>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export function CarouselLoader() {
  return (
    <Carousel className='w-[100%]'>
      <CarouselContent className='overflow-x-auto'>
        {Array.from({ length: 5 }, (_, index) => (
          <CarouselItem key={index} className='basis-1/4'>
            <Card className='rounded-none border-none'>
              <CardContent className='flex min-h-[30rem] animate-pulse bg-slate-50 px-0 ' />
              <CardFooter className='my-0 flex flex-col items-start justify-start px-0 pt-0.5'>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-10 h-2 rounded bg-slate-100' />
                  <div className='col-span-8 h-2 rounded bg-slate-100 ' />
                  <div className='col-span-6 h-2 rounded bg-slate-100 ' />
                </div>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

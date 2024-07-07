/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/wrappers/Layout';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { Checkbox } from '../../components/ui/checkbox';
import { useGetProductsByCategoryQuery } from '../api/productsApi';
import { Card, CardContent, CardFooter } from '../../components/ui/card';

const AccordionItemContent = ({ title }: { title: string }) => (
  <AccordionItem value={title.toLowerCase()}>
    <AccordionTrigger>{title}</AccordionTrigger>
    <AccordionContent>
      <div className='items-top flex space-x-2'>
        <Checkbox id={title.toLowerCase()} />
        <div className='grid gap-1.5 leading-none'>
          <label
            htmlFor={title.toLowerCase()}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Low to High
          </label>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
);

const ProductsByCategory = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetProductsByCategoryQuery(id);
  const accordionItems = [
    'SORT BY',
    'PRODUCT TYPE',
    'SIZE',
    'FEATURES',
    'FIT',
    'ACTIVITY',
    'COLLECTION',
    'COLOR',
    'PATTERN',
    'DISCOUNT',
    'PRICE',
  ];

  if (isLoading) {
    return <div className='flex justify-center'>Loading...</div>;
  }

  return (
    <Layout>
      <div className='flex flex-row gap-4'>
        <ScrollArea className='ml-[2%] h-[35rem] w-72 rounded-md border border-none'>
          <div className='p-4'>
            <Accordion type='single' collapsible>
              {accordionItems.map((item) => (
                <AccordionItemContent key={item} title={item} />
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <div className='my-10 ml-10 flex w-2/3 flex-row flex-wrap justify-end'>
          <div className='flex w-full flex-col gap-4'>
            <h2 className='text-4xl font-bold'>{id}</h2>
            <div className='flex w-full flex-row flex-wrap gap-20'>
              {isError ? (
                <div className='text-slate-500'>
                  Actualmente no hay productos en esta categoría . . .
                </div>
              ) : (
                data.data.map((product) => (
                  <div key={product.id} className='w-[15rem]'>
                    <Link href={`../products/${product.id}`}>
                      <Card className='cursor-pointer rounded-none border-0 bg-[#F7F7F7]'>
                        <CardContent className='flex h-[20rem] px-0'>
                          <div className='relative h-[18rem] w-[15rem]'>
                            {product.discount_percentage > 0 && (
                              <div className='absolute left-2 top-2 z-10 rounded bg-red-500 px-2 py-1 text-xs text-white'>
                                -{product.discount_percentage}%
                              </div>
                            )}
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
                              className='z-0'
                            />
                          </div>
                        </CardContent>
                        <CardFooter className='my-0 flex flex-col items-start justify-start px-5 pt-0.5'>
                          <p>{product.name}</p>
                          <p className='text-[0.7rem] text-slate-500'>
                            {product.description}
                          </p>
                          <div className='flex items-center gap-2'>
                            {product.discount_percentage > 0 && (
                              <>
                                <p className='text-[0.7rem] text-red-500 line-through'>
                                  CLP ${product.price}
                                </p>
                                <p className='text-[0.7rem] font-bold'>
                                  CLP $
                                  {(
                                    product.price *
                                    (1 - product.discount_percentage / 100)
                                  ).toFixed(0)}
                                </p>
                              </>
                            )}
                            {product.discount_percentage === 0 && (
                              <p className='text-[0.7rem] font-bold'>
                                CLP ${product.price}
                              </p>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsByCategory;

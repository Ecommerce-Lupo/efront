import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/wrappers/Layout';
import { useGetProductsQuery } from './api/productsApi';
import { Card, CardContent, CardFooter } from '../components/ui/card';

const Search = () => {
  const router = useRouter();
  const { query } = router.query;
  const { data, isLoading } = useGetProductsQuery('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data);
      const filteredProducts = data.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [data, query]);

  if (isLoading) {
    return <div className='flex justify-center'>Loading...</div>;
  }

  return (
    <Layout>
      <div className='my-10 ml-10 flex w-2/3 flex-row flex-wrap justify-end'>
        <div className='flex w-full flex-col gap-4'>
          <div className='flex w-full flex-row flex-wrap gap-20 p-20 pt-5'>
            {products.length === 0 ? (
              <div className='mb-4 text-xl font-bold'>
                No hay productos que coincidan con la búsqueda &apos;{query}
                &apos;
              </div>
            ) : (
              <div className='mb-4 text-xl font-bold'>
                Productos que coinciden con &apos;{query}&apos;
              </div>
            )}
            <div className='flex w-full flex-row flex-wrap gap-20'>
              {products.map((product) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

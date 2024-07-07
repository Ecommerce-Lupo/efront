/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/wrappers/Layout';
import { useCreateOrderMutation } from './api/ordersApi';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Input } from '../components/ui/input';
import { toast } from '../components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';

const FormSchema = z.object({
  street_address: z.string().min(2, {
    message: 'La dirección debe tener al menos 2 caracteres',
  }),
  city: z.string().min(2, {
    message: 'La ciudad debe tener al menos 2 caracteres',
  }),
  zip_code: z.string().regex(/^\d{5}$/, {
    message: 'El código postal debe tener 5 dígitos',
  }),
  country: z.string().min(2, {
    message: 'El país debe tener al menos 2 caracteres',
  }),
  payment_mode: z.enum(['COD', 'Card'], {
    required_error: 'Se requiere seleccionar un modo de pago',
  }),
});

export default function Checkout() {
  const [orderFinished, setOrderFinished] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [createOrder] = useCreateOrderMutation();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      street_address: '',
      city: '',
      zip_code: '',
      country: '',
      payment_mode: 'COD',
    },
  });

  const auth = useSelector(
    (store: {
      auth: {
        user: null;
        isAuthenticated: boolean;
      };
    }) => store.auth
  );
  function OnSubmit(data: z.infer<typeof FormSchema>) {
    data.cart = cart;
    createOrder(data)
      .unwrap()
      .then(() => {
        toast({
          title: 'Orden creada exitosamente',
        });
        setOrderFinished(true);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to create order',
        });
      });
  }

  function calculateTotal() {
    const sub = cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity *
          (item.discount_percentage > 0
            ? (100 - item.discount_percentage) / 100
            : 1),
      0
    );
    setSubtotal(sub);
    // It is assumed that the shipping cost is $0
    setTotal(sub);
  }

  function processCartData() {
    const cartItemsCopy = [...cartItems];
    const cartData = cartItemsCopy.map((item) => ({
      id: item.product,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      color: '',
      price: item.price,
      discount_percentage: item.discount_percentage,
    }));
    setCart(cartData);
  }

  useEffect(() => {
    calculateTotal();
    processCartData();
    setIsLoading(false);
  }, [cartItems]);

  if (isLoading) {
    return (
      <Layout>
        <div className='flex h-full items-center justify-center'>
          <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold'>Cargando...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className='flex h-full items-center justify-center'>
          <div className='m-10 flex w-1/2 flex-col items-center'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>Ups...</CardTitle>
                <CardDescription>
                  No hay productos en el carrito
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className='w-full'>
                  <Link href='/'>
                    <Button className='w-full self-end'>Ir a la tienda</Button>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (orderFinished) {
    return (
      <Layout>
        <div className='flex h-full items-center justify-center'>
          <div className='m-10 flex w-1/2 flex-col items-center'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>¡Orden creada exitosamente!</CardTitle>
                <CardDescription>
                  Tu orden ha sido creada exitosamente y ahora estamos
                  trabajando para que te llegue lo antes posible.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className='w-full'>
                  <Link href='/'>
                    <Button className='w-full self-end'>
                      Seguir Comprando
                    </Button>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {auth.isAuthenticated ? (
        <div className='flex flex-row justify-stretch'>
          <Card className='h-full w-1/2 border-none p-5 px-20 shadow-none'>
            <Label className='text-f text-2xl'>Carrito</Label>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='px-0'>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className='px-0 text-right'>
                      Precio Unitario
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className='px-0 font-medium'>
                        {item.name}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className='px-0 text-right font-bold'>
                        {item.discount_percentage > 0 ? (
                          <span>
                            CLP $
                            {item.price *
                              ((100 - item.discount_percentage) / 100)}
                          </span>
                        ) : (
                          <span>CLP ${item.price}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between'>
                  <h1>Subtotal</h1>
                  <h1 className='font-bold'>${subtotal}</h1>
                </div>
                <div className='flex flex-row justify-between'>
                  <h1>Costos de Envío</h1>
                  <h1>$0</h1>
                </div>
                <div className='flex flex-row justify-between text-xl font-bold'>
                  <h1>Total</h1>
                  <div className='flex flex-row items-center gap-2'>
                    <h1 className='text-xs font-normal text-[#686868]'>CLP</h1>
                    <h1>${total}</h1>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='w-1/2 rounded-none border-none p-5 px-20 shadow-none'>
            <Label className='text-f text-2xl'>Datos de envío</Label>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(OnSubmit)}
                  className='w-full space-y-6'
                >
                  <FormField
                    control={form.control}
                    name='street_address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder='Dirección' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder='Ciudad' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='zip_code'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input placeholder='Código Postal' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input placeholder='País' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='payment_mode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medio de Pago</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue='COD'
                            className='flex'
                          >
                            <div className='flex items-center space-x-10'>
                              <FormItem>
                                <div className='flex items-center space-x-2'>
                                  <FormControl>
                                    <RadioGroupItem value='COD' />
                                  </FormControl>
                                  <FormLabel htmlFor='r1'>COD</FormLabel>
                                </div>
                              </FormItem>
                              <FormItem>
                                <div className='flex items-center space-x-2'>
                                  <FormControl>
                                    <RadioGroupItem value='Card' />
                                  </FormControl>
                                  <FormLabel htmlFor='r1'>
                                    Tarjeta de Crédito
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Confirmar pedido</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <div className='m-10 flex w-1/2 flex-col items-center'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>Ups...</CardTitle>
                <CardDescription>
                  Necesitas iniciar sesión para poder realzar tu compra
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className='w-full'>
                  <Link href='/login'>
                    <Button className='w-full self-end'>Iniciar Sesión</Button>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}

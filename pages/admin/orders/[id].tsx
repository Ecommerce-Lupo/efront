import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/wrappers/Layout';
import AdminSidebar from '../../../components/wrappers/AdminSidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  useGetOrderDetailQuery,
  useUpdateOrderMutation,
} from '../../api/ordersApi';
import { toast } from '../../../components/ui/use-toast';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetOrderDetailQuery(id);
  const [updateOrder] = useUpdateOrderMutation();
  const [status, setStatus] = useState(data?.data.status);
  if (isLoading) {
    return <div className='flex justify-center'>Loading...</div>;
  }

  const statusDict = {
    Processing: 'En Proceso',
    Shipped: 'Enviado',
    Delivered: 'Entregado',
    Cancelled: 'Cancelado',
    PAID: 'Pagado',
    UNPAID: 'Sin Pagar',
  };

  function handleUpdateOrder() {
    updateOrder({
      id: data.data.id,
      status,
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Estado de la orden actualizado correctamente',
        });
      })
      .catch((error) => {
        toast({
          title: 'Error al actualizar el estado de la orden',
          description: `Error al crear el producto: ${error.message}`,
        });
      });
  }

  return (
    <Layout>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <AdminSidebar>
          <div className='flex flex-col'>
            <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Detalles Orden</CardTitle>
                  <CardDescription>{id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col justify-stretch'>
                    <div className='flex flex-row justify-stretch'>
                      <Card className='h-full w-1/2 border-none px-7 shadow-none'>
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
                              {data.data.order_items.map((item) => {
                                const product = data.products[item.product];
                                return (
                                  <TableRow key={item.id}>
                                    <TableCell className='px-0 font-medium'>
                                      {product.name}{' '}
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className='px-0 text-right font-bold'>
                                      ${item.price}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                          <div className='flex flex-col'>
                            <div className='flex flex-row justify-between'>
                              <h1>Subtotal</h1>
                              <h1 className='font-bold'>
                                {data.data.total_amount}
                              </h1>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <h1>Costos de Envío</h1>
                              <h1>$0</h1>
                            </div>
                            <div className='flex flex-row justify-between text-xl font-bold'>
                              <h1>Total</h1>
                              <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs font-normal text-[#686868]'>
                                  CLP
                                </h1>
                                <h1>${data.data.total_amount}</h1>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='w-1/2 rounded-none border-none p-5 px-20 shadow-none'>
                        <Label className='text-f text-2xl'>
                          Detalles de Envío
                        </Label>
                        <CardContent>
                          <div className='mt-5 flex flex-col gap-5'>
                            <div className='flex flex-col'>
                              <Label className='text-lg'>Dirección</Label>
                              <h1 className='font-normal text-[#686868]'>
                                {data.data.street_address}
                              </h1>
                            </div>
                            <div className='flex flex-col'>
                              <Label className='text-lg'>Ciudad</Label>
                              <h1 className='font-normal text-[#686868]'>
                                {data.data.city}
                              </h1>
                            </div>
                            <div className='flex flex-col'>
                              <Label className='text-lg'>Código Postal</Label>
                              <h1 className='font-normal text-[#686868]'>
                                {data.data.zip_code}
                              </h1>
                            </div>
                            <div className='flex flex-col'>
                              <Label className='text-lg'>País</Label>
                              <h1 className='font-normal text-[#686868]'>
                                {data.data.country}
                              </h1>
                            </div>
                            <div className='flex flex-col'>
                              <Label className='text-lg'>Medio de Pago</Label>
                              <h1 className='font-normal text-[#686868]'>
                                {data.data.payment_mode}
                              </h1>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className='h-full w-full border-none px-7 pb-7 shadow-none'>
                      <Label className='text-f text-2xl'>
                        Estado de Pedido
                      </Label>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className='px-0'>
                                Estado de Pago
                              </TableHead>
                              <TableHead className='hidden sm:table-cell'>
                                Estado de Pedido
                              </TableHead>
                              <TableHead className='hidden md:table-cell'>
                                {' '}
                              </TableHead>
                              <TableHead className='text-right' />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className='bg-accent'>
                              <TableCell className='px-1'>
                                <div className='font-medium'>
                                  {statusDict[data.data.payment_status]}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={status}
                                  onValueChange={setStatus}
                                >
                                  <SelectTrigger className='w-[180px]'>
                                    <SelectValue
                                      placeholder={statusDict[data.data.status]}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value='Processing'>
                                        En Proceso
                                      </SelectItem>
                                      <SelectItem value='Shipped'>
                                        Enviado
                                      </SelectItem>
                                      <SelectItem value='Delivered'>
                                        Entregado
                                      </SelectItem>
                                      <SelectItem value='Cancelled'>
                                        Cancelado
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <div className='font-medium'>
                                  <Button onClick={() => handleUpdateOrder()}>
                                    Actualizar Estado de Pedido
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </AdminSidebar>
      </div>
    </Layout>
  );
}

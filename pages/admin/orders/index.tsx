import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Layout from '../../../components/wrappers/Layout';
import AdminSidebar from '../../../components/wrappers/AdminSidebar';
import { Badge } from '../../../components/ui/badge';
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

import { Button } from '../../../components/ui/button';
import { useGetOrdersQuery } from '../../api/ordersApi';

export default function Orders() {
  const { data, isLoading } = useGetOrdersQuery('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      const sortedOrders = [...data.data].sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
      );
      setOrders(sortedOrders);
    }
  }, [data]);

  const statusDict = {
    Processing: 'En Proceso',
    Shipped: 'Enviado',
    Delivered: 'Entregado',
    Cancelled: 'Cancelado',
    PAID: 'Pagado',
    UNPAID: 'Sin Pagar',
  };
  const statusClasses = {
    Processing: 'bg-[#D9C87C]',
    Shipped: 'bg-[#93ACD3]',
    Delivered: 'bg-[#99C28D]',
    Cancelled: 'bg-[#C47C6C]',
  };

  if (isLoading) {
    return <div className='flex justify-center'>Loading...</div>;
  }

  return (
    <Layout>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <AdminSidebar>
          <div className='flex flex-col'>
            <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Órdenes</CardTitle>
                  <CardDescription>Compras recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID del Pedido</TableHead>
                        <TableHead className='hidden sm:table-cell'>
                          Estado de Pedido
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Estad de Pago
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Monto
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Fecha Creación
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Fecha Última Actualización
                        </TableHead>
                        <TableHead className='text-right' />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow className='bg-accent'>
                          <TableCell>
                            <div className='font-medium'>{order.id}</div>
                          </TableCell>
                          <TableCell className='hidden sm:table-cell'>
                            <Badge
                              className={`text-xs ${statusClasses[order.status]}`}
                              variant='secondary'
                            >
                              {statusDict[order.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className='text-xs'>
                              {statusDict[order.payment_status]}
                            </Badge>
                          </TableCell>
                          <TableCell className='hidden md:table-cell'>
                            CLP ${order.total_amount}
                          </TableCell>
                          <TableCell className='hidden md:table-cell'>
                            {dayjs(order.created_at).format('DD/MM/YYYY HH:mm')}
                          </TableCell>
                          <TableCell className='hidden md:table-cell'>
                            {dayjs(order.updated_at).format('DD/MM/YYYY HH:mm')}
                          </TableCell>
                          <TableCell className='text-right'>
                            <Link href={`orders/${order.id}`}>
                              <Button variant='outline'>Ver Detalles</Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </main>
          </div>
        </AdminSidebar>
      </div>
    </Layout>
  );
}

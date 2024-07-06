/* eslint-disable import/no-extraneous-dependencies */
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Layout from '../../components/wrappers/Layout';
import AdminSidebar from '../../components/wrappers/AdminSidebar';
import { useGetMetricsQuery } from '../api/metricsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  AiOutlineHeart,
  FiDollarSign,
  PiPants,
  RiMedalLine,
  CiCalculator1,
} from '../../utils/icons';

export default function Analytics() {
  const { data } = useGetMetricsQuery('');

  const calculateFrequency = (series) => {
    const frequency = {};
    series.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    return Object.keys(frequency).map((key) => ({
      number: key,
      frequency: frequency[key],
    }));
  };

  const frequencyData = data
    ? calculateFrequency(data.data.price_distribution)
    : [];

  const CLPFormatter = (value) => `CLP $${value}`;

  const Histogram = () => (
    <BarChart
      width={1000}
      height={400}
      data={frequencyData}
      margin={{
        top: 40,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        dataKey='number'
        label={{ value: 'Número', position: 'insideBottomRight', offset: -10 }}
        tickFormatter={CLPFormatter}
      />
      <YAxis />
      <Tooltip labelFormatter={CLPFormatter} />
      <Legend />
      <Bar
        dataKey='frequency'
        fill='#93ACD3'
        name='Frecuencia de precio'
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <AdminSidebar>
          <div className='flex flex-col'>
            <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Indicadores claves del negocio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-4 p-4'>
                    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                      <Card x-chunk='dashboard-01-chunk-0'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Ganancias Totales
                          </CardTitle>
                          <FiDollarSign className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            CLP ${data.data.revenue}
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk='dashboard-01-chunk-1'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Total de Productos Vendidos
                          </CardTitle>
                          <PiPants className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            {data.data.total_sold_products}
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk='dashboard-01-chunk-2'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Producto más Vendido
                          </CardTitle>
                          <RiMedalLine className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            {data.data.highest_sold_product.name}
                          </div>
                          <h1 className='text-muted-foreground text-xs'>
                            Cantidad vendida:{' '}
                            {data.data.highest_sold_product.quantity_sold}
                          </h1>
                        </CardContent>
                      </Card>
                      <Card x-chunk='dashboard-01-chunk-3'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Valor promedio de orden
                          </CardTitle>
                          <CiCalculator1 className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            CLP ${data.data.average_order_value}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card x-chunk='dashboard-01-chunk-0'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-xl font-medium'>
                          Distribución de Precios
                        </CardTitle>
                        <AiOutlineHeart className='text-muted-foreground h-4 w-4' />
                      </CardHeader>
                      <CardContent className='p-5 pt-0'>
                        <Histogram />
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

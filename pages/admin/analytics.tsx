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
import { AiOutlineHeart } from '../../utils/icons';

export default function Analytics() {
  // const { data, isLoading } = useGetMetricsQuery('');

  const data = {
    data: {
      revenue: 269683,
      total_sold_products: 0,
      highest_sold_product: 'Polerón Naranjo',
      average_order_value: 15863,
      price_distribution: [
        15000, 24990, 23990, 19990, 35990, 19990, 19990, 34990, 39990,
      ],
    },
  };
  const numbers = [
    15000, 24990, 23990, 19990, 35990, 19990, 19990, 34990, 39990,
  ];

  // Función para contar la frecuencia de los números
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

  const frequencyData = calculateFrequency(numbers);

  // Función para formatear los valores a CLP
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
    return <div>Loading...</div>; // Renderizar un estado de carga hasta que los datos estén disponibles
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
                  <div className='flex flex-col gap-4'>
                    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                      <Card x-chunk='dashboard-01-chunk-0'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Ganancias Totales
                          </CardTitle>
                          <AiOutlineHeart className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            CLP ${data.data.revenue}
                          </div>
                          <h1 className='text-muted-foreground text-xs'>
                            +20.1% from last month
                          </h1>
                        </CardContent>
                      </Card>
                      <Card x-chunk='dashboard-01-chunk-1'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Total de Productos Vendidos
                          </CardTitle>
                          <AiOutlineHeart className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            {data.data.total_sold_products}
                          </div>
                          <h1 className='text-muted-foreground text-xs'>
                            +180.1% from last month
                          </h1>
                        </CardContent>
                      </Card>
                      <Card x-chunk='dashboard-01-chunk-2'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Producto más Vendido
                          </CardTitle>
                          <AiOutlineHeart className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            {data.data.highest_sold_product}
                          </div>
                          <h1 className='text-muted-foreground text-xs'>
                            +19% from last month
                          </h1>
                        </CardContent>
                      </Card>
                      <Card x-chunk='dashboard-01-chunk-3'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Valor promedio de orden
                          </CardTitle>
                          <AiOutlineHeart className='text-muted-foreground h-4 w-4' />
                        </CardHeader>
                        <CardContent className='p-5 pt-0'>
                          <div className='text-2xl font-bold'>
                            CLP ${data.data.average_order_value}
                          </div>
                          <h1 className='text-muted-foreground text-xs'>
                            +201 since last hour
                          </h1>
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

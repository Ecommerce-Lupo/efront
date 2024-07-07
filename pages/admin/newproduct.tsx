/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import Layout from '../../components/wrappers/Layout';
import { Button } from '../../components/ui/button';
import {
  useCreateProductMutation,
  useCreateMassiveUploadMutation,
} from '../api/productsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import AdminSidebar from '../../components/wrappers/AdminSidebar';
import { toast } from '../../components/ui/use-toast';
import MassiveProductsUpload from '../../components/MassiveUpload/massiveProductsUpload';

const FormSchema = z.object({
  name: z.string().min(5, {
    message: 'El nombre del producto debe tener al menos 5 caracteres',
  }),
  price: z.number().int().min(1, {
    message: 'El precio del producto debe ser un entero mayor a cero',
  }),
  quantity: z.number().int().min(1, {
    message: 'La cantidad del producto debe ser un entero mayor a cero',
  }),
  category: z.string().nonempty({
    message: 'Selecciona una categoría para el producto',
  }),
  size: z.string().nonempty({
    message: 'Selecciona una talla para el producto',
  }),
  gender: z.string().nonempty({
    message: 'Selecciona un género para el producto',
  }),
  color: z.string().nonempty({
    message: 'Selecciona un color para el producto',
  }),
  description: z.string().nonempty({
    message: 'La descripción del producto no puede estar vacía',
  }),
  image: z.any().optional(),
});

export default function NewProduct() {
  const [openMassiveUpload, setOpenMassiveUpload] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [createMassiveUpload] = useCreateMassiveUploadMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      gender: '',
      size: '',
      color: '',
      quantity: 0,
      image: null,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', String(data.price));
    formData.append('category', data.category);
    formData.append('gender', data.gender);
    formData.append('size', data.size);
    formData.append('color', data.color);
    formData.append('quantity', String(data.quantity));
    if (data.image) {
      formData.append('image', data.image);
    }
    createProduct(formData)
      .unwrap()
      .then(() => {
        toast({
          title: 'Producto creado con éxito',
          description: `El producto ha sido creado exitosamente`,
        });
        router.push('../admin/products');
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: `Error al crear el producto: ${error.message}`,
        });
      });
  }

  function handleOnSubmitMassive(data: FormData) {
    const body = { products: data.validData };
    createMassiveUpload(body)
      .unwrap()
      .then(() => {
        toast({
          title: 'Productos creados masivamente con éxito',
          description: `Los productos han sido creados exitosamente`,
        });
        router.push('../admin/products');
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: `Error al crear los productos: ${error.message}`,
        });
      });
  }

  return (
    <Layout>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <AdminSidebar>
          <div className='flex flex-col'>
            <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
              <div className='flex items-center'>
                <h1 className='text-lg font-semibold md:text-2xl'>
                  Agregar Producto
                </h1>
              </div>
              <Tabs defaultValue='individual' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='individual'>
                    Crear Producto Individual
                  </TabsTrigger>
                  <TabsTrigger value='massive'>Carga Masiva</TabsTrigger>
                </TabsList>
                <TabsContent value='individual'>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='w-full space-y-6'
                      encType='multipart/form-data'
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Crear producto individualmente</CardTitle>
                          <CardDescription>
                            Llena cada campo para crear un producto
                            individualmente
                          </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-2 p-6'>
                          <div className='space-y-1'>
                            <Label htmlFor='name'>Nombre de Producto</Label>
                            <FormField
                              control={form.control}
                              name='name'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='Nombre del producto'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='price'>Precio</Label>
                            <FormField
                              control={form.control}
                              name='price'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='Precio'
                                      {...field}
                                      type='number'
                                      onChange={(event) =>
                                        field.onChange(
                                          Number(event.target.value)
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='quantity'>Cantidad</Label>
                            <FormField
                              control={form.control}
                              name='quantity'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='Cantidad'
                                      {...field}
                                      type='number'
                                      onChange={(event) =>
                                        field.onChange(
                                          Number(event.target.value)
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='bg-balck flex flex-row gap-2'>
                            <div className='space-y-1'>
                              <Label htmlFor='stock'>Categoría</Label>
                              <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder='Seleccionar Categoría' />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value='Crop Tops'>
                                              Crop Tops
                                            </SelectItem>
                                            <SelectItem value='Hoodies'>
                                              Hoodies
                                            </SelectItem>
                                            <SelectItem value='Joggers'>
                                              Joggers
                                            </SelectItem>
                                            <SelectItem value='Shorts'>
                                              Shorts
                                            </SelectItem>
                                            <SelectItem value='Sports Bra'>
                                              Sports Bra
                                            </SelectItem>
                                            <SelectItem value='Underwear'>
                                              Underwear
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className='space-y-1'>
                              <Label htmlFor='stock'>Talla</Label>
                              <FormField
                                control={form.control}
                                name='size'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder='Seleccionar Talla' />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value='XS'>
                                              XS
                                            </SelectItem>
                                            <SelectItem value='S'>S</SelectItem>
                                            <SelectItem value='M'>M</SelectItem>
                                            <SelectItem value='L'>L</SelectItem>
                                            <SelectItem value='XL'>
                                              XL
                                            </SelectItem>
                                            <SelectItem value='XXL'>
                                              XXL
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className='space-y-1'>
                              <Label htmlFor='stock'>Género</Label>
                              <FormField
                                control={form.control}
                                name='gender'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder='Seleccionar Género' />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value='Female'>
                                              Mujer
                                            </SelectItem>
                                            <SelectItem value='Male'>
                                              Hombre
                                            </SelectItem>
                                            <SelectItem value='Unisex'>
                                              Unisex
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className='space-y-1'>
                              <Label htmlFor='stock'>Color</Label>
                              <FormField
                                control={form.control}
                                name='color'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder='Seleccionar Color' />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value='Red'>
                                              Rojo
                                            </SelectItem>
                                            <SelectItem value='Yellow'>
                                              Amarillo
                                            </SelectItem>
                                            <SelectItem value='Blue'>
                                              Azul
                                            </SelectItem>
                                            <SelectItem value='Black'>
                                              Negro
                                            </SelectItem>
                                            <SelectItem value='White'>
                                              Blanco
                                            </SelectItem>
                                            <SelectItem value='Green'>
                                              Verde
                                            </SelectItem>
                                            <SelectItem value='Orange'>
                                              Naranja
                                            </SelectItem>
                                            <SelectItem value='Purple'>
                                              Púrpura
                                            </SelectItem>
                                            <SelectItem value='Pink'>
                                              Rosa
                                            </SelectItem>
                                            <SelectItem value='Brown'>
                                              Marrón
                                            </SelectItem>
                                            <SelectItem value='Grey'>
                                              Gris
                                            </SelectItem>
                                            <SelectItem value='Beige'>
                                              Beige
                                            </SelectItem>
                                            <SelectItem value='Other'>
                                              Otro
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='description'>Descripción</Label>
                            <FormField
                              control={form.control}
                              name='description'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='image'>Cargar imagen</Label>
                            <FormField
                              control={form.control}
                              name='image'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type='file'
                                      onChange={(e) =>
                                        field.onChange(e.target.files[0])
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button type='submit'>Crear producto</Button>
                        </CardFooter>
                      </Card>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value='massive'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Carga Masiva</CardTitle>
                      <CardDescription>
                        Carga un arvhivo de tipo .csv o .xlsx para cargar
                        productos masivamente
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2 p-6'>
                      <div className='space-y-1'>
                        <Label htmlFor='username'>
                          Haz click en el botón para generar una carga Masiva
                        </Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => setOpenMassiveUpload(!openMassiveUpload)}
                      >
                        Crear Productos
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </AdminSidebar>
      </div>
      {openMassiveUpload ? (
        <MassiveProductsUpload
          isOpen={openMassiveUpload}
          setIsOpen={setOpenMassiveUpload}
          handleOnSubmit={handleOnSubmitMassive}
        />
      ) : null}
    </Layout>
  );
}

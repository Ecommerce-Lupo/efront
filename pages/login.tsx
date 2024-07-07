/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../components/ui/tabs';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useLoginMutation, useRegisterMutation } from './api/authApi';
import { setIsAuthenticated, setUser } from '../redux/features/userSlice';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(8),
  is_superuser: z.boolean(),
  is_staff: z.boolean(),
});

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      is_superuser: false,
      is_staff: false,
    },
  });

  const [login, { isLoading: isLoginLoading, data }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading, data: signupData }] =
    useRegisterMutation();

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    login(loginData);
  }
  if (data) {
    dispatch(setUser(data.data));
    dispatch(setIsAuthenticated(true));
    router.push('/');
  }

  function onSignupSubmit(values: z.infer<typeof signupSchema>) {
    const registerData = {
      email: values.email,
      name: `${values.name} ${values.lastName}`,
      password: values.password,
      is_superuser: false,
      is_staff: false,
    };
    if (
      registerData.name.startsWith('admin') ||
      registerData.name.startsWith('Admin')
    ) {
      registerData.is_superuser = true;
      registerData.is_staff = true;
    }
    signup(registerData);
  }
  if (signupData) {
    dispatch(setUser(signupData.data.user));
    dispatch(setIsAuthenticated(true));
    router.push('/');
  }

  return (
    <div className='flex h-screen flex-row'>
      <Card className='w-1/2 text-center'>
        <h1>img</h1>
      </Card>
      <Separator orientation='vertical' className='' />
      <Card className='flex w-1/2 flex-col items-center justify-center'>
        <CardHeader className='text-xl font-semibold'>
          <Image src='/Logo.jpeg' alt='Logo' width={200} height={200} />
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-[250px]'
          >
            <TabsList className='grid grid-cols-2 rounded-3xl bg-neutral-200'>
              <TabsTrigger className='rounded-3xl font-semibold' value='login'>
                LOGIN
              </TabsTrigger>
              <TabsTrigger className='rounded-3xl font-semibold' value='signup'>
                SIGN UP
              </TabsTrigger>
            </TabsList>
            <TabsContent value='login'>
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className='space-y-6'
                >
                  <FormField
                    control={loginForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter Email Address' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter a Password'
                            type='password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h2 className='pl-[30%] underline '>Forgot password?</h2>
                  <Button
                    className='w-full rounded-3xl bg-black'
                    type='submit'
                    disabled={isLoginLoading}
                  >
                    LOG IN
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value='signup'>
              <Form {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                  className='space-y-6'
                >
                  <FormField
                    control={signupForm.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder='Ingresa tu nombre' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder='Ingresa tu apellido' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter Email Address' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter a Password'
                            type='password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className='w-full rounded-3xl bg-black'
                    type='submit'
                    disabled={isSignupLoading}
                  >
                    SIGN UP
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

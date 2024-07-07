/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from './ui/navigation-menu';
import { BsBag, AiOutlineHeart, IoBarChartOutline } from '../utils/icons';
import { cn } from './ui/utils';
import SearchBar from './searchBar';
import ProfileDropDownMenu from './profile_dropdown_menu';
/* import {
  accesoriesTags,
  menTags,
  categoryTags,
} from '../utils/navigation-tags'; */
import { ShopCart } from './cart';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn('block select-none rounded-md py-1', className)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <p className='text-sm text-gray-500 hover:text-black'>{children}</p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';

/* const NavigationMenuColumn = ({
  column,
}: {
  column: { title: string; items: { href: string; description: string }[] }[];
}) => (
  <div>
    {column.map((component, componentIndex) => (
      <div key={componentIndex} className='mb-6'>
        <h2 className='font-semibold'>{component.title}</h2>
        {component.items.map((item, itemIndex) => (
          <ListItem key={itemIndex} href={item.href}>
            {item.description}
          </ListItem>
        ))}
      </div>
    ))}
  </div>
); */

/* const renderNavigationItems = (tags: any) => (
  <ul className='flex-cols flex h-[35rem] w-dvw gap-x-20'>
    {tags.map((column: any, columnIndex: number) => (
      <NavigationMenuColumn key={columnIndex} column={column} />
    ))}
  </ul>
);

const NavigationMenuItemWithContent = ({
  triggerText,
  contentItems,
}: {
  triggerText: string;
  contentItems: any;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>{triggerText}</NavigationMenuTrigger>
    <NavigationMenuContent>
      {renderNavigationItems(contentItems)}
    </NavigationMenuContent>
  </NavigationMenuItem>
); */

const Navbar = () => {
  const auth = useSelector(
    (store: {
      auth: {
        user: null | {
          access: string;
          user: { username: string; email: string; is_superuser: boolean };
        };
        isAuthenticated: boolean;
      };
    }) => store.auth
  );

  // TODO: search why is needed the cartItemCount
  const { cartItems } = useSelector(
    (state: { shopCart: any }) => state.shopCart
  );
  const [input, setInput] = useState('');
  const [isOpenCart, setIsOpenCart] = useState(false);

  // Ensure the cart item count is consistently rendered on both server and client
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className='flex w-[10rem] justify-end'>
            <Link href='/'>
              <Image src='/Logo.jpeg' alt='Logo' width={100} height={100} />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className='m-5 justify-end gap-14'>
          <NavigationMenuItem>
            <Link href='../productsByCategory/Crop Tops'>Crop Tops</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='../productsByCategory/Hoodies'>Hoodies</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='../productsByCategory/Joggers'>Joggers</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='../productsByCategory/Sports Bra'>Sports Bra</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='../productsByCategory/Underwear'>Underwear</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='../productsByCategory/Shorts'>Shorts</Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItemWithContent
            triggerText='Mujeres'
            contentItems={categoryTags}
          />
          <NavigationMenuItemWithContent
            triggerText='Hombres (Próximamente)'
            contentItems={menTags}
          />
          <NavigationMenuItemWithContent
            triggerText='Accesorios (Próximamente)'
            contentItems={accesoriesTags}
          /> */}
        </NavigationMenuList>
        <NavigationMenuList className='mr-[5rem] gap-x-6'>
          <NavigationMenuItem>
            <SearchBar input={input} setInput={setInput} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <AiOutlineHeart size={20} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ProfileDropDownMenu />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div
              className='relative cursor-pointer'
              onClick={() => setIsOpenCart(!isOpenCart)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsOpenCart(!isOpenCart);
                }
              }}
            >
              <BsBag size={20} />
              {cartItemCount > 0 && (
                <span className='absolute -right-2 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-slate-600 text-[0.5rem] text-white'>
                  {cartItemCount}
                </span>
              )}
            </div>
          </NavigationMenuItem>
          {auth.user?.user.is_superuser && (
            <NavigationMenuItem>
              <Link href='/admin/orders'>
                <IoBarChartOutline size={20} />
              </Link>{' '}
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {isOpenCart && <ShopCart setIsOpen={setIsOpenCart} isOpen={isOpenCart} />}
    </>
  );
};

export default Navbar;

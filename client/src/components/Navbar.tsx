import { Link } from 'react-router-dom'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';

const Navbar = () => {
  const admin = false;
  const loading = false;
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between h-14'>
        <Link to='/'>
            <h1 className='font-bold md:font-extrabold text-2xl'>Crave Cart</h1>
        </Link>
        <div className='hidden md:flex items-centre gap-10'>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/order/status'>Order</Link>
        {
            admin && (
                <Menubar>
                    <MenubarMenu>
                    <MenubarTrigger>
                        Dashboard
                    </MenubarTrigger>
                    <MenubarContent>
                        <Link to="/admin/restaurant"><MenubarItem>Restaurant</MenubarItem></Link>
                        <Link to="/admin/menu"><MenubarItem>Menu</MenubarItem></Link>
                        <Link to="/admin/orders"><MenubarItem>Order</MenubarItem></Link>
                    </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            )
        }
        <div className='flex items-center gap-4'>
            <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        <Link to="/cart" className='relative cursor-pointer'>
            <ShoppingCart></ShoppingCart>
            <Button size={'icon'} className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 
            hover:bg-red-500">5</Button>
        </Link>
        <div>
            <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div>
            {
                loading ? <Button disabled className='bg-button hover:bg-button-hover'><Loader2 className='animate-spin'></Loader2>Please wait</Button>:
                <Button className='bg-button hover:bg-button-hover cursor-pointer'>Logout</Button>
            }
        </div>
        </div>
        </div>
        <div className='md:hidden'>
          <MobileNavBar admin={admin} loading={loading} />
        </div>


      </div>
    </div>
  )
}

export default Navbar;

const MobileNavBar = ({ admin, loading }: { admin: boolean; loading: boolean }) => {
    return(
            <Sheet>
      <SheetTrigger render={<Button className='rounded-full bg-gray-200 text-black hover:bg-gray-200' size={'icon'} variant="outline"><Menu size={'18'}/></Button>} />
  <SheetContent className="flex flex-col gap-0 p-0">
        <SheetHeader className='flex flex-row items-center justify-between gap-4 pr-12 mt-2'>
          <SheetTitle>Crave Cart</SheetTitle>
                      <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <div className="flex flex-1 flex-col px-4">
          <nav className="flex flex-col gap-1">
            <SheetClose render={<Link to="/profile" className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900" />}>
              <User />
              <span>Profile</span>
            </SheetClose>
            <SheetClose render={<Link to="/order/status" className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900" />}>
              <HandPlatter />
              <span>Order</span>
            </SheetClose>
            <SheetClose render={<Link to="/cart" className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900" />}>
              <ShoppingCart />
              <span>Cart (5)</span>
            </SheetClose>
            {admin && (
              <>
                <SheetClose render={<Link to="/admin/menu" className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900" />}>
                  <SquareMenu />
                  <span>Menu</span>
                </SheetClose>
                <SheetClose render={<Link to="/admin/restaurant" className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900" />}>
                  <UtensilsCrossed />
                  <span>Restaurant</span>
                </SheetClose>
                <SheetClose render={<Link to="/admin/orders" className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900" />}>
                  <PackageCheck />
                  <span>Restaurant Orders</span>
                </SheetClose>
              </>
            )}
          </nav>
        </div>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Crave Cart User</h1>
          </div>
          <SheetClose render={loading ?
            <Button disabled className='bg-button hover:bg-button-hover' /> :
            <Button className='bg-button hover:bg-button-hover cursor-pointer' />
          }>
            {loading ? <><Loader2 className='mr-2 animate-spin' />Please wait</> : 'Logout'}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    )
}

import Link from "next/link"
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  PackagePlus,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
type LayoutProps = {
  children: React.ReactNode;
};

const AdminSidebar = ({ children }: LayoutProps) => (
  <>
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="../admin" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Administración Lupo</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="../admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Tablero
            </Link>
            <Link
              href="../admin/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Órdenes
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                1
              </Badge>
            </Link>
            <Link
              href="../admin/products"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Productos{" "}
            </Link>
            <Link
              href="../admin/newproduct"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <PackagePlus className="h-4 w-4" />
              Agregar Producto{" "}
            </Link>
            <Link
              href="../admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Usuarios
            </Link>
            <Link
              href="../admin/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
      </div>
    </div>
    {children}
  </>
);

export default AdminSidebar;

import Layout from '../../components/wrappers/Layout';
import OrdersTable from "../../components/features/admin/orders-table";
import AdminSidebar from "../../components/wrappers/AdminSidebar";

export default function Analytics() {
  return (
    <Layout>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
            </div>
            <OrdersTable />
          </main>
        </div>
        </AdminSidebar>
      </div>
    </Layout>
  )
}
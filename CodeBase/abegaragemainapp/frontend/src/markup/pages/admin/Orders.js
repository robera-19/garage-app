import OrdersList from "../../components/Admin/Customers/OrdersList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
export default function Orders() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <OrdersList />
          </div>
        </div>
      </div>
    </div>
  );
}

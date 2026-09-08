import ViewOrder from '../../components/Admin/Orders/ViewOrder';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
export default function ViewOrderPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ViewOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

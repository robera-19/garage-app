import EditOrder from '../../components/Admin/Orders/EditOrder';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

const EditOrderPage = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrderPage;

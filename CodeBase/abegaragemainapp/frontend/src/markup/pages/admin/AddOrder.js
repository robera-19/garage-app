import NewOrder from '../../components/Admin/Orders/NewOrder';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function AddOrder(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <NewOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrder;

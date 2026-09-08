import CustomerDetails from '../../components/Admin/Customers/CustomerDetails';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function CustomerDetailsPage(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerDetails/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;

import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditCustomerForm from '../../components/Admin/Customers/EditCustomerForm';

const EditCustomer = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditCustomerForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;

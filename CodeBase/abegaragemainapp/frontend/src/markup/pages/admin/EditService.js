import EditService from '../../components/Admin/Services/EditService';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function EditServicePage(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditService />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditServicePage;

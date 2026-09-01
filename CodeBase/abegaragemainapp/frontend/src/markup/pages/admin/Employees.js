import { useAuth } from '../../../Context/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EmployeesList from '../../components/Admin/EmployeesList/EmployeesList';
function Employees() {
  // Destructure the auth hook
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {

    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EmployeesList />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to access this page</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default Employees;

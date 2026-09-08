import { Link } from 'react-router-dom';

const cards = [
  {
    label: 'OPEN FOR ALL',
    title: 'All Orders',
    link: 'LIST OF ORDERS',
    path: '/admin/orders',
  },
  {
    label: 'OPEN FOR LEADS',
    title: 'New Orders',
    link: 'ADD ORDER',
    path: '/admin/orders/new',
  },
  {
    label: 'OPEN FOR ADMINS',
    title: 'Employees',
    link: 'LIST OF EMPLOYEES',
    path: '/admin/employees',
  },
  {
    label: 'OPEN FOR ADMINS',
    title: 'Add Employee',
    link: 'READ MORE',
    path: '/admin/add-employee',
  },
  {
    label: 'SERVICE AND REPAIRS',
    title: 'Engine Service & Repair',
    link: 'READ MORE',
    path: '/services',
  },
  {
    label: 'SERVICE AND REPAIRS',
    title: 'Tyre & Wheels',
    link: 'READ MORE',
    path: '/services',
  },
  {
    label: 'SERVICE AND REPAIRS',
    title: 'Denting & Painting',
    link: 'READ MORE',
    path: '/services',
  },
  {
    label: 'SERVICE AND REPAIRS',
    title: 'Engine Service & Repair',
    link: 'READ MORE',
    path: '/services',
  },
  {
    label: 'SERVICE AND REPAIRS',
    title: 'Tyre & Wheels',
    link: 'READ MORE',
    path: '/services',
  },
];

const AdminDashboard = () => {
  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-inner">
        <div className="admin-title">
          <h2>Admin Dashboard</h2>
          <span />
        </div>

        <p className="admin-description">
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </p>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div className="dashboard-card" key={index}>
              <div>
                <small>{card.label}</small>
                <h3>{card.title}</h3>
              </div>

              <Link to={card.path}>
                {card.link} <span>+</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;

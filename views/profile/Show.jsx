const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const user = props.user;

  return (
    <Layout>
      <h1> {user.name}</h1>

      <div className="user-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <div className="d-flex gap-2 mt-3">
          <a href={`/users?token=${props.token}`} className="btn btn-secondary">← Back to Users</a>
          <a href={`/users/${user._id}/edit?token=${props.token}`} className="btn btn-primary"> Edit Profile</a>
        </div>

        <div className="mt-3">
          <form action={`/users/${user._id}?_method=DELETE&token=${props.token}`} method="POST">
            <button type="submit" className="btn btn-danger"> Delete User</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Show;

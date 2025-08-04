const React = require('react');
const Layout = require('../layouts/Layout');

function Index(props) {
  const user = props.user;

  return (
    <Layout>
      <h1> Your Profile</h1>
      <div className="profile-box">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <div className="d-flex gap-2 mt-3">
          <a href={`/users/${user._id}/edit?token=${props.token}`} className="btn btn-primary"> Edit Profile</a>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Index;

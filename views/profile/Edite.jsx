const React = require('react');
const Layout = require('../layouts/Layout');

function EditProfile(props) {
  const { _id, name, email } = props.user;
  const token = props.token;

  return (
    <Layout>
      <h1> Edit Profile</h1>

      <form action={`/users/${_id}?_method=PUT&token=${token}`} method="POST">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={email}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </Layout>
  );
}

module.exports = EditProfile;

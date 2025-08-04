const React = require('react');
const Layout = require('../layouts/Layout');

function New(props) {
  return (
    <Layout>
      <h1> Create New User</h1>

      <form action={`/users?token=${props.token}`} method="POST">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select name="role" id="role">
            <option value="architect">Architect</option>
            <option value="client">Client</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Create User</button>
          <a href={`/users?token=${props.token}`} className="btn btn-secondary">← Back to Users</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = New;

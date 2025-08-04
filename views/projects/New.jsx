const React = require('react');
const Layout = require('../layouts/Layout');

function New(props) {
  return (
    <Layout>
      <h1> Add New Project</h1>

      <form action={`/projects?token=${props.token}`} method="POST">
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter project title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the project..."
            required
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Create Project</button>
          <a href={`/projects?token=${props.token}`} className="btn btn-secondary">← Back to Projects</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = New;

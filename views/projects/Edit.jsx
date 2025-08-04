const React = require('react');
const Layout = require('../layouts/Layout');

function EditProject(props) {
  const { _id, title, description } = props.project;
  const token = props.token;

  return (
    <Layout>
      <h1> Edit Project: {title}</h1>

      <form action={`/projects/${_id}?_method=PUT&token=${token}`} method="POST">
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            placeholder="Enter title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            placeholder="Describe the project..."
            required
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary"> Update</button>
          <a href={`/projects/${_id}?token=${token}`} className="btn btn-secondary">← Cancel</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = EditProject;

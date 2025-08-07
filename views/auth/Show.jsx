const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const user = props.user;
  const token = props.token;
  const projects = props.projects || [];

  return (
    <Layout token={token}>
      <h1> Profile: {user.name}</h1>

      <h2 className="mt-4">Your Projects</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <a href={`/projects/${project._id}?token=${token}`}>
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects uploaded yet.</p>
      )}

      <a href={`/projects?token=${token}`} className="btn btn-secondary mt-4">
        Back
      </a>
    </Layout>
  );
}

module.exports = Show;

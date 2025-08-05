const React = require('react');
const Layout = require('../layouts/Layout');

function Profile(props) {
  const user = props.user;
  const token = props.token;
  const projects = props.projects; // Receive all projects 

  return (
    <Layout token={token}>
      <h1>Architect: {user.name}</h1> {/* Display the architect's name */}

      <h2 className="mt-4">All Projects:</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <a href={`/projects/${project._id}?token=${token}`}>
              {project.title}
            </a>
          </li>
        ))}
      </ul>

      <a href={`/projects?token=${token}`} className="btn btn-secondary mt-4">
        Back to Projects
      </a>
    </Layout>
  );
}

module.exports = Profile;

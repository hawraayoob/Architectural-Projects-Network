const React = require('react');
const Layout = require('../layouts/Layout');

function Index(props) {
  const projects = props.projects;
  console.log('Projects:', projects);

  return (
    <Layout user={props.user} token={props.token}>
      <h1> All Projects</h1>

      <div className="d-flex justify-between align-center mb-3">
        <a href={`/projects/new?token=${props.token}`} className="btn btn-primary">
           Add New Project
        </a>
      </div>

      {projects.length === 0 ? (
        <div className="text-center">
          <p>You haven't posted any projects yet.</p>
          <a href={`/projects/new?token=${props.token}`} className="btn btn-primary">
            Start Your First Project
          </a>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description.slice(0, 100)}...</p>
              <div className="d-flex gap-2">
                <a href={`/projects/${project._id}?token=${props.token}`} className="btn btn-secondary"> View</a>
                {props.user._id.toString() === project.architect.toString()? <a href={`/projects/${project._id}/edit?token=${props.token}`} className="btn btn-primary"> Edit</a> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

module.exports = Index;

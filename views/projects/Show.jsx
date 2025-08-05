const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const project = props.project;

  return (
    <Layout>
      <h1> {project.title}</h1>

      <div className="project-card">
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Architect:</strong> {project.architect?.name}</p>


{project.image ? (
  <img
    src={`/uploads/${project.image}`}
    alt="Project Image"
    style={{ maxWidth: '100%', height: 'auto' }}
  />
) : (
  <p>No image uploaded for this project.</p>
)}

        

        <div className="d-flex gap-2 mt-3">
          <a href={`/projects?token=${props.token}`} className="btn btn-secondary">← Back to Projects</a>
          <a href={`/projects/${project._id}/edit?token=${props.token}`} className="btn btn-primary"> Edit Project</a>
        </div>

        <div className="mt-3">
          <form action={`/projects/${project._id}?_method=DELETE&token=${props.token}`} method="POST">
            <button type="submit" className="btn btn-danger"> Delete Project</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Show;

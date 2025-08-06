const React = require('react');
const Layout = require('../layouts/Layout');

function EditProject(props) {
  // const { _id, title, description } = props.project;
  const {  _id, authur, content, project} = props.comment;
  const token = props.token;

  return (
    <Layout token={props.token}>
      <h1>Edit Comment for {project.title}</h1>

      <form action={`/comments?token=${token}`} method="POST">
        <input type="hidden" name="project" value={projectId} />

        <div className="form-group">
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            name="content"
            placeholder="{}"
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              minHeight: '120px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Post Comment</button>
          <a href={`/projects/${projectId}?token=${token}`} className="btn btn-secondary">← Back to Project</a>
        </div>
      </form>

      {/* <form action={`/projects/${_id}?_method=PUT&token=${token}`} method="POST">
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
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              minHeight: '120px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Update</button>
          <a href={`/projects/${_id}?token=${token}`} className="btn btn-secondary">← Cancel</a>
        </div>
      </form> */}
    </Layout>
  );
}

module.exports = EditProject;
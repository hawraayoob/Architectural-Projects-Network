const React = require('react');
const Layout = require('../layouts/Layout');

function Edit(props) {
  const { _id, content, project } = props.comment;
  const token = props.token;

  return (
    <Layout token={token}>
      <h1>Edit Comment for {project.title}</h1>

      <form action={`/comments/${_id}?_method=PUT&token=${token}`} method="POST">
        <input type="hidden" name="project" value={project._id} />

        <div className="form-group">
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            name="content"
            defaultValue={content}
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
          <button type="submit" className="btn btn-primary">Update Comment</button>
          <a href={`/projects/${project._id}?token=${token}`} className="btn btn-secondary">← Back to Project</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = Edit;

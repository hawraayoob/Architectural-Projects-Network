const React = require('react');
const Layout = require('../layouts/Layout');

function New(props) {
  const projectId = props.projectId;
  const token = props.token;

  return (
    <Layout token={token}>
      <h1>Add New Comment</h1>

      <form action={`/comments?token=${token}`} method="POST">
        <input type="hidden" name="project" value={projectId} />

        <div className="form-group">
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your comment..."
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
    </Layout>
  );
}

module.exports = New;
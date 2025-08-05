const React = require('react');
const Layout = require('../layouts/Layout');

function EditComment(props) {
  const comment = props.comment;
  const token = props.token;
  const projectId = comment.project._id || comment.project;

  return (
    <Layout token={token}>
      <h1>Edit Comment</h1>
      <p>On project: <strong>{comment.project.title || 'Project'}</strong></p>

      <form action={`/comments/${comment._id}?_method=PUT&token=${token}`} method="POST">
        <input type="hidden" name="project" value={projectId} />
        
        <div className="form-group">
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            name="content"
            defaultValue={comment.content}
            placeholder="Update your comment..."
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
          <a href={`/projects/${projectId}?token=${token}`} className="btn btn-secondary">← Back to Project</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = EditComment;
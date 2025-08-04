const React = require('react');
const Layout = require('../layouts/Layout');

function New(props) {
  return (
    <Layout>
      <h1> Add New Comment</h1>

      <form action={`/comments?token=${props.token}`} method="POST">
        <input type="hidden" name="projectId" value={props.projectId} />

        <div className="form-group">
          <label htmlFor="text">Comment:</label>
          <textarea
            id="text"
            name="text"
            placeholder="Write your comment..."
            required
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary"> Post Comment</button>
          <a href={`/projects/${props.projectId}?token=${props.token}`} className="btn btn-secondary">← Back to Project</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = New;

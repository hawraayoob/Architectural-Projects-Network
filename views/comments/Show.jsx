const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const comment = props.comment;

  return (
    <Layout>
      <h1> Comment</h1>

      <div className="comment-card">
        <p>{comment.text}</p>
        <p><strong>Author:</strong> {comment.author?.name}</p>
        <p><strong>On Project:</strong> 
          <a href={`/projects/${comment.project?._id}?token=${props.token}`}> {comment.project?.title}</a>
        </p>

        <div className="d-flex gap-2 mt-3">
          <a href={`/comments?token=${props.token}`} className="btn btn-secondary">← Back to Comments</a>
          <a href={`/comments/${comment._id}/edit?token=${props.token}`} className="btn btn-primary"> Edit Comment</a>
        </div>

        <div className="mt-3">
          <form action={`/comments/${comment._id}?_method=DELETE&token=${props.token}`} method="POST">
            <button type="submit" className="btn btn-danger"> Delete Comment</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Show;

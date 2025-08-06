const React = require('react');
const Layout = require('../layouts/Layout');

function Index(props) {
  const comments = props.comments;

  return (
    <Layout token={props.token}>
      <h1> Comments</h1>

      {comments.length === 0 ? (
        <div className="text-center">
          <p>No comments yet.</p>
        </div>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <p>{comment.text}</p>
              <small>
                On project: <a href={`/projects/${comment.project._id}?token=${props.token}`}>{comment.project.title}</a> by {comment.author.name}
              </small>
              <div className="d-flex gap-2 mt-1">
                <a href={`/comments/${comment._id}/edit?token=${props.token}`} className="btn btn-primary"> Edit</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

module.exports = Index;

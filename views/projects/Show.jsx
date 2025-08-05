const React = require('react');
const Layout = require('../layouts/Layout');

function Show(props) {
  const project = props.project;
  const comments = props.comments || [];
  const token = props.token;

  return (
    <Layout token={token}>
      <h1>{project.title}</h1>

      <div className="project-card">
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Architect:</strong> {project.architect?.name}</p>

        {project.image && (
          <img
            src={`/uploads/${project.image}`}
            alt="Project Image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}

        <div className="d-flex gap-2 mt-3">
          <a href={`/projects?token=${token}`} className="btn btn-secondary">← Back to Projects</a>
          <a href={`/projects/${project._id}/edit?token=${token}`} className="btn btn-primary">Edit Project</a>
        </div>

        <div className="mt-3">
          <form action={`/projects/${project._id}?_method=DELETE&token=${token}`} method="POST">
            <button type="submit" className="btn btn-danger">Delete</button>
          </form>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section mt-4">
        <div className="d-flex justify-between align-center mb-3">
          <h2>Comments ({comments.length})</h2>
          <a href={`/comments/new/${project._id}?token=${token}`} className="btn btn-primary">
            Add Comment
          </a>
        </div>

        {comments.length === 0 ? (
          <div className="text-center">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment-card" style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                border: '1px solid #e9ecef'
              }}>
                <p><strong>{comment.author?.name}:</strong></p>
                <p>{comment.content}</p>
                <small style={{ color: '#6c757d' }}>
                  {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
                </small>
                
                <div className="d-flex gap-2 mt-2">
                  <a 
                    href={`/comments/${comment._id}/edit?token=${token}`} 
                    className="btn btn-primary" 
                    style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}
                  >
                    Edit
                  </a>
                  <form 
                    action={`/comments/${comment._id}?_method=DELETE&token=${token}`} 
                    method="POST" 
                    style={{ display: 'inline' }}
                  >
                    <button 
                      type="submit" 
                      className="btn btn-danger" 
                      style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this comment?')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

module.exports = Show;
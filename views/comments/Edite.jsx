const React = require('react');
const Layout = require('../layouts/Layout');

function EditComment(props) {
  const { _id, text, project } = props.comment;
  const token = props.token;

  return (
    <Layout>
      <h1> Edit Comment on "{project.title}"</h1>

      <form action={`/comments/${_id}?_method=PUT&token=${token}`} method="POST">
        <div className="form-group">
          <label htmlFor="text">Comment:</label>
          <textarea
            id="text"
            name="text"
            defaultValue={text}
            placeholder="Update your comment..."
            required
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary"> Update</button>
          <a href={`/projects/${project._id}?token=${token}`} className="btn btn-secondary">← Back</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = EditComment;

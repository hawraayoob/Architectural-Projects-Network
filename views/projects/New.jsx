const React = require('react');
const Layout = require('../layouts/Layout');

function New(props) {
  return (
    <Layout token={props.token}>
      <script
        //scripy for uploading the photo
          dangerouslySetInnerHTML={{
            __html: `
              function previewImage(event) {
                const preview = document.getElementById('preview');
                preview.src = URL.createObjectURL(event.target.files[0]);
                preview.style.display = 'block';
              }
            `,
          }}
        />
      <h1> Add New Project</h1>

      {/* Set enctype for file upload */}
      <form action={`/projects?token=${props.token}`} method="POST" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter project title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the project..."
            required
          ></textarea>
        </div>

        {/* New Image Upload  */}
        <div className="form-group">
          <label htmlFor="image">Project Image:</label>
          {/* <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
          /> */}
          <input type="text" 
          name='image'
          id='image'
          required/>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Create Project</button>
          <a href={`/projects?token=${props.token}`} className="btn btn-secondary">← Back to Projects</a>
        </div>
      </form>
    </Layout>
  );
}

module.exports = New;

const React = require('react');
const Layout = require('../layouts/Layout');

function Edit({ project, token }) {
  return (
    <Layout title="Edit Project">
      <div className="container">
        <h1>Edit Project</h1>

        <form
          action={`/projects/${project._id}?_method=PUT&token=${token}`}
          method="POST"
          encType="multipart/form-data" //  allow image upload
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={project.title}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={project.description}
              required
            />
          </div>

          {/*  Optional: Show current image */}
          {project.image && (
            <div className="form-group">
              <label>Current Image</label>
              <br />
              <img
                src={`/uploads/${project.image}`}
                alt="Project"
                style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
              />
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
                defaultValue={project.image}

                required/>
              </div>
            </div>
          )}


          <button type="submit" className="btn btn-primary">Update Project</button>
        </form>
      </div>
    </Layout>
  );
}

module.exports = Edit;

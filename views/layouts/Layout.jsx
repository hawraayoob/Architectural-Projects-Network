const React = require('react');

function Layout(props) {
// title of page due to opn proj
    const title = props.title || 'Architectural Portfolio App';

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </head>
      
      <body>
        <header>
         <h1> ArchFolio </h1>

          <nav>

            <a href={`/SignIn?token=${props.token || ''}`}>SignIn</a> |{' '}
            <a href={`/projects?token=${props.token || ''}`}>Projects</a> |{' '}
            <a href={`/comments?token=${props.token || ''}`}>Comments</a> |{' '}
            <a href={`/profile?token=${props.token || ''}`}>Profile</a>
          </nav>
        </header>

        <main className="container">
          {props.children}
        </main>

        <footer>
          <p> Architectural Portfolio 2025 </p>
        </footer>
      </body>
    </html>
  );
}

module.exports = Layout;

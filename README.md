# Lumina-Interview-Project

The program generates a webpage that takes the users first name and last name, returning their favourite movies in a table. There is also the option to add a new movie to the list of favourite movies, as well as delete them. The user can also delete their entry in the database. The user is automatically deleted if they have deleted all movies from their favourites list.

Backend - NodeJS
Database - PostgreSQL
Frontend - ReactJS

How to test:
Install the libraries in the server and client folders separately.
Start the backend by 'npm start' in the server folder.
Load the webpage by 'npm start' in the client folder.

Known Errors:
Currently, there is no authentication. This can mean that typos result in additional users being created. While not necessarily a bug, this can make managing the database problematic.

Next Steps:
Implement a method of authentication.
Change the CSS files to give the webpage a nicer appearance.
Implement banners and alerts to confirm with the user the actions that they have taken.

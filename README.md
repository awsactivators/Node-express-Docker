# Node-express-Docker

Building a node express app with mongo and Redis database within a docker container

In this project, I created a demo node-express blog app, MongoDB for storing data via API, and Redis for authentication. All three are in different containers and called in the docker-compose file under service.
	

Workflow 

	- In order to create a custom image based it off the node docker image from docker hub, and copying all my source code into it, and then installed the necessary dependencies. I created a dockerfile 
	- I used a bind mount volume to handle persistent data in my containers, this bind mount allows us to sync a folder/file in our localhost machine and then to a folder within our docker container. (i.e. you don’t have to rebuild the image and redeploy a container, every time you make a change it will automatically sync those files in order to speed up the development process). I did this in the dockerfile
	- To preserve the /app /node-modules I made sure the bind mount doesn’t override the /node-module folder within the app directory by specifying an anonymous volume
	-  I use a named anonymous volume to make the MongoDB volume data readable to know which data is storing that volume in case of an accidental delete that way you don’t delete important data.
	- I installed nodemon to look at the code and if there are any changes it's going to restart the process so that the changes are updated in real-time
	- Used environment variable within docker containers so that it gets updated automatically, specified the port value in the dockerfile
	- I Set up the express application to connect/interact with MongoDB by installing mongoose and importing it into the index.js file
	- Used the depends_on config in the node-app service in the shared docker-compose file to make sure docker loads up the mongo instance first to ensure that it is up and running only then does the node-app container can connect to it if not Mongo will fail.
	- Added Redis service to docker-compose, installed and imported Redis and express-session
	- I set up a user signup and login functionality using Redis and installed a library called bcryptjs that helps to hash the password
	- I enabled CORS (which means to allow the frontend to run on the domain and backend API to run on a different domain), I Installed and imported the CORS library
	- To Deploy to the production environment, I spun up an AWS ubuntu server via CLI and installed docker and docker-compose. 
	- Exported the environment variables located in the prod docker-compose life in the production server using the export command in order not to hard code those variables.
	- Set up my GitHub repository for the application and pushed all the files to it
	
What happens:
When the developer pushes to GitHub, the production server pulls it (git pull) to get the updated code then run docker-compose --build to rebuild the node image and once the image is built we can rebuild a brand new node container using the new node image.

However, I don’t want the image to be built in the production server because it takes resources like CPU and memory. The production server basically is to handle production like creating a container.

The best way:
The engineer is going to build the image on the development server using docker-compose up --build, then push the newly built image to docker hub and the production server is going to do a pull of the new image, then perform a docker-compose up which creates a new container since the image is already created in the development server.

	- I created an account in dockerhub and a repository for pushing the image
	- I used a tool called WATCHTOWER which automatically checks dockerhub periodically for a new image that gets pushed, that way automating the production server to detect that a new image is pushed and pulls it from dockerhub to create a container.

This comes with a problem:
Docker-compose can't perform an upgrade process or push out new changes to our production server via rolling update without experiencing loss.

Partial solution:
I used  a built-in  container orchestration that comes with docker called docker swarm (it can spin up containers, distribute them across many services, and perform rolling updates)

	- I set up the docker swarm and enabled it by initializing it.
	
Better solution for rolling updates:
By using an orchestration tool like Kubernetes.


Configuration files

	- Dockerfile                 #for our custom image
	- Index.js                      #for the express application
	- .dockerignore file     #for files that shouldn’t be added to the docker hub
	- docker-compose.yml      #for shared configurations between development and production environment
	- docker-compose.dev.yml     #for development configurations
	- docker-compose.prod.yml    #for production configurations
	- /config/config.js     #to store variables that hold all the environment variables instead of hard coding
	- /models/postModel.js    #to store mongoose
	- /models/userModel.js    #to setup user sign-in and login functionality
	- /controller/postController.js   #to handle the creation, reading, updating, and deleting of the posts
	- /controller/authController.js   #for user authentication
	- /routes/postRoutes.js   #to define the router
	- /routes/userRoutes.js  #router signup and login for users
	- /middleware/authMiddleware.js    # to make sure that for a user to either create or delete or update a post they have to be logged in
	- /nginx/default.conf    #to add the proxy server
	- .gitignore     #not to include node_modules folder to GitHub


Installations

	- Install docker and docker-compose
	- sudo apt install npm
	- npm init   #to get the pacakage.json
	- npm install express   #to create the express app/dependency/node_modules folder
	- npm install cors
	- npm install redis connect-redis express-session
	- npm install bcryptjs
	- npm install mongoose
	- npm install nodemon --save-dev
![image](https://user-images.githubusercontent.com/108244068/192049497-c9e56648-3cc9-492c-8bd5-e3c34474ec24.png)

#download base image from docker hub
FROM node:18 
#set our directory of our container to be /app
WORKDIR /app  
#copy package dependency to workdir /app or .
COPY package.json .
#to install express (at image build time)
RUN npm install  
#copy everything to working dir ./

#if in dev env run npm install else install npm in only prod
#the arg gets passed to our dockerfile when its building the docker image
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production;\
        fi

COPY . ./app
#creating default port env var
ENV PORT 3000
#container to expose port 3000
EXPOSE $PORT
#what command the app to run (at image docker runtime)
CMD ["node", "index.js"]


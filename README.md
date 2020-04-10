# Installation

Go to the root folder and: 

```
npm install
```

Next, install client and api packages, by going to: 

```
cd api/
npm install 
cd ..
cd client/
npm install
```

Then in root folder you can run `npm start` and both, client and api, will start. 

## Using Docker

It is possible to build the project using docker. The docker files can be found in the root of the folder `api/` and `client/`. There will be 2 seperate docker containers running, which can also be used for develpment if needed.

First step is to build the images: 

for `api`:

`$ docker build -t api:dev`

for `client`:

```$ docker build -t client:dev```

After images are build we can simply run them: 

```$ docker run -it -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm client:dev```

```$ docker run -it -v ${PWD}:/app -v /app/node_modules -p 9000:9000 --rm api:dev```

after that navigate to `https://localhost:3000` and the project should be up and running.

**Short Explanation** 

1. The `docker run` command creates a new container instance from the image.
2. `-it` makes the terminal interactive so we can stop it / terminate it by doing CTRL+C
3. `-v ${PWD}:/app` mounts the code into the container to “/app”.
4. Snce we want to use the container version of the “node_modules” folder, we configured another volume: `-v /app/node_modules`, which means our docker will use its own node_modules folder.
5. `-p 3000:3000` and `-p 9000:9000` exposes port 3000/9000 to other Docker containers and 3000/9000 for the host. I used same ports in this case for simplicity
6. `--rm` removes the container and volumes after the container exits.

# Testing

To run tests go to `cd api/` and run `npm test`.

Currently the tests are based on the API calls in the Controller functions. For this case I believe it is enough, however better tests with different URLs are also something to improve.


# Development process

The app consists of an API and frontend. The Frontned makes 4 requests during the analysis of the website.

Those requests are: 

- **init** - Step which does the initial request, loads the raw Website and URL and sends it back to the frontend.
- **validation** - This initially was not supposed to be like it is now, I just used the html validation to get the version of the HTML, however I saw the opportunity to also check for HTML errors and display them too.
(Also the HTML version can be either `HTML 5` or `HTML legacy version`, since I can not really pinpoint which version of HTML is being used besides 'old' and 'new')
- **pictures** - Currently the slowest step in this process, because there are websites with a lot of images and sometimes it does take a long time load
- **links** - returns sorted links by internal and external ones from the website

After every step, we check if the response is ok. If not, it will display an error message, or if the response is empty or without data, the data will not be shown.












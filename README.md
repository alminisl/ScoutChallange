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

It is possible to build the project using docker. You can find the docker files in the root of the folder `api/` and `client/`. They will be 2 seperate docker containers running, and you can also use them for development if needed. 

First step is to build the images: 

for `api`:

`$ docker build -t api:dev`

for `client`:

```$ docker build -t client:dev```

After we build our images we can simply run them: 

```$ docker run -it -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm client:dev```

```$ docker run -it -v ${PWD}:/app -v /app/node_modules -p 9000:9000 --rm api:dev```

after that just navigate to `https://localhost:3000` and the project should be up and running.

**Short Explanation** 

1. The `docker run` command creates a new container instance from the image.
2. `-it` makes the terminal interactive so we can stop it / terminate it by doing CTRL+C
3. `-v ${PWD}:/app` mounts the code into the container to “/app”.
4. Snce we want to use the container version of the “node_modules” folder, we configured another volume: `-v /app/node_modules`, which means our docker will use its own node_modules folder.
5. `-p 3000:3000` and `-p 9000:9000` exposes port 3000/9000 to other Docker containers and 3000/9000 for the host. I used same ports in this case for simplicity
6. `--rm` removes the container and volumes after the container exits.

Improvements: Add docker-compose so that we can run these containers with 1 command

# Testing

Currently the only tests are based on the API calls our Controller functions. For this case I think it is enough however better test cases could also be to test end to end with different URLs.


# Development process


The app consists of an API and frontend. The Frontned does 4 requests during the analysis of the website.

Those requests are: 

- **init** - Step which does the initial request, loads the raw Website and Url and sends it back to the frontend.
- **validation** - This initially was not supposed to be like it is now, I just used the html validation to get the version of the HTML, however I saw the opportunity to also check for HTML errors and display them too.
(Also the HTML version can be either `HTML 5` or `HTML legacy version`, since I can not really pinpoint which version of HTML is being used besides 'old' and 'new')
- **pictures** - Currently the slowest step in this process, because there are websites with a lot of images and sometimes it does take a long time
- **links** - returns sorted links by internal and external ones from the website

After every step we check if the response is ok, if not it will display error message, or if the response is empty with data the data will not be shown. 

## Improvements

### Website caching
One of the biggest improvements to make is to use some kind of caching. Currently there is no Data persistence. For example we could use `redis` to make the website HTML persist in it and cache for later use, even the results maybe, but now I'm sending on every step the whole website object since for some reason I could not make express sessions work to persist my data. 

So for now on bigger websites with a lot of DOM elements it can get really slow. 

### Image fetching / checking the size

This is also something I would investigate more on how to make it more optimized when checking the image sizes. Currently it's very slow and knows to timeout sometimes. 


### Tests, improve, expand

Like mentioned above, add more tests and make it possible to load multiple URLs

### UI / UX

The whole frontend is fine, however it could be more readable and more smooth with maybe some animations and not just "popin" of elements. Also there is sometimes an issue where you have to refresh page to call a new website, not sure what causes this issue yet.









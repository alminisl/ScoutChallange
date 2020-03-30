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

**Improvements:** Add docker-compose so that we can run these containers with 1 command

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

## Improvements

### Website caching

One of the biggest improvements to make is to use some kind of caching. Currently there is no Data persistence. For example we could use `redis` to make the website HTML persist in it and cache for later use. Currently on every step I'm sending the whole website as HTML since, for some reason, I could not make express sessions work to persist my data.

Therefore, currently it can get slow on bigger website with a lof of DOM elements.

### Image fetching / checking the size

This is also something I would further investigate, on how to make it more optimized when checking the image sizes. Currently it's a bit slow and tends to timeout.

### Tests, improve, expand

Like mentioned above, adding more tests and make it possible to load multiple URLs. Also more diverse tests, like end to end test, should be added with more unit tests.

### UI / UX

The whole frontend is fine, however it could be more readable and more smooth with maybe some animations and not just "pop-in" of elements. Also there is sometimes an issue where you have to refresh the page to call a new website - not sure what causes this issue yet.

### How to make it work with Spa.. 

The first thing that comes to mind is to use Headless chrome, for example. Wait for all the network traffic to finish loading, and THEN get the HTML from the website where probably everything should be loaded.

## Production ready, Secured, Scalable, Faster

Iron out some smaller bugs, make the visuals more appealing (maybe get a designer to help with this a bit), make caching work, setup docker containers with compose so we can easily deploy or redeploy where needed. 

Currently the app has same basic security with https, however, what else we could do is to configure the CORS, so that only our frontend can access the API. Something to consider too, is rate limits. A rate limit is the number of API calls an app or user can make within a given time period. Setting this up would help with security but also performance. Increasing test coverage to near 100% (as much as possible) would greatly enchance the app security and development speed.

Some ground work for scalability is done. We have the docker containers and in the code of the API everything is seperated, so adding new steps and updating the current ones should not be too challanging. Using caching and also caching the most used websites would greatly improve the performance of the app.

Some improvements on the React side of things would be to add a State manager, maybe not redux but at least Context API. Currently the App.js component is the one who propagates the state to the lower components. Also the components should be refactored so that they are responsible for their own state and displaying data.










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

# Testing

Currently the only tests are based on the API calls.


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

Currently the tests are only for the API, which are not ideal.. 

### UI / UX

The whole frontend is fine, however it could be more readable and more smooth with maybe some animations and not just "popin" of elements. 









# roamjs-daily-zettles

A [RoamJS] plugin that generates a random list of three links from pages that contain the `#zettles` tag.

It looks like this:

![screenshot](screenshot.png)


## Running locally

### Starting the server

First, install [just]. Then do:

```
just run
```

### Loading the JS into your Roam graph

1. On one of your Roam pages, add a line with this:

```
{{[[roam/js]]}}
```

2. Create a child  of the above as a code block, with this code:

```js
const id = "daily-zettles";
const existing = document.getElementById(id);
if (!existing) {
  const extension = document.createElement("script");
  extension.src = "http://localhost:8000/main.js";
  extension.id = id;
  extension.async = true;
  extension.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(extension);
}
```


[just]: https://just.systems/man/en/
[RoamJS]: https://roamjs.com/
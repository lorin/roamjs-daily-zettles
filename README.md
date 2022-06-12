# roamjs-daily-zettles

A [RoamJS] plugin that generates a random list of three links from pages that contain the `#zettles` tag.

It adds the list to the top of your "today" page.

It looks like this:

![screenshot](screenshot.png)

This was inspired by the [serendipity] plugin

## Running

1. Create a block with the following text on any page in your graph.

```
{{[[roam/js]]}}
```

2. Create a single child as a code block, with this code:

```js
const id = "daily-zettles";
const existing = document.getElementById(id);
if (!existing) {
  const extension = document.createElement("script");
  extension.src = "https://lorinhochstein.org/roamjs-daily-zettles/extension.js";
  extension.id = id;
  extension.async = true;
  extension.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(extension);
}
```


## Local development

### Starting the server

First, install [just]. Then do:

```
just run
```

### Loading the JS into your Roam graph

1. Create a block with the following text on any page in your graph.

```
{{[[roam/js]]}}
```

2. Create a single child as a code block, with this code:

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
[serendipity]: https://roamjs.com/extensions/serendipity
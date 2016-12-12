# Audio Book Guided Reading Demonstration

## Install

```bash
$ git clone git@gitlab.com:patrickfatrick/closed-captioning-demo-react.git
$ yarn
$ yarn run quiet
```

Navigate to localhost:8080.

[Yarn](https://yarnpkg.com) is a new package manager that is more secure than npm since it uses a lock file, but you can also `npm install` just as usual. To get verbose logging in the console of any state changes (using [redux-logger](https://github.com/evgenyrodionov/redux-logger)), run it with `yarn run dev` or `npm run dev`.

## What is it?

This is a demonstration of a guided reading experience using React and Redux. The book (in this case the first three chapters of _Alice's Adventure's in Wonderland_) is actually just a JSON interpretation of the book, which the client then builds the book UI out of. With the same JSON schema any book could be dropped in theoretically. (The JSON file for the demo is located at data/data.json)

The demo includes the following features:

- An audio reading of the book provided by LibriVox [here](https://librivox.org/alices-adventures-in-wonderland-dramatic-reading-by-lewis-carroll/)
- When audio is turned on, lines are highlighted to follow along with the reading.
- Auto-scroll can be turned on when the reading is enabled.
- You can select any line of the book to jump to it in the reading.
- Since the book is just one long sheet instead of multiple pages, the navbar at the top displays the current chapter (at some point I will likely put in aa jump-to-chapter feature there)

## Architecture

State is handled in a typical Redux fashion with actions, action creators, and reducers. The state tree is fully immutable (no immutable.js here, just returning clones of the state tree throughout). Also uses the concept of smart and dumb components espouses by Redux. The wrappers folder contains the smart components that have access to the state and actions, the components folder contains the "dumb" components that are bound to the smart components using `connect`. 

Data and assets are all retrieved by the client, using the `fetch` API (which polyfilled by isomorphic-fetch).

Styles are inline in the JSX (I would like to investigate better ways of doing this, but for the purposes of the demo it works okay).

This component library is possible to acquire asynchronous data before rendering. this is like next.js :policeman:

I have made [`async-react-router`](https://github.com/oneut/async-react-router) like Routing of Next.js in the past.
But, that library is very complicated.
In order to make it more simple, I made `next-props` as a component library, not routing library.

# Feature
+ This is component library of React.
+ Support React version 16.
+ Support async/await like next.js.
+ No depend on react-router.
+ No depend on rxjs.
    + But, You can combine asynchronous library like rxjs.
+ No Support SSR.
    + But, I may be able to implement SSR with this library.

# Demo
+ [with React Router](https://oneut.github.io/next-props/with-react-router)
+ [with Redux](https://oneut.github.io/next-props/with-redux)

# Example
```javascript
import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import NextProps from "next-props";

// Sleep
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class Home extends React.Component {
    static async getInitialProps(props) {
        await sleep(1000);
        return {
            message: 'Home is one second sleep.'
        };
    }

    render() {
        return (
            <div>{this.props.message}</div>
        );
    };
}

render(
    (
        <HashRouter>
            <Switch>
                <Route path="/" exact render={(props) => <NextProps {...props} component={Home} />} />
            </Switch>
        </HashRouter>
    ),
    document.getElementById('app')
);
```

# API
To be written.
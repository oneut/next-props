This react component library is possible to get asynchronous data before rendering. this is like next.js :rocket:

I have made [`async-react-router`](https://github.com/oneut/async-react-router) like Routing of Next.js in the past.
But, that library is very complicated.
In order to make it more simple, I made `next-props` as a component library, not routing library.
Instead, SSR is not supported.

# Feature
+ This is component library of React.
+ Support React version 16.
+ Support async/await like next.js.
+ No depend on react-router.
+ No depend on rxjs.
    + But, You can combine asynchronous library like rxjs.
+ No Support SSR.
    + In the case of SSR, it is not possible to deal with asynchronous because it relies on routing.
    + Asynchronous is very difficult...
+ Support view for initial rendering.

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
## NextProps props
### props.component

You specify the component you want to get data asynchronously.

```javascript
<NextProps component={HomeComponent}/>
```

## Function in props.component of NextProps
### component.getInitialProps(props)

You can get data considering async / await using `getInitialProps(props)`.

```javascript
class HomeComponent extends React.Component {
    static async getInitialProps(props) {
        await sleep(1000);
        return {
            message: 'Home is one second sleep.'
        };
    }
}
```

### component.initialPropsWillGet()

`initialPropsWillGet()` is called before `getInitialProps(props)`.  
async/await is not supported.

```javascript
class HomeComponent extends React.Component {
    initialPropsWillGet() {
        console.log("before `getInitialProps()`");
    }
}
```

### component.initialPropsDidGet()

`initialPropsDidGet()` is called after `getInitialProps(props)`.  
async/await is not supported.

```javascript
class HomeComponent extends React.Component {
    initialPropsDidGet() {
        console.log("before `getInitialProps()`");
    }
}
```

## NextProps Hook API
### NextProps.streamer((load, setInitialProps) => any)

You can use this hook api to control the asynchronous order.
The example is RxJS.

```javascript
// Set RxJS
import { Subject } from "rxjs";
const stream = new Subject();

NextProps.streamer = (load, setInitialProps) => {
    stream
        .switchMap(load)
        .subscribe(setInitialProps);
};
```

`load` is Promise to handle `getInitialProps(props)`.  
`setInitialProps` set the data acquired by `load` as initialProps.

### NextProps.fireStreamer(() => any)

Setting `NextProps.streamer` makes it `Observable`, so you also need to set fire.

```javascript
NextProps.fireStreamer = () => {
    stream.next();
};
```

### NextProps.firstRender(() => any)

Rendering does not stop even if it is asynchronous.
Please use this function if you want to make it a specific view during initial rendering.

```javascript
NextProps.firstRender = () => {
  return (
      <div className="text-center" style={{margin: "100px 0"}}>
          <i className="fa fa-cog fa-spin fa-5x fa-fw"/>
      </div>
  );
};
```

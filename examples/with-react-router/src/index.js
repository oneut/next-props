import NProgress from "nprogress";
import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import NextProps from "next-props";
import "nprogress/nprogress.css";
import { Subject } from "rxjs";

// Set RxJS
const stream = new Subject();

class NextPropsWrapper extends React.Component {
    streamer(load, setInitialProps) {
        stream
            .switchMap(load)
            .subscribe(setInitialProps);
    }

    fireStreamer() {
        stream.next();
    }

    render() {
        return (
            <NextProps
                streamer={this.streamer.bind(this)}
                fireStreamer={this.fireStreamer.bind(this)}
                {...this.props}
            />
        );
    }
}

// Sleep
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// React Component
class Home extends React.Component {
    static initialPropsWillGet() {
        NProgress.remove();
        NProgress.start();
        NProgress.set(0);
    }

    static async getInitialProps(props) {
        console.log('getInitialProps() called...');
        await sleep(1000);
        return {
            message: 'Home is one second sleep.'
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <p>
                    This sample uses async / await to control sleep.
                </p>
                <p>
                    {this.props.message}
                </p>
                <ul>
                    <li>
                        <Link to="/page">Page Index</Link>
                        <ul>
                            <li><Link to="/page/1">Page 1</Link></li>
                            <li><Link to="/page/2">Page 2</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    };
}

class PageIndex extends React.Component {
    static initialPropsWillGet() {
        NProgress.remove();
        NProgress.start();
        NProgress.set(0);
    }

    static async getInitialProps(props) {
        console.log('getInitialProps() called...');
        await sleep(2000);
        return {
            message: 'Page Index is two second sleep.'
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    render() {
        return (
            <div>
                <h2>Page Index</h2>
                <p>
                    {this.props.message}
                </p>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/page">Page Index</Link>
                        <ul>
                            <li><Link to="/page/1">Page 1</Link></li>
                            <li><Link to="/page/2">Page 2</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    };
}

class Page extends React.Component {
    static initialPropsWillGet() {
        NProgress.remove();
        NProgress.start();
        NProgress.set(0);
    }

    static async getInitialProps(props) {
        console.log('getInitialProps() called...');
        await sleep(3000);
        return {
            message: `Page [${props.match.params.pageId}] is three second sleep.`
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    render() {
        return (
            <div>
                <h2>Page is {this.props.match.params.pageId}</h2>
                <p>
                    {this.props.message}
                </p>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/page">Page Index</Link>
                        <ul>
                            <li><Link to="/page/1">Page 1</Link></li>
                            <li><Link to="/page/2">Page 2</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    };
}

render(
    (
        <HashRouter>
            <Switch>
                <Route path="/" exact render={(props) => <NextPropsWrapper {...props} component={Home} />} />
                <Route path="/page" exact render={(props) => <NextPropsWrapper {...props} component={PageIndex} />} />
                <Route path="/page/:pageId" exact render={(props) => <NextPropsWrapper {...props} component={Page} />} />
            </Switch>
        </HashRouter>
    ),
    document.getElementById('app')
);

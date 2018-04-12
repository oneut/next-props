import React from "react";
import {render} from "react-dom";
import {HashRouter, Route, Switch} from 'react-router-dom';
import NextProps from "next-props";
import IndexPage from "./pages/IndexPage";
import ItemPage from "./pages/ItemPage";
import NewsPage from "./pages/NewsPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.min.css";
import "nprogress/nprogress.css";
import {Subject} from "rxjs";

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

    firstRender() {
        return (
            <div className="text-center" style={{margin: "100px 0"}}>
                <i className="fa fa-cog fa-spin fa-5x fa-fw"/>
            </div>
        );
    }

    render() {
        return (
            <NextProps
                streamer={this.streamer.bind(this)}
                fireStreamer={this.fireStreamer.bind(this)}
                firstRender={this.firstRender.bind(this)}
                {...this.props}
            />
        );
    }
}

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact render={(props) => (<NextPropsWrapper {...props} component={IndexPage}/>)}/>
                <Route path="/news/:page?" exact render={(props) => (<NextPropsWrapper {...props} component={NewsPage}/>)}/>
                <Route path="/item/:itemId" exact render={(props) => (<NextPropsWrapper {...props} component={ItemPage}/>)}/>
                <Route path="/user/:userId" exact render={(props) => (<NextPropsWrapper {...props} component={UserPage}/>)}/>
                <Route render={(props) => (<NextPropsWrapper {...props} component={NotFoundPage}/>)}/>
            </Switch>
        </HashRouter>
    );
}

render(
    (<App/>),
    document.getElementById('app')
);

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
import { Subject } from "rxjs";

// Set RxJS
const stream = new Subject();

NextProps.streamer = (load, setInitialProps) => {
    stream
        .switchMap(load)
        .subscribe(setInitialProps);
};

NextProps.fireStreamer = () => {
    stream.next();
};

NextProps.firstRender = () => {
  return (
      <div className="text-center" style={{margin: "100px 0"}}>
          <i className="fa fa-cog fa-spin fa-5x fa-fw"/>
      </div>
  );
};

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact render={(props) => (<NextProps {...props} component={IndexPage}/>)}/>
                <Route path="/news/:page?" exact render={(props) => (<NextProps {...props} component={NewsPage}/>)}/>
                <Route path="/item/:itemId" exact render={(props) => (<NextProps {...props} component={ItemPage}/>)}/>
                <Route path="/user/:userId" exact render={(props) => (<NextProps {...props} component={UserPage}/>)}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </HashRouter>
    );
}

render(
    (<App/>),
    document.getElementById('app')
);

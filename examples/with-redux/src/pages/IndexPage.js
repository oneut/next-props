import NProgress from "nprogress";
import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import indexRootReducer from "../rootReducers/index";
import IndexContainer from "../containers/IndexContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import NotFoundPage from "./NotFoundPage";
import ItemsAction from "../actions/ItemsAction";

export default class IndexPage extends React.Component {
    static initialPropsWillGet() {
        NProgress.start();
    }

    static async getInitialProps() {
        return {
            items: await HackerNewsApi.getTopStoryItems()
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    constructor(props) {
        super(props);
        this.store = createStore(indexRootReducer);
    }

    render() {
        if (!this.props.items) {
            return null;
        }

        // Asynchronous!
        this.store.dispatch(ItemsAction.sync(this.props.items));

        return (
            <Provider store={this.store}>
                <IndexContainer/>
            </Provider>
        );
    }
}
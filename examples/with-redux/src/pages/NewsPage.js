import NProgress from "nprogress";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import newsRootReducer from "../rootReducers/news";
import NewsContainer from "../containers/NewsContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import NotFoundPage from "./NotFoundPage";
import ItemsAction from "../actions/ItemsAction";


export default class NewsPage extends React.Component {
    static initialPropsWillGet() {
        NProgress.start();
    }

    static async getInitialProps(props) {
        if (isNaN(parseFloat(props.match.params.page)) || !(isFinite(props.match.params.page))) {
            return {
                items: [],
            };
        }

        const page  = props.match.params.page || 1;
        return {
            items: await HackerNewsApi.getTopStoryItems(page)
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    constructor(props) {
        super(props)
        this.store = createStore(newsRootReducer)
    }

    render() {
        if (!this.props.items.length) return (<NotFoundPage/>);

        // Asynchronous!
        this.store.dispatch(ItemsAction.sync(this.props.items));

        return (
            <Provider store={this.store}>
                <NewsContainer match={this.props.match}/>
            </Provider>
        );
    }
}
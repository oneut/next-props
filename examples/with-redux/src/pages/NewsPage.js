import NProgress from "nprogress";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import newsRootReducer from "../rootReducers/news";
import NewsContainer from "../containers/NewsContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import NotFoundPage from "./NotFoundPage";
import ItemsAction from "../actions/ItemsAction";

const store = createStore(newsRootReducer);

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

    static initialPropsDidGet(props) {
        store.dispatch(ItemsAction.sync(props.items));
        NProgress.done();
    }

    render() {
        if (!this.props.items.length) return (<NotFoundPage/>);

        return (
            <Provider store={store}>
                <NewsContainer match={this.props.match}/>
            </Provider>
        );
    }
}
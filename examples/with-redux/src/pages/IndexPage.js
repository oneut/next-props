import NProgress from "nprogress";
import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import indexRootReducer from "../rootReducers/index";
import IndexContainer from "../containers/IndexContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import ItemsAction from "../actions/ItemsAction";

const store = createStore(indexRootReducer);

export default class IndexPage extends React.Component {
    static initialPropsWillGet() {
        NProgress.start();
    }

    static async getInitialProps() {
        return {
            items: await HackerNewsApi.getTopStoryItems()
        };
    }

    static initialPropsDidGet(props) {
        store.dispatch(ItemsAction.sync(props.items));
        NProgress.done();
    }

    render() {
        return (
            <Provider store={store}>
                <IndexContainer/>
            </Provider>
        );
    }
}
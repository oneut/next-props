import NProgress from "nprogress";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import itemRootReducer from "../rootReducers/item";
import ItemContainer from "../containers/ItemContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import NotFoundPage from "./NotFoundPage";
import ItemAction from "../actions/ItemAction";

export default class ItemPage extends React.Component {
    static initialPropsWillGet() {
        NProgress.start();
    }

    static async getInitialProps(props) {
        return {
            item: await HackerNewsApi.findItem(props.match.params.itemId)
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    constructor(props) {
        super(props);
        this.store = createStore(itemRootReducer);
    }

    render() {
        if (!this.props.item) return (<NotFoundPage/>);

        // Asynchronous!
        this.store.dispatch(ItemAction.newInstance(this.props.item));

        return (
            <Provider store={this.store}>
                <ItemContainer />
            </Provider>
        );
    }
}
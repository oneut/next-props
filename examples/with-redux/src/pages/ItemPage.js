import NProgress from "nprogress";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import itemRootReducer from "../rootReducers/item";
import ItemContainer from "../containers/ItemContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import NotFoundPage from "./NotFoundPage";
import ItemAction from "../actions/ItemAction";

const store = createStore(itemRootReducer);

export default class ItemPage extends React.Component {
    static initialPropsWillGet() {
        NProgress.start();
    }

    static async getInitialProps(props) {
        return {
            item: await HackerNewsApi.findItem(props.match.params.itemId)
        };
    }

    static initialPropsDidGet(props) {
        store.dispatch(ItemAction.newInstance(props.item));
        NProgress.done();
    }

    render() {
        if (!this.props.item) return (<NotFoundPage/>);

        return (
            <Provider store={store}>
                <ItemContainer />
            </Provider>
        );
    }
}
import NProgress from "nprogress";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userRootReducer from "../rootReducers/user";
import UserContainer from "../containers/UserContainer";
import HackerNewsApi from "../api/HackerNewsApi";
import NotFoundPage from "./NotFoundPage";
import UserAction from "../actions/UserAction";

export default class UserPage extends React.Component {
    static initialPropsWillGet() {
        NProgress.start();
    }

    static async getInitialProps(props) {
        return {
            user: await HackerNewsApi.findUser(props.match.params.userId)
        };
    }

    static initialPropsDidGet() {
        NProgress.done();
    }

    constructor(props) {
        super(props);
        this.store = createStore(userRootReducer);
    }

    render() {
        if (!this.props.user) return (<NotFoundPage/>);

        // Before binding store!
        this.store.dispatch(UserAction.newInstance(this.props.user));

        return (
            <Provider store={this.store}>
                <UserContainer match={this.props.match}/>
            </Provider>
        );
    }
}
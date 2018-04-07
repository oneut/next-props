import React from "react";
import { Observable } from "rxjs";
import HackerNewsApi from "../../api/HackerNewsApi";
import CommentComponent from "./CommentComponent";
import { Link } from "react-router-dom";

export default class ItemComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.commentApiStream = null;
    }

    componentDidMount() {
        this.setState({isLoading: true});

        this.commentApiStream = Observable.fromPromise(HackerNewsApi.getComments(this.props.item.kids))
            .subscribe((comments) => {
                this.props.actions.comments.sync(comments);
                this.setState({isLoading: false});
            });
    }

    componentWillUnmount() {
        this.commentApiStream.unsubscribe();
    }

    render() {
        const loadingComponent  = this.getLoadingComponent();
        const commentComponents = this.getCommentComponents();
        return (
            <div className="container">
                <div className="news-item">
                    <h3 className="title"><a href={this.props.item.getUrl()}>{this.props.item.title}</a></h3>
                    <div>
                        <ul className="list-inline">
                            <li className="score">{this.props.item.score} points</li>
                            <li className="by">by <Link to={`/user/${this.props.item.by}`}>{this.props.item.by}</Link></li>
                            <li className="time">{this.props.item.getTimeAgo()}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h4>Comment {loadingComponent}</h4>
                    <ul>
                        {commentComponents}
                    </ul>
                </div>
            </div>
        );
    }

    getCommentComponents() {
        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }


        if (this.props.comments.isEmpty()) {
            return (<p>No comments yet.</p>)
        }

        return this.props.comments
            .filter((comment) => !!comment.by)
            .map((comment) => (<CommentComponent key={comment.id} comment={comment}/>));
    }

    getLoadingComponent() {
        if (this.state.isLoading) {
            return (
                <span>
                    <i className="fa fa-refresh fa-spin fa-fw"/>
                </span>
            );
        }

        return null;
    }
}
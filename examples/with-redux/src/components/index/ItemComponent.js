import React from "react";
import { Link } from "react-router-dom";

export default class ItemComponent extends React.Component {
    render() {
        return (
            <div className="news-item">
                <h3 className="title"><a href={this.props.item.getUrl()}>{this.props.item.title}</a></h3>
                <div>
                    <ul className="list-inline">
                        <li className="score">{this.props.item.score} points</li>
                        <li className="by">by <Link to={`/user/${this.props.item.by}`}>{this.props.item.by}</Link></li>
                        <li className="time">{this.props.item.getTimeAgo()}</li>
                        <li className="comments-link"><Link to={`/item/${this.props.item.id}`}>{this.props.item.descendants} comments</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    render () {
        return (
            <header className="navbar navbar-default">
                <nav className="container">
                    <div className="d-flex justify-content-between hidden-lg-up">
                        <Link to="/" className="navbar-brand">
                            Next Props Example - Hacker News
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }
}

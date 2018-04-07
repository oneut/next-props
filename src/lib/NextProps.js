import React from 'react';

export default class AsyncReactPager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSyncing: true,
            initialProps: {}
        };

        // init stream
        if (!!this.constructor.streamer) {
            this.constructor.streamer(this.load.bind(this), this.setInitialProps.bind(this));
            this.state.hasStream = true;
        }
    }

    componentWillMount() {
        this.sync();
    }

    componentWillReceiveProps() {
        this.sync();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.isSyncing;
    }

    componentDidMount() {
        this.fireInitialPropsDidGet();
    }

    componentDidUpdate() {
        this.fireInitialPropsDidGet();
    }

    fireInitialPropsWillGet() {
        if (this.isFunction(this.props.component.initialPropsWillGet)) {
            this.props.component.initialPropsWillGet(this.props);
        }
    }

    fireInitialPropsDidGet() {
        if (this.isFunction(this.props.component.initialPropsDidGet)) {
            const props = {...this.props, ...this.state.initialProps};
            this.props.component.initialPropsDidGet(props);
        }
    }

    sync() {
        this.setState({isSyncing: true}, () => {
            if (this.state.hasStream) {
                if (!this.constructor.fireStreamer) {
                    throw Error(`AsyncComponent.fireStreamer is required when AsyncComponent.streamer exists.`);
                }
                this.constructor.fireStreamer();
                return;
            }
            this.fire();
        });
    }

    async fire() {
        const initialProps = await this.load();
        this.setInitialProps(initialProps);
    }

    async load() {
        this.fireInitialPropsWillGet();
        if (!(this.isFunction(this.props.component.getInitialProps))) {
            return {};
        }

        return await this.props.component.getInitialProps(this.props);
    }

    setInitialProps(initialProps) {
        this.fireInitialPropsDidGet();
        this.setState({
            initialProps: initialProps,
            isSyncing: false
        });
    }

    isFunction(func) {
        if (!!func && typeof func === 'function') return true;
        return false;
    }

    render() {
        if (this.state.isSyncing && !!this.constructor.firstRender) {
            return this.constructor.firstRender();
        }

        const props = {...this.props, ...this.state.initialProps};
        return <this.props.component {...props}/>;
    }
}

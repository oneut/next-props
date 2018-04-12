import React from 'react';

export default class NextProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSyncing: true,
            initialProps: {}
        };

        // init stream
        if (this.hasStreamer()) {
            this.props.streamer(this.load.bind(this), this.setInitialProps.bind(this));
        }
    }

    componentWillMount() {
        this.sync();
    }

    componentWillReceiveProps() {
        this.sync();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.isSyncing);
    }

    fireInitialPropsWillGet() {
        if (this.isFunction(this.props.component.initialPropsWillGet)) {
            this.props.component.initialPropsWillGet(this.props);
        }
    }

    fireInitialPropsDidGet(initialProps) {
        if (this.isFunction(this.props.component.initialPropsDidGet)) {
            const props = {...this.props, ...initialProps};
            this.props.component.initialPropsDidGet(props);
        }
    }

    sync() {
        this.setState({isSyncing: true}, () => {
            if (this.hasStreamer()) {
                this.fireStreamer();
                return;
            }
            this.fire();
        });
    }

    async fire() {
        const initialProps = await this.load();
        this.setInitialProps(initialProps);
    }

    fireStreamer() {
        if (!(this.props.fireStreamer)) {
            throw Error(`props.fireStreamer is required when props.streamer exists.`);
        }
        this.props.fireStreamer();
    }

    async load() {
        this.fireInitialPropsWillGet();
        if (!(this.isFunction(this.props.component.getInitialProps))) {
            return {};
        }

        return await this.props.component.getInitialProps(this.props);
    }

    setInitialProps(initialProps) {
        this.fireInitialPropsDidGet(initialProps);
        this.setState({
            initialProps: initialProps,
            isSyncing: false
        });
    }

    isFunction(func) {
        if (!!func && typeof func === 'function') return true;
        return false;
    }

    hasStreamer() {
        return !!this.props.streamer;
    }

    render() {
        if (this.state.isSyncing) {
            return this.firstRender();
        }

        const props = {...this.props, ...this.state.initialProps};
        return <this.props.component {...props}/>;
    }

    firstRender() {
        if (!(this.props.firstRender)) {
            return null;
        }

        if (this.isFunction(this.props.firstRender)) {
            return this.props.firstRender();
        }

        return this.props.firstRender;
    }
}

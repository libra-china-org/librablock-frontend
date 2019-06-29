import React from 'react'
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

ReactGA.initialize('UA-39767786-5');

class GAListener extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { history } = this.props as any;
    this.sendPageView(history.location);
    history.listen(this.sendPageView);
  }

  sendPageView(location: Location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(GAListener as any);
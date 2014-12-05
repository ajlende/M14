/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var MusicPlayer = require('./components/MusicPlayer.jsx');
var LoginModal = require('./components/LoginModal.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      username: 'GUEST',
      userID: '-1',
      email: null
    };
  },

  render: function() {
    var app = this;
    var login = function(user) {
      app.setState({
        loggedIn: true,
        username: user.username,
        userID: user.userID,
        email: user.email
      });
    };

    /*jslint ignore: start */
    if (this.state.loggedIn === false) {
      renderedComponent = <LoginModal login={login} />;
    } else {
      renderedComponent =
      <MusicPlayer
        username={this.state.username}
        userID={this.state.userID}
        email={this.state.email}
      />;
    }
    /*jslint ignore: end */

    return (
      /*jslint ignore: start */
      <div>
        {renderedComponent}
      </div>
      /*jslint ignore: end */
    );
  }
});

React.renderComponent(
  /*jslint ignore: start */
  <App />,
  $('#container').get(0)
  /*jslint ignore: end */
);

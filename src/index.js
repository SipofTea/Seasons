import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import LoadingSpinner from "./LoadingSpinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  // get one time data loading (instead of constructor)
  componentDidMount() {
    console.log("My component was rendered to the screen");
    //CALL SETSTATE TO UPDATE STATE!!!
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  // state or props change > reloads, good place for multiple data loading requests
  componentDidUpdate() {
    console.log("My component was just updated and rerendered!");
  }

  //helper method
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <LoadingSpinner message="Please accept location request" />;
  }

  // React says we have to define render!!! Render is not optional.
  // Just return JSX, nothing else.
  // try not to have multiple return statements in render.
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

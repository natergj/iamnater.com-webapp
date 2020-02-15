import * as React from "react";

class ErrorBoundary extends React.Component {
  state: any = {
    error: null,
    hasError: false,
  };

  componentDidCatch(e: Error) {
    if (e.message === "UNKNOWN_GRAPHQL_SERVER_ERROR") {
      // this.context.logout();
      this.setState({ hasError: false, error: null });
      return;
    }
  }

  static getDerivedStateFromError(e: Error) {
    if (e.message !== "UNKNOWN_GRAPHQL_SERVER_ERROR") {
      return { hasError: true, error: e.message };
    }
    return { hasError: true, error: "" };
  }

  render() {
    return this.state.hasError ? <div>{this.state.error}</div> : this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="text-6xl">😵</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Oops! Something went wrong
          </h1>
          <p className="max-w-md text-[var(--text-muted)]">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={this.handleRetry}
            className="mt-4 rounded-full px-6 py-3 font-semibold text-[var(--accent-contrast)] transition hover:opacity-90"
            style={{ background: "var(--accent-gradient)" }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-4 max-w-lg text-left text-xs text-[var(--text-muted)]">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="mt-2 overflow-auto rounded-lg bg-[var(--surface)] p-4">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

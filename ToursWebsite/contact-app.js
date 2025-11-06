import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI on error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for monitoring
    console.error("Error caught by ErrorBoundary:", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ContactApp() {
  return (
    <div className="min-h-screen bg-gray-50" data-name="contact-app" data-file="contact-app.js">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <ContactApp />
  </ErrorBoundary>
);

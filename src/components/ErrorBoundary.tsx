import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

// Safety net for the whole site: without this, an uncaught error while
// rendering ANY single page (a bad Helmet child, a broken data mapping,
// anything) unmounts the entire React tree and leaves visitors looking at a
// blank white page with no way to recover except manually retyping the URL.
// Wrapping <Outlet /> in MainLayout means the header/nav/footer stay up even
// when one page's content crashes, so people can still get back to a working
// page instead of being stuck.
//
// Error boundaries have to be class components — there is no hook
// equivalent for getDerivedStateFromError/componentDidCatch.
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Page crashed, caught by ErrorBoundary:", error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-24 min-h-[50vh]">
          <h1 className="text-2xl font-semibold mb-3">Something went wrong on this page</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Sorry about that. The rest of the site is still working, try reloading this page or head back to the homepage.
          </p>
          <div className="flex gap-3">
            <button
              onClick={this.handleReload}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Reload page
            </button>
            <a
              href="/"
              className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10"
            >
              Go to homepage
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends (React.Component as any) {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 pt-40">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center text-slate-800">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Application Error</h1>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Something went wrong while loading this page. This might be due to a connection issue or a missing file on the server.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 mb-8 text-xs font-mono text-slate-400 overflow-auto max-h-32 text-left">
              {this.state.error?.message || 'Unknown error'}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-lg"
              >
                Refresh Page
              </button>
              <button
                onClick={() => {
                  if (confirm("This will clear your local sessions and favorites (if not synced). Continue?")) {
                    window.location.href = window.location.pathname + "?clear=true";
                  }
                }}
                className="w-full bg-white text-slate-500 font-bold py-2 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-xs"
              >
                Deep Clean (Solve Cache Issues)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

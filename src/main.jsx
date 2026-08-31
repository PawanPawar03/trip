import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', background: '#1e1e2e', color: '#ff6b6b', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1 style={{ color: '#ffb86c', fontSize: '24px' }}>⚠️ Something went wrong in Varanasi Tour App</h1>
          <p style={{ color: '#f8f8f2', marginTop: '10px' }}><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
          <pre style={{ background: '#282a36', padding: '15px', borderRadius: '8px', overflowX: 'auto', marginTop: '15px', color: '#50fa7b' }}>
            {this.state.error && this.state.error.stack}
          </pre>
          <pre style={{ background: '#282a36', padding: '15px', borderRadius: '8px', overflowX: 'auto', marginTop: '15px', color: '#8be9fd' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

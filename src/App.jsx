import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskManagerPage from './pages/TaskManagerPage';
import GraphPage from './pages/GraphPage';
import ProfilePage from './pages/ProfilePage';

// Layout and Contexts
import Layout from './components/layout/layout';
import PrivateRoute from './components/auth/PrivateRoute';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          {/* The correct pattern is to wrap the Layout component with the provider 
            within a single 'element' prop.
          */}
          <Route
            element={
              <TaskProvider>
                <Layout />
              </TaskProvider>
            }
          >
            <Route path="/" element={<TaskManagerPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
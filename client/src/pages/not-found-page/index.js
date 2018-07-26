import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h3>404 - Page Not Found</h3>
    <p>Back to <Link to="/">Home</Link></p>
  </div>
);

export default NotFoundPage;

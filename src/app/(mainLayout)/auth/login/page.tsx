import Login from '@/components/login/Login';
import React, { Suspense } from 'react';

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  );
};

export default LoginPage;

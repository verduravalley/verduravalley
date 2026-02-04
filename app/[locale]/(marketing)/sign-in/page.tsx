'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import DivAnimateYAxis from '@/components/marketing/utils/DivAnimateYAxis';
import AuthForm from '@/components/marketing/form/AuthForm';

export default function SignInPage() {
  return (
    <>
      <BreadcrumbSection title="Sign In" currentPage="Sign In" />
      <section className="rv-account-form-section">
        <DivAnimateYAxis className="container">
          <div className="row justify-content-center">
            <div className="col-12 auth-container">
              <h3 className="single-form-title">Admin Login</h3>
              <AuthForm />
            </div>
          </div>
        </DivAnimateYAxis>
      </section>
    </>
  );
}

'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AuthForm from '@/components/marketing/form/AuthForm';

export default function SignInPage() {
  return (
    <>
      <BreadcrumbSection title="Sign In" currentPage="Sign In" />
      <AuthForm login />
    </>
  );
}

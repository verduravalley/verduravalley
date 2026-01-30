'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AuthForm from '@/components/marketing/form/AuthForm';

export default function SignUpPage() {
  return (
    <>
      <BreadcrumbSection title="Sign Up" currentPage="Sign Up" />
      <AuthForm />
    </>
  );
}

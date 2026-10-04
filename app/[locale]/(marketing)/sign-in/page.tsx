import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AuthSection from '@/components/marketing/auth/AuthSection';

export default function SignInPage() {
  return (
    <>
      <BreadcrumbSection title="Sign In" currentPage="Sign In" />
      <AuthSection />
    </>
  );
}

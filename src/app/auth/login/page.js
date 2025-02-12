import GuestLayout from '@/app/layouts/GuestLayout';
import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <GuestLayout hideNavigation>
      <div className="max-w-md mx-auto my-16">
        <div className="card">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-custom">
            Login
          </h1>
          <LoginForm />
        </div>
      </div>
    </GuestLayout>
  );
}
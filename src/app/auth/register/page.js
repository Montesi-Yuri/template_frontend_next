import GuestLayout from '@/app/layouts/GuestLayout';
import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
	return (
		<GuestLayout>
			<div className="max-w-md mx-auto">
				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform  transition-all duration-200">
					<h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
						Register
					</h1>
					<RegisterForm />
				</div>
			</div>
		</GuestLayout>
	);
}
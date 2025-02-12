import GuestLayout from '@/app/layouts/GuestLayout';
import Hero from '../components/landing/HeroSection'
import Features from '../components/landing/Features'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'

export default function Home() {
	return (
		<GuestLayout>
			<Hero />
			<Features />
			<Contact />
			<Footer />
		</GuestLayout>
	);
}

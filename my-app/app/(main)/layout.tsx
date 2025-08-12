import Footer from '../components/Footer';
import Header from '../components/Header';
import MobileMenuUpdated from '../components/MobileMenuUpdated';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
        {/* The Mobile Menu Updated is the menu that comes from above and show all the tags available */}
			<MobileMenuUpdated />

            {/* This header will be hidden in the small screen leaving space for the MobileMenuUpdated */}
			<Header />
			{children}
			<Footer />
		</>
	);
}

import Footer from "../components/Footer";
import HomeMobileMenu from "../components/HomeMobileMenu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return <>
	<HomeMobileMenu/>
	{children}
	<Footer/>
	</>;
}

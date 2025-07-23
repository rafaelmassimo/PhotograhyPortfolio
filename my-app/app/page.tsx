import connectDB from "@/config/database";


export default async function Home () {
  await connectDB();
	return (
		<div >
			hello homepage
			<span className="loading loading-spinner loading-xl"></span>
		</div>
	);
}

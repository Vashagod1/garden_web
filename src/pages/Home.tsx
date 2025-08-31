import GreetingSection from "../components/GreetingSection.tsx";
import UsersSection from "../components/UsersSection.tsx";
import TipsSection from "../components/TipsSection.tsx";


function Home() {
    return (
        <>
            <GreetingSection />
            <UsersSection />
            <TipsSection />
        </>
    )
}

export default Home;
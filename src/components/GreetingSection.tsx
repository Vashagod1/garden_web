import '../styles/GreetingSection.css'

function GreetingSection() {
    return (
        <div className="greeting">
            <div className="greeting__background">
                <div className="container greeting__section">
                    <div className="greeting__text">
                        <h1>Добро пожаловать!</h1>
                        <p>Это сайт для огородников</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GreetingSection;
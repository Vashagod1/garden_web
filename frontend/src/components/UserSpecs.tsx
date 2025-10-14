import "../styles/UserSpecs.css"

export function UserSpecs() {
    const plants = ["Помидоры", "Огурцы", "Перцы"]
    const userZone = "Зона морозостойкости 7b"
    const postCount = 12;

    return (
        <div className="user-specs">
            <div className="user-specs__container">
                <h2 className="user-specs__title">
                    Мой огород 🧑‍🌾
                </h2>
                <div className="user-specs__plants">
                    <p>Выращиваю:</p>
                    <ul className="user-specs__items">
                        {plants.map((plant, index) => (
                            <li key={index}>{plant}</li>
                        ))}
                    </ul>
                </div>
                <div className="user-specs__stats">
                    <p>📍 {userZone}</p>
                    <p>📝 Опубликовано постов: {postCount}</p>
                </div>
            </div>
        </div>
    )
}
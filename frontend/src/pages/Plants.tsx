
import PlantCard from '../components/PlantCard';
import type { Plant } from '../types/plant';

// Sample data for demonstration
const samplePlants: Plant[] = [
    {
        id: 1,
        name: "Томат",
        description: "Популярная овощная культура для дачи",
        imageUrl: "/images/tomato.jpg"
    },
    {
        id: 2,
        name: "Огурец",
        description: "Неприхотливая культура для теплицы",
        imageUrl: "/images/cucumber.jpg"
    },
    {
        id: 3,
        name: "Перец",
        description: "Сладкий перец для грядки",
        imageUrl: "/images/pepper.jpg"
    }
];

function Plants() {
    return (
        <div style={{ padding: '40px 20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--accent, #68a357)' }}>
                Каталог культур
            </h1>
            <div style={{ 
                display: 'flex', 
                gap: '30px', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {samplePlants.map(plant => (
                    <PlantCard key={plant.id} plant={plant} />
                ))}
            </div>
        </div>
    )
}

export default Plants;
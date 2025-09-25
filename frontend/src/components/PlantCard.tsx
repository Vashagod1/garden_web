import '../styles/PlantCard.css';
import type { Plant } from '../types/plant';

interface PlantCardProps {
    plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
    return (
        <div className="plant-card">
            <img 
                src={plant.imageUrl} 
                alt={plant.name}
                className="plant-card__image"
            />
            <h3 className="plant-card__title">{plant.name}</h3>
        </div>
    );
}

export default PlantCard;
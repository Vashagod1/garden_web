import '../styles/UsersSection.css';
import {FaLeaf, FaSeedling, FaUserGraduate} from "react-icons/fa";

export function UsersSection() {
    return(
        <div className="users">
            <div className="users__container">
                <div className="users__target-title">
                    GardenWeb для:
                </div>
                <div className="users__cards">
                    <div className="users__card">
                        <FaSeedling className="users__icon"/>
                        <div className="users__card-title">
                            Начинающих огородников
                        </div>
                        <div className="users__card-description">
                            Пошаговые инструкции, советы и база знаний для старта.
                        </div>
                    </div>
                    <div className="users__card">
                        <FaUserGraduate className="users__icon"/>
                        <div className="users__card-title">
                            Опытных садоводов
                        </div>
                        <div className="users__card-description">
                            Расширенные материалы, календарь посадок, учёт культур.
                        </div>
                    </div>
                    <div className="users__card">
                        <FaLeaf className="users__icon"/>
                        <div className="users__card-title">
                            Любителей природы
                        </div>
                        <div className="users__card-description">
                            Идеи для экопроектов, вдохновение и общение с единомышленниками.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
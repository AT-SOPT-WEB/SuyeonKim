import style from './Card.module.css';

const Card = ({name, github, englishName}) => {
    return (
        <div className={style.card}>
            <p>{name}</p>
            <p>{github}</p>
            <p>{englishName}</p>
        </div>
    );
};

export default Card;
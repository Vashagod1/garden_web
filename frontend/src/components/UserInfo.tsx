import "../styles/UserInfo.css"

export function UserInfo() {
  return (
    <div className="user">
      <div className="user__left">
        <img
          src="https://placehold.co/100x100"
          alt="Фото пользователя"
          className="user__img"
        />
      </div>
      <div className="user__right">
          <div className="user__text">
              <h2 className="user__name">Lorem ipsum dolor.</h2>
              {/*будет заменено при работе с бд и добавлением регистрации*/}
              <p className="user__description">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quibusdam reiciendis temporibus. Ab
                  accusantium dolores impedit quam veritatis vero voluptatum.
              </p>
          </div>
      </div>
    </div>
  );
}

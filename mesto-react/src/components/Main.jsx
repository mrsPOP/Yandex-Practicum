import React from "react";
import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo-place">
          <img
            src={currentUser["avatar"]}
            alt="фото профиля"
            className="profile__avatar"
          />
          <button
            onClick={onEditAvatar}
            className="profile__edit-photo-button"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser["name"]}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="редактировать"
            ></button>
          </div>
          <p className="profile__description">{currentUser["about"]}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="добавить"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements-list">
          {cards.map((cardInfo) => {
            return (
              <Card
                key={cardInfo._id}
                cardInfo={cardInfo}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;

import React, { useRef, useState, useContext } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import { numberWithCommas } from "../../utils/utils";
import { FavouriteContext } from "../../provider/context/FavouriteContext";
import { CartContext } from "../../provider/context/CartContext";

const CardItem = ({ item }) => {
  const quantity = 1;
  const {
    addProductToFavourite,
    deleteOneProductFromFavourite,
    favouriteState,
  } = useContext(FavouriteContext);
  const { addProductToCart } = useContext(CartContext);
  const { imgsUrl, name, price } = item;
  const heartIconRef = useRef(null);
  const cardRef = useRef(null);

  const isFav = favouriteState.products.find((p) => p._id === item._id);
  const [like, setLike] = useState(() => {
    return isFav ? true : false;
  });

  const handleEvents = {
    addToFavourite: (e, product) => {
      e.preventDefault();
      setLike(true);
      addProductToFavourite({ product, id: product._id });
    },
    handleDeleteFromFavourite: (e) => {
      e.preventDefault();
      setLike(false);
      deleteOneProductFromFavourite({ id: item._id });
    },
    addToCart: (e, product) => {
      addProductToCart({ e, quantity }, product);
    },
  };

  return (
    <div className="card__item" ref={cardRef}>
      <i
        ref={heartIconRef}
        onClick={(e) =>
          like
            ? handleEvents.handleDeleteFromFavourite(e)
            : handleEvents.addToFavourite(e, item)
        }
        className={`card__icon__like bx ${isFav ? "bxs-heart" : "bx-heart"}`}
      ></i>

      <div className="card__item__header">
        {imgsUrl.length > 0 && (
          <img src={`../../images/${imgsUrl[0]}`} alt="Ảnh" />
        )}
      </div>
      <div className="card__item__body">
        <p className="card__item__title">{name}</p>
        <p className="card__item__price">
          {numberWithCommas(Number(price))} vnđ
        </p>
      </div>
    </div>
  );
};

const CardStyleOne = (props) => {
  return (
    <div className="card__item__style__01 p-2">
      <div className="card__item__body">
        <p className="card__item__title">{props.title}</p>
        <p className="card__item__subtitle">{props.subtitle}</p>
        <p className="card__item__data">{props.value}K </p>
      </div>
      <div className="card__item__percent">
        <CircularProgressbarWithChildren
          value={props.percent}
          strokeWidth={10}
          styles={buildStyles({
            pathColor:
              props.percent < 50
                ? `rgba(62, 152, 199, ${props.percent / 100})`
                : `rgba(62, 152, 199, ${props.percent / 100})`,
            trailColor: "transparent",
            strokeLinecap: "round",
          })}
        ></CircularProgressbarWithChildren>
        <p className="card__item__percent__value">{props.percent}%</p>
      </div>
    </div>
  );
};

export { CardItem, CardStyleOne };

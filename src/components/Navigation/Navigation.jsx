import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <ul className={css.container}>
      <li>
        <NavLink
          to="/"
          className={props => {
            return clsx(css.navLink, props.isActive && css.active);
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className={props => {
            return clsx(css.navLink, props.isActive && css.active);
          }}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
}
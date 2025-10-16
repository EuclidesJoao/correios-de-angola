import "./index.css";
import { news } from "../data";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const News = () => {
  return (
    <div className="container mb-5">
      <ul className="news">
        {news.map((item, index) => (
          <li className="new" key={index}>
            <div className="image">
              <img src={item.image} alt={item.title} className="img-fluid" />
            </div>
            <h3 className="title">{item.title}</h3>
            <NavLink to="" className="navigation">
              <ArrowForwardIcon />
              <span>Saber mais</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

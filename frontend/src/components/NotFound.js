import fileNotFound from "../svg/icons8-not-found-100.png";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="icon-container">
      <img
        className="fileNotFoundIcon"
        src={fileNotFound}
        alt="fileNotFoundIcon"
      />
    </div>
  );
};
export default NotFound;

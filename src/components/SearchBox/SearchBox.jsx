import { useId } from "react";
import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const name = useSelector(selectNameFilter);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div>
      <form className={s.form}>
        <label htmlFor={searchId}>
          Find contacts by name
          <input
            type="text"
            id={searchId}
            value={name}
            onChange={handleChange}
            placeholder="Enter search name"
          />
        </label>
      </form>
    </div>
  );
};
export default SearchBox;

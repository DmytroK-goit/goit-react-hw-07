import { useId } from "react";
import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const name = useSelector(selectNameFilter);

  return (
    <div>
      <form
        className="w-1/4 flex gap-8 flex-col bg-amber-500 p-10 rounded-2xl mb-10"
        style={{
          boxShadow: "15px 15px 10px rgb(190, 126, 30)",
          backgroundColor: " burlywood",
        }}
      >
        <label className="w-3/4 flex flex-col" htmlFor={searchId}>
          Find contacts by name
          <input
            type="text"
            id={searchId}
            value={name}
            onChange={(e) => dispatch(changeFilter(e.target.value))}
            placeholder="Enter search name"
          />
        </label>
      </form>
    </div>
  );
};
export default SearchBox;

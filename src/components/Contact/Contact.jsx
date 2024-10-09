import s from "./Contact.module.css";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

const Contact = ({ data }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(data.id));

  return (
    <div className={s.contact} key={data.id}>
      <div>
        <p>
          <IoPeopleSharp /> {data.name}
        </p>
        <p>
          <FaPhoneAlt /> {data.number}
        </p>
      </div>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
export default Contact;

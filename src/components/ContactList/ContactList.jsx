import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import {
  selectContacts,
  selectIsError,
  selectIsLoading,
} from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getVisibleContacts = ({ contacts, name }) => {
  if (!name) return contacts;
  return contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase()) ||
      contact.number.includes(name)
  );
};

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const name = useSelector(selectNameFilter);
  const visibleContacts = getVisibleContacts({ contacts, name }) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-5xl font-bold text-black shadow-2xl my-10">
        Contacts List
      </h2>
      <ul className="grid gap-4 grid-cols-3 ">
        {visibleContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ContactList;

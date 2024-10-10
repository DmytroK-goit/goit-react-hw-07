import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

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
  const visibleContacts = getVisibleContacts(contacts, name) || [];

  return (
    <>
      <h2>Contacts List</h2>
      <ul className={s.list}>
        {visibleContacts.map((contact) => (
          <li className={s.li} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ContactList;

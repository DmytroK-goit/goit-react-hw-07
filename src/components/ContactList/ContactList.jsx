import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
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

  return (
    <>
      <h2 className="text-5xl font-bold text-black shadow-2xl my-10">
        Contacts List
      </h2>
      <ul className="grid gap-4 grid-cols-3 place-items-center">
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

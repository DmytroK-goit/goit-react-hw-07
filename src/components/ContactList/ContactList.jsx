import Contact from "../Contact/Contact";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <>
      <h2 className="text-5xl font-bold text-black shadow-2xl my-10">
        Contacts List : {contacts.length} contacts.
      </h2>
      <ul className="grid gap-4 grid-cols-3 place-items-center">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ContactList;

import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      })
    );
    resetForm();
  };

  const nameId = useId();
  const phoneId = useId();
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Занадто коротке ім'я!")
      .max(50, "Занадто довге ім'я!")
      .required("Ім'я є обов'язковим"),
    number: Yup.string()
      .matches(
        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
        "Номер не валідний"
      )
      .min(3, "Занадто короткий номер")
      .max(50, "Занадто довгий номер")
      .required("Номер телефону є обов'язковим"),
  });

  const initialValues = {
    name: "",
    number: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={s.form}>
        <div>
          <label htmlFor={nameId}>
            <Field
              type="text"
              name="name"
              id={nameId}
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="span" />
          </label>
        </div>
        <div>
          <label htmlFor={phoneId}>
            <Field
              type="tel"
              name="number"
              id={phoneId}
              placeholder="+38 (000) 000-00-00"
            />
            <ErrorMessage name="number" component="span" />
          </label>
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
export default ContactForm;

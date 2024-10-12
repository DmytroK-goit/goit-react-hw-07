import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";

import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsOps";

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
      <Form
        className="w-1/4 flex gap-8 flex-col bg-amber-500 p-10 rounded-2xl mb-10"
        style={{
          boxShadow: "15px 15px 10px rgb(190, 126, 30)",
          backgroundColor: " burlywood",
        }}
      >
        <div>
          <label className="w-3/4 flex flex-col" htmlFor={nameId}>
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
          <label className="w-3/4 flex flex-col" htmlFor={phoneId}>
            <Field
              type="tel"
              name="number"
              id={phoneId}
              placeholder="+38 (000) 000-00-00"
            />
            <ErrorMessage name="number" component="span" />
          </label>
        </div>
        <button
          className="w-1/3 flex rounded-2xl justify-center text-gray-50 border-black border-solid bg-indigo-700 border-2 border-indigo-600  transition-transform duration-200 hover:scale-110"
          type="submit"
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;

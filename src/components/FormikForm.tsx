import React from "react";
import * as yup from "yup";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FormikHelpers,
} from "formik";

const FormikForm = () => {
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required").min(4),
    username: yup.string().required("Required").min(4),
    email: yup.string().required("Required").email("Invalid email"),

    password: yup.string().required("Required").min(8),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password")], `Password don't match`),
  });

  //   field type
  type inputField = {
    id: "name" | "username" | "email" | "password" | "confirmPassword";
    placeholder: string;
    name: "name" | "username" | "email" | "password" | "confirmPassword";
    type: React.HTMLInputTypeAttribute;
  };
  // input field list
  const inputFields: inputField[] = [
    {
      id: "name",
      placeholder: "Enter your name",
      name: "name",
      type: "text",
    },
    {
      id: "username",
      placeholder: "Enter your username",
      name: "username",
      type: "text",
    },
    {
      id: "email",
      placeholder: "Enter your email",
      name: "email",
      type: "email",
    },
    {
      id: "password",
      placeholder: "Enter your password",
      name: "password",
      type: "password",
    },
    {
      id: "confirmPassword",
      placeholder: "Confirm password",
      name: "confirmPassword",
      type: "password",
    },
  ];
  // handle submit
  const handleSubmit = (
    values: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    alert(JSON.stringify(values, undefined, 2));
    action.resetForm();
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      <h1 className="text-2xl font-semibold">Form Validation</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col w-full max-w-sm">
            {inputFields.map((value) => (
              <div className="mb-2" key={value.id}>
                <label
                  className="text-sm capitalize font-medium ml-1 block mb-0.5"
                  htmlFor={value.id}
                >
                  {value.id} <span className="text-red-500">*</span>
                </label>
                <Field
                  className={`w-full py-2.5 focus:ring-2 outline-none px-4 border rounded-xl ${
                    errors[value.id] && touched[value.name]
                      ? "border-red-500 ring-red-500/50"
                      : "border-gray-300 ring-sky-500"
                  }`}
                  {...value}
                />

                <p className="text-xs empty:hidden text-red-500 font-medium mt-0.5 ml-1">
                  <ErrorMessage name={value.name} />
                </p>
              </div>
            ))}
            <button
              type="submit"
              className="py-2.5 rounded-xl bg-sky-500 text-white font-semibold capitalize hover:bg-sky-400 transition-colors duration-200 mt-3"
            >
              submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;

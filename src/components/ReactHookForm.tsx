import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./FormikForm";

const ReactHookForm = () => {
  // initial form values
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //   zod schema
  const zodValidationSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    username: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }).email("Invalid email"),
    password: z.string().min(1, { message: "Required" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    // validator for zod
    // resolver: zodResolver(zodValidationSchema),
    // validator for yup
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "all",
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

  const onSubmit = (values: FieldValues) => {
    alert(JSON.stringify(values, undefined, 2));
    reset();
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* form container */}
      <div className="max-w-sm w-full space-y-4">
        <h1 className="font-semibold text-center text-xl">React Hook Form</h1>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputFields.map((value) => (
            <div className="mb-2" key={value.id}>
              <label
                className="text-sm capitalize font-medium ml-1 block mb-0.5"
                htmlFor={value.id}
              >
                {value.id} <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full py-2.5 focus:ring-2 outline-none px-4 border rounded-xl `}
                {...register(value.name)}
                {...value}
              />

              <p className="text-xs empty:hidden text-red-500 font-medium mt-0.5 ml-1">
                {errors[value.name]?.message?.toString()}
              </p>
            </div>
          ))}
          <button
            type="submit"
            className="py-2.5 rounded-xl w-full bg-sky-500 text-white font-semibold capitalize hover:bg-sky-400 transition-colors duration-200 mt-3"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReactHookForm;

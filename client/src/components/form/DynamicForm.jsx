import React, { useState, useEffect } from "react";
import { formConfig } from "./formConfig";
import Input from "../Input";
import Button from "../Button";

function DynamicForm({ moduleName, initialData = {}, onSubmit, isEdit = false, children }) {
  const [formData, setFormData] = useState(initialData || {});

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData(initialData)
    }
  }, [initialData])

  const fields = formConfig[moduleName] || [];

  return (
    <form
      onSubmit={submitHandler}
      className=" p-6 w-full"
    >
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {isEdit ? `Edit ${moduleName}` : `Add ${moduleName}`}
      </h2>

      {fields.map((field) => {
        if (isEdit && field.name === "password") return null;
        return (
          <Input label={field.label} name={field.name} type={field.type} id={field.id} value={formData[field.name] || ""} onChange={inputHandler} key={field.name}></Input>)
      })}

      {children}

      <Button value={isEdit ? "Update" : "Save"}></Button>
    </form>
  );
}

export default DynamicForm;

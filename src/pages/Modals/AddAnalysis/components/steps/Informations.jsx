import { Fragment, useEffect, useRef } from "react";
import { useMemo, useState } from "react";
import "../../../Modals.css";

const Informations = (props) => {
  const { params, updateData } = props;

  const questionFields = useMemo(
    () => params.params.filter((param) => param.source === "user"),
    [params]
  );

  const initialState = useMemo(() => {
    let obj = {};
    questionFields.forEach((field) => {
      const { name, default: defaultValue } = field;
      obj[`${name}`] = defaultValue;
    });
    return obj;
  }, [questionFields]);

  const notIntialRender = useRef(false);

  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (!notIntialRender.current) {
      updateData(initialState);
    }
  }, [updateData, initialState]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setData((preVal) => {
        let newState = {
          ...preVal,
          [name]: +value,
        };
        updateData(newState);
        return newState;
      });
      return;
    }
    setData((preVal) => {
      let newState = {
        ...preVal,
        [name]: value,
      };
      updateData(newState);
      return newState;
    });
  };
  const renderedInputs = (
    <Fragment>
      {questionFields.map((field, index) => {
        const type =
          field.type === "int" || field.type === "float" ? "number" : "text";
        return (
          <Fragment key={index}>
            <input
              type={type}
              id={field.name}
              className="analysis_form_input"
              name={field.name}
              placeholder="longitude"
              onChange={handleChange}
              value={data[field.name]}
            />
            <p className=" w-full md:w-[85%] mt-1 mb-3 md:ml-[30px] text-sm text-orange-500">
              {field.disc}
            </p>
          </Fragment>
        );
      })}
    </Fragment>
  );

  return <form className="flex flex-col items-center">{renderedInputs}</form>;
};
export default Informations;

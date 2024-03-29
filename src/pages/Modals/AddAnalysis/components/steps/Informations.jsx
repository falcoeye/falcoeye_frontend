import { Fragment, useEffect, useRef } from 'react';
import { useMemo, useState } from 'react';
import '../../../Modals.css';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Informations = (props) => {
  const { params, updateData, validateInfo } = props;

  const questionFields = useMemo(
    () => params.params.filter((param) => param.source === 'user'),
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

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let prevState = {};
    if (fieldType === 'int' || fieldType === 'float') {
      setData((preVal) => {
        prevState = preVal;
        let newState = {
          ...preVal,
          [name]: value,
        };
        updateData({
          ...prevState,
          [name]: isNaN(+value) ? value : +value,
        });
        return newState;
      });
      return;
    }
    setData((preVal) => {
      prevState = preVal;
      let newState = {
        ...preVal,
        [name]: value,
      };
      updateData({
        ...prevState,
        [name]: value,
      });
      return newState;
    });
  };

  const schemaArray = questionFields.map((q) => {
    if (q.type === 'string') {
      return { [q.name]: yup.string().required() };
    }
    return { [q.name]: yup.number().required() };
  });
  let yupSchema = {};
  schemaArray.forEach((item, index) => {
    let objKeys = Object.keys(item);
    objKeys.forEach((key, index) => {
      yupSchema[key] = item[key];
    });
  });

  // form validation rules
  const validationSchema = yup.object(yupSchema);

  const {
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });
  useEffect(() => {
    validateInfo(Object.keys(errors).length === 0)
  })

  const renderedInputs = (
    <Fragment>
      {questionFields.map((input, index) => {
        const type = 'text';
        return (
          <Fragment key={index}>
            <p className=" w-full md:w-[85%]  my-1 md:ml-[30px] text-sm font-semibold text-green">
              {input.disc}
            </p>
            <Controller
              name={input.name}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={type}
                  id={input.name}
                  value={data[input.name]}
                  className="analysis_form_input  dark:!bg-gray-800 dark:!border-gray-800 dark:!text-white !rounded-md"
                  onChange={(e) => {
                    handleChange(e, input.type);
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            {errors[input.name] && (
              <p className=" w-full md:w-[85%] mb-3 md:ml-[30px] font-semibold text-xs text-red-500/80">
                {`This field must contains ${
                  input.type === 'string' ? 'a value' : 'only numbers'
                }`}
              </p>
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );

  return <form className="flex flex-col items-center">{renderedInputs}</form>;
};
export default Informations;

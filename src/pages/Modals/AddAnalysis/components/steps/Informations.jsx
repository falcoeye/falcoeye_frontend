import { Fragment } from "react";
import { useMemo, useState } from "react";
import '../../../Modals.css'

const Informations = props => {

    const { params, updateData } = props;

    const questionFields = useMemo( () => params.params.filter(param => param.source === 'user'), [params])

    const initialState = useMemo(() => {
        let obj = {};
        questionFields.forEach(field => {
            const { name, default: defaultValue } = field
            console.log(name, defaultValue)
            obj[`${name}`] = defaultValue
        })
        updateData(obj)
        return obj
    }, [questionFields, updateData])

    const [data, setData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            setData((preVal) => {
                let newState = {
                    ...preVal,
                    [name]: +value
                }
                updateData(newState)
                return newState;
            });
            return;
        }
        setData((preVal) => {
            let newState = {
                ...preVal,
                [name]: value
            }
            updateData(newState)
            return newState;
        });
    };
    const renderedInputs = (
        <Fragment>
            {questionFields.map((field, index) => {
                const type = ( field.type === 'int' || field.type === 'float' ) ? 'number' : 'text';
                return  (
                    <Fragment>
                        <input
                            key={index}
                            type={type}
                            id={field.name}
                            className="modal_form_input "
                            name={field.name}
                            placeholder="longitude"
                            onChange={handleChange}
                            value={data[field.name]}
                        />
                        <p className="w-[85%] mt-1 mb-3 ml-[30px] text-sm text-orange-500" >{field.disc}</p>
                    </Fragment>
                )
            } )}
        </Fragment>
    )


    return (
        <form>
            {renderedInputs}
        </form>
    )
}
export default Informations;
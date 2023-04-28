import {useState} from "react";
import {useDispatch} from "react-redux";

type TFormParams = {
    email?: string,
    name?: string,
    password?: string,
    token?: string,

}
export const useFormCustom = (initial: TFormParams, action?: any) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initial);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(form);
        dispatch(action(form));
        setForm(initial);
    };

    return {form, setForm, handleChange, handleSubmit};
};
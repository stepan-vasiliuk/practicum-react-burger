import {useState} from "react";
import {useDispatch} from "react-redux";


export const useFormCustom = (initial, action) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initial);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(action(form));
        setForm(initial);
    }

    return {form, setForm, handleChange, handleSubmit};
}
import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";

 export type TFormParams = {
    email?: string,
    name?: string,
    password?: string,
    token?: string,

}
export const useFormCustom = (initial: TFormParams) => {
    const [form, setForm] = useState(initial);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    return {form, setForm, handleChange};
};
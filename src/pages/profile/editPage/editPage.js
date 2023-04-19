import formStyles from '../../formStyles.module.css';
import editStyles from './editPage.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFormCustom} from "../../../utils/form";
import {updateUserData} from "../../../services/actions";

export default function EditPage() {

    const dispatch = useDispatch();
    const name = useSelector(state => state.userReducer.user.name);
    const email = useSelector(state => state.userReducer.user.email);

    const [initial, setInitial] = useState({
        name: name,
        email: email,
        password: '',
    })

    useEffect(() => {
        setInitial({
            ...initial,
            name: name,
            email: email,
        })
    }, [name, email])

    const {form, setForm, handleChange} = useFormCustom(initial);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(form);
        dispatch(updateUserData(form));
    }

    const onCancelClick = () => {
        setForm(initial);
    }

    return (
        <div className={editStyles.wrapper}>
            <form className={editStyles.form_flexbox} onSubmit={e => handleSubmit(e)}>
                <Input
                    placeholder='Имя'
                    type='text'
                    value={form.name}
                    onChange={e => handleChange(e)}
                    name='name'
                />
                <EmailInput
                    value={form.email}
                    onChange={e => handleChange(e)}
                    name='email'
                />
                <PasswordInput
                    value={form.password}
                    onChange={e => handleChange(e)}
                    name='password'
                />
                <div className={editStyles.bottom_menu}>
                    <a className={`text text_type_main-small text_color_accent ${editStyles.cancel_button}`}
                       onClick={onCancelClick}>Отмена</a>
                    <Button htmlType={"submit"}>Сохранить</Button>
                </div>
            </form>
        </div>
    )
}
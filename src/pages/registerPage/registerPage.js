import registerStyles from '..//formStyles.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link, useSubmit} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {userRegister} from "../../services/actions";
import {useFormCustom} from "../../utils/form";

export default function RegisterPage() {

    const dispatch = useDispatch();

    const initial = {
        name: '',
        email: '',
        password: '',
    }
    const {form, setForm, handleChange} = useFormCustom(initial);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(userRegister(form));
        setForm(initial);
    }

    return (
        <div className={registerStyles.wrapper}>
            <form
                onSubmit={e => (onSubmit(e))}
                className={registerStyles.form_flexbox}>
                <h1 className='text text_type_main-medium'>Регистрация</h1>
                <Input
                    type='text'
                    value={form.name}
                    placeholder='Имя'
                    name='name'
                    onChange={e => handleChange(e)}

                />
                <EmailInput
                    value={form.email}
                    onChange={e => handleChange(e)}
                    name='email'/>
                <PasswordInput
                    value={form.password}
                    onChange={e => handleChange(e)}
                    name='password'/>
                <Button htmlType='submit' type='primary' size='medium'>Зарегистрироваться</Button>
            </form>
            <section className={registerStyles.bottom_text}>
                <p className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</p>
                <Link to='/login'>
                    <p className='text text_type_main-small text_color_accent'>Войти</p>
                </Link>
            </section>
        </div>
    )
}
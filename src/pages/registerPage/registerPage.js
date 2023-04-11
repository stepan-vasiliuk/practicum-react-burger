import registerStyles from '..//formStyles.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link, useSubmit} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {userRegister} from "../../services/actions";

export default function RegisterPage() {

    const dispatch = useDispatch();

    const useFormCustom = () => {
        const [form, setForm] = useState({
            name: '',
            email: '',
            password: '',
        });

        const handleChange = (e) => {
            setForm({...form, [e.target.name]: e.target.value})
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(form);
            dispatch(userRegister(form));
            setForm({...form, name: "", email: "", password: ""});
        }

        return {form, handleChange, handleSubmit};
    }

    const {form, handleChange, handleSubmit} = useFormCustom();



    return (
        <div className={registerStyles.wrapper}>
            <form
                onSubmit={e => (handleSubmit(e))}
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
                    //{...register('email')}
                    value={form.email}
                    onChange={e => handleChange(e)}
                    name='email'/>
                <PasswordInput
                    //{...register('password')}
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
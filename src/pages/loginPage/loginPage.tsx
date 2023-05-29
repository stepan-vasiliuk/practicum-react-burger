import loginStyles from '../formStyles.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent} from "react";
import {Link} from "react-router-dom";
import {useFormCustom} from "../../utils/form";
import {userLogin} from "../../services/actions";
import {useTypedDispatch} from "../../hooks/hooks";

export default function LoginPage() {
    const dispatch = useTypedDispatch();

    const initial = {
        email: "",
        password: "",
    };

    const {form, setForm, handleChange} = useFormCustom(initial);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(userLogin(form));
        setForm(initial);
    }


    return (
        <div className={loginStyles.wrapper}>
            <form className={loginStyles.form_flexbox} onSubmit={e => onSubmit(e)}>
                <h1 className='text text_type_main-medium'>Вход</h1>
                <EmailInput
                    value={form.email!}
                    onChange={handleChange}
                    name='email'
                />
                <PasswordInput
                    value={form.password!}
                    onChange={handleChange}
                    name='password'
                />
                <Button htmlType="submit" type='primary' size='medium'>Войти</Button>
            </form>
            <section className={loginStyles.bottom_section}>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</p>
                    <Link to='/register'>
                        <p className='text text_type_main-small text_color_accent'>Зарегистрироваться</p>
                    </Link>
                </div>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
                    <Link to='/forgot-password'>
                        <p className='text text_type_main-small text_color_accent'>Восстановить пароль</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
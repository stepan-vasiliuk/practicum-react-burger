import {FormEvent} from "react";
import resetStyles from "..//formStyles.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import {useFormCustom} from "../../utils/form";
import {passwordRecovery} from "../../services/actions";
import {useTypedDispatch, useTypedSelector} from "../../hooks/hooks";

export default function ResetPassword() {

    const emailSent: boolean = useTypedSelector(state => state.userReducer.emailSent);
    const dispatch = useTypedDispatch();


    const initial = {
        password: "",
        token: "",
    };

    const {form, setForm, handleChange} = useFormCustom(initial);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        dispatch(passwordRecovery(form))
        setForm(initial);
    }

    return (
        <>
            {emailSent ?
                <div className={resetStyles.wrapper}>
                    <form className={resetStyles.form_flexbox} onSubmit={e => onSubmit(e)}>
                        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                        <PasswordInput value={form.password!}
                                       placeholder='Введите новый пароль'
                                       onChange={handleChange}
                                       name='password'
                        />
                        <Input value={form.token!}
                               placeholder='Введите код из письма'
                               onChange={handleChange}
                               name='token'
                        />
                        <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
                    </form>
                    <section className={resetStyles.bottom_text}>
                        <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
                        <Link to='/login'>
                            <p className='text text_type_main-small text_color_accent'>Войти</p>
                        </Link>
                    </section>
                </div>
                : <Navigate to='/login'/>
            }
        </>
    )
}
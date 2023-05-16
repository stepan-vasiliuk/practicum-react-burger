import forgotStyles from '..//formStyles.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormEvent, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormCustom} from "../../utils/form";
import {resetPassword} from "../../services/actions";
import {useTypedDispatch, useTypedSelector} from "../../hooks/hooks";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const emailSentSuccess: boolean = useTypedSelector(state => state.userReducer.emailSent);

    const dispatch = useTypedDispatch();
    const initial = {
        email: "",
    };

    useEffect(() => {
        if (emailSentSuccess) {
            navigate("/reset-password");
        }
    }, [emailSentSuccess]);

    const {form, handleChange} = useFormCustom(initial);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(resetPassword(form));
        navigate('')
    }

    return (
        <div className={forgotStyles.wrapper}>
            <form onSubmit={e => onSubmit(e)} className={forgotStyles.form_flexbox}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <EmailInput
                    value={form.email!}
                    onChange={handleChange}
                    placeholder='Укажите e-mail'
                    name='email'
                />
                <Button htmlType='submit' type='primary' size='medium'>Восстановить</Button>
            </form>
            <section className={forgotStyles.bottom_text}>
                <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
                <Link to='/login'>
                    <p className='text text_type_main-small text_color_accent'>Войти</p>
                </Link>
            </section>
        </div>
    )
}
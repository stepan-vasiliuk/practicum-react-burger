import forgotStyles from '..//formStyles.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const onChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className={forgotStyles.wrapper}>
            <form className={forgotStyles.form_flexbox}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <EmailInput value={email} onChange={e => onChange(e)} placeholder='Укажите e-mail'/>
                <Button htmlType='button' type='primary' size='medium'>Восстановить</Button>
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
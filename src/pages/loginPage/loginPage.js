import loginStyles from './loginPage.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');

    // const [searchEmail, setSearchEmail] = useSearchParams();
    const onChange = (e) => {
        // let filter = e.target.value;
        // if (filter) {
        //     setSearchEmail({filter});
        // } else {
        //     setSearchEmail({});
        // }
        setEmail(e.target.value);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
    }

    return (
        <div className={loginStyles.wrapper}>
            <form className={loginStyles.form_flexbox}>
                <h1 className='text text_type_main-medium'>Вход</h1>
                <EmailInput value={email} onChange={onChange}/>
                <PasswordInput value={passWord} onChange={onPasswordChange}/>
                <Button htmlType="button" type='primary' size='medium'>Войти</Button>
            </form>
            <section className={loginStyles.bottom_section}>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</p>
                    <a className={loginStyles.link} href='#'>
                        <p className='text text_type_main-small text_color_accent'>Зарегистрироваться</p>
                    </a>
                </div>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
                    <a className={loginStyles.link} href='#'>
                        <p className='text text_type_main-small text_color_accent'>Восстановить пароль</p>
                    </a>
                </div>
            </section>
        </div>
    )
}
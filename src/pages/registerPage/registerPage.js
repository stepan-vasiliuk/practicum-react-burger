import registerStyles from '..//formStyles.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');

    const onInputChange = (e) => {
        setName(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div className={registerStyles.wrapper}>
            <form className={registerStyles.form_flexbox}>
                <h1 className='text text_type_main-medium'>Регистрация</h1>
                <Input value={name} placeholder='Имя' onChange={e => onInputChange(e)}/>
                <EmailInput value={email} onChange={e => onEmailChange(e)}/>
                <PasswordInput value={passWord} onChange={e => onPasswordChange(e)}/>
                <Button htmlType='button' type='primary' size='medium'>Зарегистрироваться</Button>
            </form>
            <section className={registerStyles.bottom_text}>
                <p className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</p>
                <p className='text text_type_main-small text_color_accent'>Войти</p>
            </section>
        </div>
    )
}
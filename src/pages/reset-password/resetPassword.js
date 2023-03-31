import {useState} from "react";
import resetStyles from "..//formStyles.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ResetPassword() {
    const [code, setCode] = useState('');
    const [passWord, setPassword] = useState('');

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onCodeChange = (e) => {
        setCode(e.target.value);
    }

    return (
        <div className={resetStyles.wrapper}>
            <form className={resetStyles.form_flexbox}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <PasswordInput value={passWord} placeholder='Введите новый пароль' onChange={e => onPasswordChange(e)}/>
                <Input value={code} placeholder='Введите код из письма' onChange={e => onCodeChange(e)}/>
                <Button htmlType='button' type='primary' size='medium'>Сохранить</Button>
            </form>
            <section className={resetStyles.bottom_text}>
                <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
                <p className='text text_type_main-small text_color_accent'>Войти</p>
            </section>
        </div>
    )
}
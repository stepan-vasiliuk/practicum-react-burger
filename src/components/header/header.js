import React from "react";
import {Button, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Header() {


    return (
        <header className={headerStyles.header}>
            <div className="container-wrapper">
                <nav className={`${headerStyles.nav} pt-4 pb-4`}>
                    <section className={`${headerStyles.menu} `}>
                        <a className={headerStyles.menu_element}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default">Конструктор</p>
                        </a>
                        <a className={`${headerStyles.menu_element}`}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </a>
                    </section>
                    <section className={headerStyles.logo}>
                        <Logo/>
                    </section>
                    <section className={headerStyles.user_lk}>
                        <a className={`${headerStyles.menu_element}`}>
                            <ProfileIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                        </a>
                    </section>
                </nav>
            </div>
        </header>
    )
}

import React from "react";
import {Button, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useLocation, useMatch} from "react-router-dom";

export default function Header() {

    const location = useLocation();
    const profilePattern = useMatch('/profile/*');

    return (
        <header className={headerStyles.header}>
            <div className="container-wrapper">
                <div className={headerStyles.logo}>
                    <Logo/>
                </div>
                <div className={`${headerStyles.menu} pt-8 pb-8`}>
                    <section className={headerStyles.left}>
                        <NavLink
                            to='/'
                            className={({isActive}) => headerStyles.menu_element + (isActive ?
                                ` ${headerStyles.active_link}` : ``)}
                        >
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                            <p>Конструктор</p>
                        </NavLink>

                        <NavLink
                            to='/order-feed'
                            className={({isActive}) => headerStyles.menu_element + (isActive ?
                                ` ${headerStyles.active_link}` : ``)}
                        >
                            <ListIcon type={location.pathname === '/order-feed' ? 'primary' : 'secondary'}/>
                            <p >Лента заказов</p>
                        </NavLink>

                    </section>
                    <section>
                        <NavLink
                            to='/profile'
                            className={({isActive}) => headerStyles.menu_element + (isActive ?
                                ` ${headerStyles.active_link}` : ``)}
                        >
                            <ProfileIcon type={profilePattern ? 'primary' : 'secondary'} />
                            <p>Личный кабинет</p>
                        </NavLink>
                    </section>
                </div>
            </div>
        </header>
    )
}

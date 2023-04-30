import styles from './notFoundPage.module.css';

export default function NotFoundPage() {
    return (
        <div className={styles.container_wrapper}>
            <h1 className='text text_type_digits-large'>404</h1>
            <h2 className='text text_type_main-large'>Страница не найдена</h2>
        </div>
    )
}
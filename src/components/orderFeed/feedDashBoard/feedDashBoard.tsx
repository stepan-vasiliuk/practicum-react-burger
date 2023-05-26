import dashBoardStyles from "./feedDashBoard.module.css";
import {TFeedOrders} from "../../../utils/types";
import {useMemo} from "react";

type TFeedDashBoardProps = {
    orders: TFeedOrders;
}

export default function FeedDashBoard({orders}: TFeedDashBoardProps): JSX.Element {


    const ready = useMemo(() => orders.orders.filter(order => order.status === 'done')
        .map(order => order.number), [orders]);

    const inProgress = useMemo(() => orders.orders.filter(order => order.status !== 'done')
        .map(order => order.number), [orders]);

    const totalOrders = useMemo(() => orders.total, [orders]);
    const todayOrders = useMemo(() => orders.totalToday, [orders]);


    return (
        <div className={`${dashBoardStyles.container} mt-25`}>
            <section className={dashBoardStyles.order_list}>
                <div className={dashBoardStyles.order_list_column}>

                    <h2 className={`text text_type_main-medium`}>Готовы:</h2>
                    <div className={dashBoardStyles.order_list_content}>
                        {ready.map((item, index) => {
                            if (index > 9) {
                                return null;
                            } else {
                                return (
                                    <p className={`text text_type_digits-default text_color_success`}>{item}</p>
                                );
                            }
                        })}
                    </div>

                </div>
                <div className={dashBoardStyles.order_list_column}>

                    <h2 className={`text text_type_main-medium`}>В работе:</h2>
                    <div className={dashBoardStyles.order_list_content}>
                        {inProgress.map((item, index) => {
                            if (index > 9) {
                                return null;
                            } else {
                                return (
                                    <p className={`text text_type_digits-default`}>{item}</p>
                                );
                            }
                        })}
                    </div>

                </div>
            </section>
            <section className={dashBoardStyles.total_orders}>
                <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                <p className={`text text_type_digits-large`}>{totalOrders}</p>
            </section>
            <section className={dashBoardStyles.today_orders}>
                <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                <p className={`text text_type_digits-large`}>{todayOrders}</p>
            </section>
        </div>
    );
}
import useGetFilter from '../../hooks/useGetFilter';
import { GET_ALL_ORDER } from '../../api/apiOrder';
import Pagination from '../Other/Pagination';
import OrderModal from '../Other/OrderModal';
import useModal from '../../hooks/useModal';
import React, { useState } from 'react';
import moment from 'moment';

export default function ManageOrder()
{
    const { isLoading, data: listOrder, pagination,
        handlePagination } = useGetFilter(GET_ALL_ORDER);

    const [orderDetail, setOrderDetail] = useState([]);
    const { isShowing, toggle } = useModal();

    const handlePageChange = (newPage) => handlePagination(newPage);

    return (
        <section className="manage-container">
            <div className="table-Container">
                <p className="title heading">
                    <span>Quản Lý Đơn hàng</span>
                </p>
                {isLoading ? <div className="loader"></div> :
                    <div className="table-box">
                        <table id="food-table">
                            <thead>
                                <tr>
                                    <th>Người mua</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                    <th>Tổng thanh toán</th>
                                    <th>Ngày đặt</th>
                                    <th>Danh sách món</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listOrder.length > 0 &&
                                    listOrder.map(o => (
                                        <tr key={o.id}>
                                            <td>{o.name}</td>
                                            <td>{o.phoneNumber}</td>
                                            <td>{o.address}</td>
                                            <td>{o.orderTotal}</td>
                                            <td>{moment(o.orderDate).format('DD/MM/YYYY , hh:mm a')}</td>
                                            < td >
                                                <span className="action_btn">
                                                    <span className="fas fa-eye"
                                                        onClick={() =>
                                                        {
                                                            setOrderDetail(o.orderDetails);
                                                            toggle();
                                                        }}></span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </div>
                }
            </div>
            <OrderModal
                isShowing={isShowing}
                hide={toggle}
                orderDetail={orderDetail}
            />
        </section>
    )
}

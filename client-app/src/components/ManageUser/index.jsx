import useGetFilter from '../../hooks/useGetFilter';
import { GET_ALL_USER } from '../../api/apiUser';
import Pagination from '../Other/Pagination';
import React from 'react';

export default function ManageUser()
{
    const { isLoading, data: listUser, pagination,
        handlePagination } = useGetFilter(GET_ALL_USER);

    const handlePageChange = (newPage) => handlePagination(newPage);

    return (
        <section className="manage-container">
            <div className="table-Container">
                <p className="title heading">
                    <span>Quản Lý Người dùng</span>
                </p>
                {isLoading ? <div className="loader"></div> :
                    <div className="table-box">
                        <table id="food-table">
                            <thead>
                                <tr>
                                    <th>Tên đăng nhập</th>
                                    <th>Tên hiển thị</th>
                                    <th>Email</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                    <th>Vai trò</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listUser.length > 0 &&
                                    listUser.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.username}</td>
                                            <td>{u.displayname}</td>
                                            <td>{u.email}</td>
                                            <td>{u.phoneNumber}</td>
                                            <td>{u.address}</td>
                                            <td>{u.role}</td>
                                            < td >
                                                <span className="action_btn">
                                                    <span className="fas fa-user-lock"></span>
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
        </section>
    )
}

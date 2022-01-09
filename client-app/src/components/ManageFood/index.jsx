import { GET_FOOD, DELETE_FOOD } from '../../api/apiFood';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function ManageFood()
{
    const [listFood, setListFood] = useState([]);
    useEffect(() => getFood(), []);

    const getFood = async () =>
    {
        const response = await GET_FOOD();
        if (response.status === 200)
        {
            setListFood(response.data);
        }
    };

    const handleDelete = async (foodId) =>
    {
        if (window.confirm("Bạn chắc chắn muốn xoá chứ ?"))
        {
            const response = await DELETE_FOOD(foodId);
            if (response.status === 204)
            {
                toast.success("Xoá thành công");
            }
            else
            {
                toast.error("Xoá thất bại");
            }
            await getFood();
        }
    }

    return (
        <section className="manage-container">
            <div className="table-Container">
                <p className="title heading">
                    <span>Quản Lý Món Ăn</span>
                </p>
                <Link to="/manage/food/create">
                    <span className="upsert">
                        <i className="fas fa-plus"></i> &nbsp;
                        Tạo món mới
                    </span>
                </Link>
                <div className="table-box">
                    <table id="food-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listFood.length > 0 &&
                                listFood.map(f => (
                                    <tr key={f.id}>
                                        <td>{f.name}</td>
                                        <td>{f.price}</td>
                                        <td>{f.description}</td>
                                        <td>
                                            <span className="action_btn">
                                                <Link to={"/manage/food/edit/" + f.id}>
                                                    <span className="fas fa-edit"></span>
                                                </Link>

                                                <span className="fas fa-trash-alt"
                                                    onClick={() => handleDelete(f.id)}></span>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
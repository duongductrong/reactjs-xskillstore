import React, { useEffect, useState } from 'react';
import Management from '../../components/layout/Common/Management';
import Box from '../../components/element/Box/Box';
import Color from '../../components/element/Color/Color';
import { Line } from 'react-chartjs-2';
import useHttpRequest from '../../hooks/useHttpRequest';
import queryString from 'query-string';
import moment from 'moment';

function HomeManagement() {
	const { get } = useHttpRequest();
	const [statistical, setStatistical] = useState([]);

	const countArrayFields = (data = [], field) => {
		return data.reduce((total, current) => total + current[field].length, 0);
	};

	useEffect(() => {
		get('/statistical', {
			params: {
				to: moment().subtract(-1, 'day').format('DD/MM/YYYY'),
				from: moment().subtract(6, 'day').format('DD/MM/YYYY'),
			},
		}).then((res) => {
			const { data } = res.data;

			setStatistical(data);
		});
	}, []);

	return (
		<Management>
			<div className='home-management'>
				<h1>Bảng điều khiển</h1>

				<div>
					<Box style={{ marginBottom: '1rem' }} title='Thống kê đơn hàng đã đặt (7 Ngày gần đây)'>
						Đơn đặt hàng hiện có: <h2>{countArrayFields(statistical, 'orders_placed')}</h2>
					</Box>

					<Box style={{ marginBottom: '1rem' }} title='Thống kê đơn thành công (7 Ngày gần đây)'>
						Đã bán thành công: <h2>{countArrayFields(statistical, 'sold_orders')}</h2>
					</Box>

					<Box style={{ marginBottom: '1rem' }} title='Thống kê đơn huỷ (7 Ngày gần đây)'>
						Đơn bị huỷ: <h2>{countArrayFields(statistical, 'cancel_orders')}</h2>
					</Box>
				</div>
			</div>
		</Management>
	);
}

export default HomeManagement;

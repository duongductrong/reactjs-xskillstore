import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';

import Store from '../components/layout/Common/Store';
import LayoutMedium from '../components/layout/LayoutMedium';
import Box from '../components/element/Box/Box';
import useHttpRequest from '../hooks/useHttpRequest';
import Button from '../components/element/Button/Button';
import { NavLink } from 'react-router-dom';

export default function MyOrders() {
	const [datasets, setDatasets] = useState([]);
	const [spent, setSpent] = useState(0);
	const columns = useMemo(
		() => [
			{
				Header: 'Mã đơn',
				accessor: '_id',
				Cell: ({ value }) => <NavLink to={`/find-orders?${value}`}>{value}</NavLink>,
			},
			{
				Header: 'Tổng giá hoá đơn',
				accessor: 'price',
				Cell: ({ value }) => Intl.NumberFormat('vi-VN').format(value) + ' VNĐ',
			},
			{
				Header: 'Mã khuyến mãi sử dụng',
				accessor: 'promotion',
				Cell: ({ value }) => {
					if(value) {
						value = JSON.parse(value);
						
						return (value ? <> {`Khuyến mãi: ${value.name}`} <br /> {`Giảm: ${value.percent}%`} </> : '')
					}
					
					return "";
				},
			},
			{
				Header: 'Giao hàng thành công',
				accessor: 'verify',
				Cell: ({ value }) => (value ? 'Đã giao' : 'Đang cập nhật'),
			},
			{
				Header: 'Đã huỷ đơn',
				accessor: 'cancel',
				Cell: ({ value }) => (value ? 'Đã bị huỷ' : 'Đang cập nhật'),
			},
			{
				Header: 'Ghi chú đơn',
				accessor: 'message',
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		page,
		prepareRow,

		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: datasets,
			initialState: {
				pageSize: 5,
				pageIndex: 0,
			},
		},
		usePagination
	);

	const { get } = useHttpRequest();

	useEffect(() => {
		get('/purchased/userOrders').then((res) => {
			const { userOrders, spent } = res.data;
			setDatasets(userOrders);
			setSpent(spent);
		});
	}, []);

	return (
		<Store>
			<LayoutMedium className='user-orders'>
				<h2 className='user-orders__title'>Danh sách đơn hàng</h2>

				<h4>Tổng chi phí đã chi tiêu: {Intl.NumberFormat('vi-VN').format(spent)} VNĐ</h4>

				<table className='user-orders__table' {...getTableProps()}>
					<thead>
						{
							// Loop over the header rows
							headerGroups.map((headerGroup) => (
								// Apply the header row props
								<tr {...headerGroup.getHeaderGroupProps()}>
									{
										// Loop over the headers in each row
										headerGroup.headers.map((column) => (
											// Apply the header cell props
											<th {...column.getHeaderProps()}>
												{
													// Render the header
													column.render('Header')
												}
											</th>
										))
									}
								</tr>
							))
						}
					</thead>
					<tbody {...getTableBodyProps()}>
						{
							// Loop over the table rows
							page.map((row) => {
								// Prepare the row for display
								prepareRow(row);
								return (
									// Apply the row props
									<tr {...row.getRowProps()}>
										{
											// Loop over the rows cells
											row.cells.map((cell) => {
												// Apply the cell props
												return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
											})
										}
									</tr>
								);
							})
						}
					</tbody>
				</table>

				<div className='user-orders__pagination'>
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Trước
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Sau
					</Button>
				</div>
			</LayoutMedium>
		</Store>
	);
}

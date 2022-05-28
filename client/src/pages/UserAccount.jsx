import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../components/element/Button/Button';
import Input from '../components/element/Form/Input';
import Store from '../components/layout/Common/Store';
import LayoutMedium from '../components/layout/LayoutMedium';
import useAuth from '../hooks/useAuth';
import useHttpRequest from '../hooks/useHttpRequest';
import { useToast } from 'react-toastx';

import AvatarResource from '../images/avatar.jpeg';

function UserAccount() {
	const { auth, isLoggedIn, fetch } = useAuth();
	const { success, error, core } = useToast();
	const { put } = useHttpRequest();
	const url = `${process.env.REACT_APP_API_ENDPOINT}/api/users/${auth._id}`;

	const [data, setData] = useState({ ...auth });
	const [errors, setErrors] = useState({});

	const onChangeValue = (field) => (event) => {
		setData({
			...data,
			[field]: event.target.value,
		});
	};

	const onUpdateUserInfo = () => {
		core('Đang xử lý....', { position: 'bottom-right', closeTimeout: 900 });

		put(url, data).then((res) => {
			setErrors({});
			// Refetch auth info
			const { code, errors } = res.data;
			if (code === 200) {
				setTimeout(() => {
          success('Cập nhật thành công', { closeTimeout: 3000, position: 'bottom-right' });
        }, 1000);

				fetch();
			} else if (code === 400) {
				setTimeout(() => {
          error('Có lỗi xảy ra với các trường thông tin', { closeTimeout: 3000, position: 'bottom-right' });
        }, 1000);

				for (const field in errors) {
					const { msgVi } = errors[field];

					setErrors((prev) => ({ ...prev, [field]: msgVi }));
				}
			}
		});
	};

	useEffect(() => {
		setData(auth);
	}, [isLoggedIn]);

	return (
		<Store>
			<LayoutMedium>
				<div className='user-account'>
					<div className='user-account__avatar'>
						<img src={AvatarResource} alt='avatar' />
					</div>

					<div className='col-full mb-base'>
						<small style={{ display: 'block' }}> Tên tài khoản </small>
						<Input placeholder='Tên tài khoản' value={data.username} disabled />
						{errors.username && <small className='user-account--error'>{errors.username}</small>}
					</div>

					<div className='col mb-base'>
						<small style={{ display: 'block' }}> Họ người dùng </small>
						<Input placeholder='Họ người dùng' value={data.firstname} onChange={onChangeValue('firstname')} />
						{errors.firstname && <small className='user-account--error'>{errors.firstname}</small>}
					</div>

					<div className='col mb-base'>
						<small style={{ display: 'block' }}> Tên người dùng </small>
						<Input placeholder='Tên người dùng' value={data.lastname} onChange={onChangeValue('lastname')} />
						{errors.lastname && <small className='user-account--error'>{errors.lastname}</small>}
					</div>

					<div className='col mb-base'>
						<small style={{ display: 'block' }}> Số điện thoại </small>
						<Input placeholder='Tên người dùng' value={data.number_phone} onChange={onChangeValue('number_phone')} />
						{errors.number_phone && <small className='user-account--error'>{errors.number_phone}</small>}
					</div>

					<div className='col mb-base'>
						<small style={{ display: 'block' }}> Địa chỉ hiện tại </small>
						<Input placeholder='Tên người dùng' value={data.address} onChange={onChangeValue('address')} />
						{errors.address && <small className='user-account--error'>{errors.address}</small>}
					</div>

					<div className='col-full'>
						<Button onClick={onUpdateUserInfo}>Cập nhật thông tin</Button>
					</div>
				</div>
			</LayoutMedium>
		</Store>
	);
}

export default UserAccount;

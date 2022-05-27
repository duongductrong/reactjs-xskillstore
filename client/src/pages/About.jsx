import React from 'react';
import Store from '../components/layout/Common/Store';
import LayoutMedium from '../components/layout/LayoutMedium';

import AboutAvatar from '../images/duongductrong.jpeg';

export default function About() {
	return (
		<Store>
			<LayoutMedium className='about-page'>
				<div className='about-page__avatar'>
					<img src={AboutAvatar} alt='Avatar' />
				</div>

				<div className='about-page__content'>
					<h3>1. Giới thiệu</h3>
					<h2 className='about-page__title'>Dương Đức Trọng</h2>
					<p className='about-page__desc'>
						Là sinh viên trường <span className="highlight">Đại học Tôn Đức Thắng - Hệ Cao đẳng</span>, thuộc khoá 186.
						<br />
						<br />
						Hiện đang làm việc tại công ty công nghệ
						<a href='https://riofintech.vn/vi' target='_blank'>
							<b>RIO Technology</b>
						</a>{' '}
						với vị trí <br /> <b> Frontend & Backend Developer </b>
						với 2 năm kinh nghiệm làm việc trong lĩnh vực này.
					</p>

					<h3>2. Thông tin về tôi</h3>
					<p>
						Portfolio:
						<a target="_blank" href='https://insignt.codestus.com/'>https://insignt.codestus.com/</a>
					</p>
					<p>
						Linkedin:
						<a target="_blank" href='https://www.linkedin.com/in/duongductrong/'>https://www.linkedin.com/in/duongductrong/</a>
					</p>
				</div>
			</LayoutMedium>
		</Store>
	);
}

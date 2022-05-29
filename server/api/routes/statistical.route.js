const router = require('express').Router();
const userMiddleware = require('../middlewares/user.middleware');
const Statistical = require('../models/statistical.model');
const moment = require('moment');
const Notification = require('../modules/Notification');

// Only this route, not follow MVC diagram
router.get('/', userMiddleware.checkAuth, async (req, res) => {
	const { from = moment().format('DD/MM/YYYY'), to = moment().subtract(6).format('DD/MM/YYYY') } = req.query;

	const _from = moment(from, 'DD/MM/YYYY').toDate();
	const _to = moment(to, 'DD/MM/YYYY').toDate();

	try {
		const results = await Statistical.find({
			created_at: {
				$lte: _to,
				$gte: _from,
			},
		});

		return res.status(200).json(Notification.message('Lấy dữ liệu thành công', 'ok', 200, { data: results }));
	} catch {
		return res.status(500).json(Notification.message('Lấy dữ liệu thành công', 'ok', 200, { data: results }));
	}
});

router.put('/tracking', userMiddleware.checkAuth, async (req, res) => {
	const { orders_placed = {}, sold_orders = {}, cancel_orders = {}, views = false } = req.body || [];

	const now = moment().format('DD/MM/YYYY');

	let todayStatistical = await Statistical.findOne({
		date_at: now,
	}).sort({ created_at: -1 });

	if (!todayStatistical) {
		await Statistical.create({
			created_at: moment().toDate(),
			date_at: now,
			orders_placed: [],
			sold_orders: [],
			cancel_orders: [],
			views: 0,
		});

		todayStatistical = await Statistical.findOne({
			created_at: {
				$lte: moment().toDate(),
				$gte: moment().subtract(1).toDate(),
			},
		});
	}

	if (Object.keys(orders_placed).length) {
		const wasExist = todayStatistical.orders_placed.find((order) => order._id == orders_placed._id);
		if (!wasExist) {
			todayStatistical.orders_placed = [...todayStatistical.orders_placed, { ...orders_placed }];
		}
	}

	if (Object.keys(sold_orders).length) {
		// Remove in cancel orders
		todayStatistical.cancel_orders = todayStatistical.cancel_orders.filter((order) => {
			return order._id != sold_orders._id;
		});

		const wasExist = todayStatistical.sold_orders.find((order) => order._id == sold_orders._id);
		if (!wasExist) {
			todayStatistical.sold_orders = [...todayStatistical.sold_orders, { ...sold_orders }];
		}
	}

	if (Object.keys(cancel_orders).length) {
		// Remove in cancel orders
		todayStatistical.sold_orders = todayStatistical.sold_orders.filter((order) => {
			return order._id != cancel_orders._id;
		});

		const wasExist = todayStatistical.cancel_orders.find((order) => order._id == cancel_orders._id);
		if (!wasExist) {
			todayStatistical.cancel_orders = [...todayStatistical.cancel_orders, { ...cancel_orders }];
		}
	}

	if (views) {
		todayStatistical.views = todayStatistical.views + 1;
	}

	await todayStatistical.save();

	return res.status(200).json(todayStatistical);
});

module.exports = router;

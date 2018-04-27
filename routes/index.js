const router = require('koa-router')()
const home = require('../controllers/home');

/**
 * 测试路由
 */
router.get('/test', home.test);
/**
 * api路由
 */
router.get('/api', home.index);
router.post('/api/auth', home.auth);
router.get('/api/get-user-info', home.getUserInfo);

module.exports = router;

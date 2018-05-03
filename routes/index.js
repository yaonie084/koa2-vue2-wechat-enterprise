const router = require('koa-router')()
const home = require('../controllers/home');
const funenc = require('../controllers/funenc');

/**
 * 测试路由
 */
router.get('/api/test', home.test);
/**
 * api路由
 */
router.get('/api/funenc/wx/get-user-info', funenc.wxGetUserInfo);
router.get('/api/funenc/wx/scan-get-user-info', funenc.wxScanGetUserInfo);
router.get('/api/funenc/dd/get-user-info', funenc.ddGetUserInfo);
router.get('/api/funenc/dd/scan-get-user-info', funenc.ddScanGetUserInfo);

module.exports = router;

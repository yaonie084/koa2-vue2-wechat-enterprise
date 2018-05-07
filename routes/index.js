const router = require('koa-router')()
const home = require('../controllers/home');
const funenc = require('../controllers/funenc');

router.prefix('/api')
/**
 * 测试路由
 */
router.get('/test', home.test);
/**
 * api路由
 */
router.get('/funenc/wx/get-user-info', funenc.wxGetUserInfo);
router.get('/funenc/wx/scan-get-user-info', funenc.wxScanGetUserInfo);
router.get('/funenc/dd/get-user-info', funenc.ddGetUserInfo);
router.get('/funenc/dd/scan-get-user-info', funenc.ddScanGetUserInfo);
router.get('/funenc/dd/sign', funenc.ddSign);

module.exports = router;

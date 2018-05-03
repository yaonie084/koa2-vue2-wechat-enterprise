[![Build Status](https://travis-ci.org/yaonie084/koa2-vue2-wechat-enterprise.svg?branch=master)](https://travis-ci.org/yaonie084/koa2-vue2-wechat-enterprise)

# koa2-vue2-wechat-enterprise

> 前后端分离的企业微信第三方应用种子项目，后端用的koa2，前端用的vue2
> 方便在多个企业微信中部署同一个版本，前端代码在client目录下
> 集成了免登服务和jssdk的校验

## 准备
第三方应用的 corpid, secret, agentid, 通信录的secret, 一个备过案的域名，在企业微信里面配置好，如何配置参见企业微信的文档

## 后端Run Setup

``` bash
# 安装依赖
cnpm install

# 修改后端配置文件,将所有需要的全局变量都填里面
config/config.json

# 运行后端开发环境
npm start

# 运行后端第一个生产环境
NODE_ENV=company1_production nodemon bin/www

# 运行后端第二个生产环境
NODE_ENV=company2_production nodemon bin/www
```


## 前端Run Setup

### [富能通服务平台](http://service.funenc.com/)

``` bash
# 进入client目录初始化
# 选择完免登授权类型之后填写对应的参数
# 参数在富能通服务平台上
npm run init

# development环境
# 环境变量在 .env.development文件
npm run dev

# production环境
# 环境变量在 .env.production文件
npm run build
```


## 代码贡献流程

1. Fork这个项目
2. 创建你的feature分支 (`git checkout -b my-new-feature`)
3. Commit更改 (`git commit -am 'Add some feature'`)
4. Push到这个分支 (`git push origin my-new-feature`)
5. 新建Pull Request
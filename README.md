[![Build Status](https://travis-ci.org/yaonie084/koa2-vue2-wechat-enterprise.svg?branch=master)](https://travis-ci.org/yaonie084/koa2-vue2-wechat-enterprise)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Coverage Status](https://coveralls.io/repos/github/yaonie084/koa2-vue2-wechat-enterprise/badge.svg?branch=fix-jest)](https://coveralls.io/github/yaonie084/koa2-vue2-wechat-enterprise?branch=fix-jest)

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

``` bash
# 安装依赖
cnpm install

# 修改后端配置文件,将所有需要的全局变量都填里面
src/src/global.js

# 运行开发环境
npm run dev

# 运行前端第一个生产环境
NODE_ENV=company1_production npm run build

# 运行前端第二个生成环境
NODE_ENV=company2_production npm run build
```

##todo
通过环境变量来加载assets目录
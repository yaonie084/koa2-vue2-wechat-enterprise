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
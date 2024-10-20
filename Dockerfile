# 使用官方 Node.js 镜像作为基础镜像
FROM node:20.10.0-alpine3.18
# FROM registry.us-west-1.aliyuncs.com/n2boost/node:base-pnpm-20.10.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
# COPY package.json ./
# 复制项目文件到工作目录
COPY . .
RUN npm install pnpm@8.15.5 -g --registry https://registry.npmmirror.com
RUN pnpm config set registry https://registry.npmmirror.com/

# 安装项目依赖
RUN pnpm install
# RUN pnpm list

RUN pnpm run build || { echo 'Build failed'; exit 1; }

#  先跑 node
EXPOSE 3000
# RUN yarn run build
#
# 启动应用程序
CMD ["pnpm", "run", "start"]
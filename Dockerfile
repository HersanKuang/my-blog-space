# 使用 Node.js 20 版本的官方镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制所有文件到工作目录
COPY . .

# 构建项目
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["pnpm", "start"]

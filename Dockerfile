# 使用 Node.js 20 版本的官方镜像
FROM node:20

# 设置构建参数
ARG NPM_REGISTRY
ENV NPM_CONFIG_REGISTRY=${NPM_REGISTRY}

# 设置工作目录
WORKDIR /app

# 配置 npm 和安装 pnpm
RUN npm config set registry ${NPM_CONFIG_REGISTRY} \
    && echo "npm registry:" \
    && npm config get registry \
    && npm install -g pnpm \
    && pnpm config set registry ${NPM_CONFIG_REGISTRY} \
    && echo "pnpm registry:" \
    && pnpm config get registry

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制所有文件到工作目录
COPY . .

# 构建项目
RUN pnpm build

# 暴露端口
EXPOSE 9090

# 启动 Next.js 应用
CMD ["pnpm", "start"]

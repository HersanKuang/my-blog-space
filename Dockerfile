# 使用 Alpine 版 Node.js 20 作为基础镜像
FROM node:20-alpine AS base

# 添加 Alpine 兼容依赖
RUN apk add --no-cache tzdata libc6-compat

# 配置环境变量及Corepack
ENV TZ=Asia/Shanghai \
    NODE_ENV=production \
    NODE_PATH="/app"
RUN corepack enable && corepack prepare pnpm@9.4.0 --activate

FROM base AS deps
WORKDIR /app

# 复制依赖文件并安装依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# 复用依赖阶段的 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制全部源代码
COPY . .

# 执行构建命令（需确保 next.config.js 配置 output: 'standalone'）
RUN pnpm build

# 把静态资源复制到 standalone 中
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

FROM base AS runner
WORKDIR /app

# 设置环境变量
ENV PORT=9090

# 复制构建产物
COPY --from=builder /app/.next/standalone ./

# 暴露端口并启动应用
EXPOSE 9090
CMD ["node", ".next/standalone/server.js"]

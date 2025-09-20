FROM node:20-alpine AS builder

ARG PACKAGE_NAME

RUN npm install -g pnpm

WORKDIR /app


COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

COPY apps/${PACKAGE_NAME}/package.json ./apps/${PACKAGE_NAME}/

RUN pnpm install

COPY tsconfig.json .

COPY apps/${PACKAGE_NAME}/ ./apps/${PACKAGE_NAME}/

RUN pnpm --filter ${PACKAGE_NAME} run build

RUN pnpm --filter ${PACKAGE_NAME} --prod deploy ./deploy

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/deploy .

EXPOSE 80

CMD ["node", "dist/main.js"]
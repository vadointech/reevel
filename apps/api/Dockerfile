FROM node:20-alpine AS builder

ARG PACKAGE_NAME

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

COPY apps/${PACKAGE_NAME}/package.json ./apps/${PACKAGE_NAME}/
COPY packages/eslint-config/package.json ./packages/eslint-config/

RUN pnpm install

COPY packages/eslint-config/ ./packages/eslint-config/

COPY apps/${PACKAGE_NAME}/ ./apps/${PACKAGE_NAME}/

RUN pnpm --filter ${PACKAGE_NAME} run build

RUN pnpm --filter ${PACKAGE_NAME} --prod deploy ./deploy

CMD ["tail", "-f", "/dev/null"]

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/deploy .

EXPOSE 80

CMD ["node", "dist/main.js"]
# 使用官方Caddy镜像作为基础镜像
FROM caddy:alpine

# 将Caddyfile添加到容器中
COPY Caddyfile /etc/caddy/Caddyfile

# 将前端应用程序的构建输出复制到Caddy的默认网站根目录
# COPY dist /srv
#!/bin/bash

# 脚本名称: update-api-url.sh
# 描述: 自动更新 .env.development 文件中的 API URL 的本地 IP 地址
# 使用方法: ./update-api-url.sh

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 配置文件路径
ENV_FILE=".env.development"

# 检查文件是否存在
if [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}错误: $ENV_FILE 文件不存在${NC}"
  exit 1
fi

echo -e "${YELLOW}正在检测本地 IP 地址...${NC}"

# 获取本地 IP 地址 (排除回环地址和虚拟网卡)
# 这个方法适用于 macOS 和 Linux
LOCAL_IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | grep -v '169.254' | head -1 | awk '{print $2}')

# 如果上面的方法没有获取到 IP，尝试其他方法
if [ -z "$LOCAL_IP" ]; then
  # 尝试通过路由表获取
  LOCAL_IP=$(route get default | grep interface | awk '{print $2}' | xargs ifconfig | grep 'inet ' | grep -v '127.0.0.1' | head -1 | awk '{print $2}')
fi

# 如果还是没有获取到，使用网络连接方式获取
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | grep -Fv 169.254 | awk '{print $2}' | head -1)
fi

if [ -z "$LOCAL_IP" ]; then
  echo -e "${RED}错误: 无法检测到本地 IP 地址${NC}"
  exit 1
fi

echo -e "${GREEN}检测到本地 IP: $LOCAL_IP${NC}"

# 读取当前的 API URL
CURRENT_URL=$(grep "VITE_API_URL" "$ENV_FILE" | grep -v "^#" | head -1)

if [ -z "$CURRENT_URL" ]; then
  echo -e "${RED}错误: 在 $ENV_FILE 中未找到 VITE_API_URL 配置${NC}"
  exit 1
fi

echo -e "${YELLOW}当前配置: $CURRENT_URL${NC}"

# 提取端口号和路径
# 假设格式为: VITE_API_URL = http://IP:PORT/PATH
PORT_AND_PATH=$(echo "$CURRENT_URL" | sed -E 's/.*http:\/\/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+//')

if [ -z "$PORT_AND_PATH" ]; then
  # 如果没有端口和路径，默认使用 :9101/
  PORT_AND_PATH=":9101/"
fi

# 构建新的 URL
NEW_URL="VITE_API_URL = http://$LOCAL_IP$PORT_AND_PATH"

echo -e "${YELLOW}新的配置: $NEW_URL${NC}"

# 更新文件
# 使用 sed 来替换第一个未注释的 VITE_API_URL 行
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s|^VITE_API_URL = http://.*|$NEW_URL|" "$ENV_FILE"
else
  # Linux
  sed -i "s|^VITE_API_URL = http://.*|$NEW_URL|" "$ENV_FILE"
fi

echo -e "${GREEN}✅ API URL 更新完成！${NC}"
echo -e "${GREEN}新的配置已写入 $ENV_FILE${NC}"

# 显示更新后的内容
echo -e "\n${YELLOW}更新后的 $ENV_FILE 内容:${NC}"
cat "$ENV_FILE"

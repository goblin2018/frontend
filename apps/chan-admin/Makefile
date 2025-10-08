IMAGE_NAME=web
IMAGE_VERSION=v0.2.1
REGISTRY=registry.cn-shenzhen.aliyuncs.com
REPOSITORY=brainx/${IMAGE_NAME}

# 默认目标：构建、重命名并推送 Docker 镜像
ali: build tag push

# 构建 Docker 镜像
build:
	docker build --platform linux/amd64 -t $(IMAGE_NAME):$(IMAGE_VERSION) . 


# 为 Docker 镜像添加新的 tag
tag:
	docker tag $(IMAGE_NAME):$(IMAGE_VERSION) $(REGISTRY)/$(REPOSITORY):$(IMAGE_VERSION)

# 推送 Docker 镜像到远程仓库
push:
	docker push $(REGISTRY)/$(REPOSITORY):$(IMAGE_VERSION)
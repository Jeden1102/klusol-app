IMAGE_NAME=nextjs-dev

build-dev:
	docker build -t $(IMAGE_NAME) -f Dockerfile.dev .

run-dev:
	docker run -p 3000:3000 -v $(PWD):/app $(IMAGE_NAME)

dev: build-dev run-dev

bash:
	docker run -it -v $(PWD):/app --entrypoint /bin/sh nextjs-dev

add-component:
	docker run -it -v $(shell pwd):/app --entrypoint /bin/sh $(IMAGE_NAME) -c "cd /app && npx shadcn-ui@latest add $(c)"
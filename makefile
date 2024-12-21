deploy:
	docker build -t a1ex_blog . && docker run -d -p 3000:3000 --name a1ex_blog a1ex_blog
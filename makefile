deploy
	docker build -t a1ex_blog_web . && docker run -it --rm -p 3000:3000 a1ex_blog_web
FROM nginx:1.27-alpine

# nginx 기본 설정 제거 후 커스텀 설정 적용
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 정적 파일 복사
COPY index.html   /usr/share/nginx/html/index.html
COPY data.json    /usr/share/nginx/html/data.json
COPY articles.json /usr/share/nginx/html/articles.json

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

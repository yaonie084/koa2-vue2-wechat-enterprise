FROM registry.cn-hangzhou.aliyuncs.com/bjmaster/enterprise
ENV NODE_ENV=production
RUN mkdir /app
ADD ./ /app
RUN cd /app && npm install
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY redis.conf /etc/redis/redis.conf
COPY nginx /etc/nginx/sites-enabled/default
RUN mkdir /log
CMD ["/usr/bin/supervisord"]
call ng build --prod
call docker image build -t mateuszsojka/streamer-web-app:latest .
call docker push mateuszsojka/streamer-web-app:latest
pause

FROM node:current-stretch

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

#install chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list 

RUN apt update

RUN apt install google-chrome-stable fonts-freefont-ttf libxss1 --no-install-recommends -y \
    && rm -rf /var/lib/apt/lists/*

RUN apt upgrade -y

COPY . /usr/src/app

RUN npm install nodemon
RUN npm install


#PORT will most likely be set by your cloud provider. If not, uncomment the next line and set it here
# ENV PORT 8080

EXPOSE 8088

ENTRYPOINT [ "npm", "start"]
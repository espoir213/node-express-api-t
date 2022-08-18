#FROM ubuntu:20.04 as base
FROM ubuntu:latest

RUN apt-get update 

RUN apt-get install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -

RUN apt-get install -y nodejs

RUN mkdir /home/client

WORKDIR /home/client

COPY package.json /home/client

RUN npm i

RUN useradd --home /home/client client

COPY . /home/client

USER client

CMD [ "/usr/bin/npm","run","start" ]


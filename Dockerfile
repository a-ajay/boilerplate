FROM ubuntu:18.04
FROM continuumio/anaconda3
FROM node:10
FROM gramener/gramex:latest
RUN conda create -n env python=3.7
RUN echo "source activate env" > ~/.bashrc
ENV PATH /opt/conda/envs/env/bin:$PATH
RUN apt-get update && apt-get install -y \
      curl apt-utils apt-transport-https debconf-utils gcc build-essential \
      && rm -rf /var/lib/apt/lists/*
# adding custom MS repository
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update &&  ACCEPT_EULA=Y apt-get install -y msodbcsql17
RUN ACCEPT_EULA=Y apt-get install -y mssql-tools
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc 
RUN echo "source ~/.bashrc"
RUN apt-get install -y unixodbc-dev
RUN apt-get update && apt-get install -y \
      python-pip python-dev python-setuptools \
      --no-install-recommends \
      && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y locales \
      && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
      && locale-gen
RUN pip install --upgrade pip
RUN pip install gramexenterprise --verbose
COPY odbc.ini /etc/
RUN pip install thespian
RUN pip install --upgrade pyodbc
# RUN echo "odbcinst -i -s -f /etc/database.txt -h"
RUN apt-get update && apt-get install -y gettext nano vim -y
WORKDIR /app
COPY package*.json ./
COPY entry.sh /usr/local/bin/
COPY . /app/
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
      && apt-get install -y --no-install-recommends dialog \
      && apt-get update \
      && apt-get install -y --no-install-recommends openssh-server \
      && echo "$SSH_PASSWD" | chpasswd 
COPY sshd_config /etc/ssh/
COPY entry.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/entry.sh
RUN npm run start
EXPOSE 9988 2222 22 80 8000
CMD ["entry.sh"]

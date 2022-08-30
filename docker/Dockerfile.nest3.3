# TODO: background mode
# TODO: CMake by Repo
# ~/CSMI/GitHub/monitoring_interface/docker# time docker build -t csmi_nest_vue:test .

# syntax=docker/dockerfile:1
FROM ubuntu:20.04
LABEL maintainer "rudnick@uni-trier.de"
RUN mkdir /work
WORKDIR /work
COPY ./ /work

ENV TICS_PER_MS=1000
ENV TICS_PER_STEP=100
ENV TZ=Europe/Amsterdam

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y g++ && \
    apt-get install -y python3-dev cython3 && \
    apt-get install -y openssl libssl-dev && \
    apt-get install -y build-essential && \
    apt-get install -y tzdata && \
    apt-get install -y libreadline-dev && \
    apt-get install -y mpich && \
    apt-get install -y libboost1.71-dev && \
    apt-get install -y libgsl-dev libgslcblas0 libltdl-dev && \
    apt-get install -y doxygen wget

# https://apt.kitware.com
RUN wget https://apt.kitware.com/keys/kitware-archive-latest.asc && \
    gpg --dearmor kitware-archive-latest.asc && \
	mv kitware-archive-latest.asc.gpg /usr/share/keyrings/kitware-archive-keyring.gpg
ADD kitware.list .
RUN mv kitware.list /etc/apt/sources.list.d

RUN apt-get update && \
    apt-get install -y kitware-archive-keyring

RUN apt-get update && \
    apt-get install -y cmake

RUN wget https://github.com/nest/nest-simulator/archive/refs/tags/v3.3.tar.gz

RUN tar fvxz v3.3.tar.gz
RUN mkdir nest-simulator-3.3/BUILD && \
    cd nest-simulator-3.3/BUILD && \
    cmake -Dwith-cpp-std=c++17 \
          -DCMAKE_INSTALL_PREFIX:PATH=/usr/local \
          -Dwith-mpi=ON \
          -Dtics_per_ms=$TICS_PER_MS \
          -Dtics_per_step=$TICS_PER_STEP \
        .. && \
    make && \
    make install

RUN apt-get update && \
    apt-get install -y gunicorn python3-gunicorn && \
    apt-get install -y python3-numpy python3-flask && \
    apt-get install -y python3-flask-cors python3-restrictedpython && \
    apt-get install -y mc net-tools

RUN ln -s /usr/local/lib/python3.8/site-packages/nest \
          /usr/local/lib/python3.8/dist-packages

# curl -fsSL https://deb.nodesource.com/setup_18.x
ADD NodeAptInstall220909.sh .
RUN bash NodeAptInstall220909.sh && \
    apt-get install -y nodejs && \
	npm install --global @vue/cli && \
	vue --version



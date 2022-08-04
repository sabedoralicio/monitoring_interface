# TODO: background mode
# TODO: CMake by Repo

CM# syntax=docker/dockerfile:1
FROM ubuntu:20.04
LABEL maintainer "rudnick@uni-trier.de"

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

RUN wget https://cmake.org/files/v3.20/cmake-3.20.0.tar.gz
RUN wget https://github.com/nest/nest-simulator/archive/refs/tags/v3.3.tar.gz

RUN tar fvxz cmake-3.20.0.tar.gz && \
    cd cmake-3.20.0 && \
    ./bootstrap && \
    make && \
    make install

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

###################################################################
#
# ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib/nest

# RUN nest-server start -p 7777 -o
# RUN mpirun -np 1 nest-server-mpi --host 127.0.0.1 --port 7777
# RUN nest-server start -h $NEST_SERVER_HOST -p $NEST_SERVER_PORT -d
# RUN mpirun -np $NUM_WORKERS nest-server-mpi --host $NEST_SERVER_HOST --port $NEST_SERVER_PORT


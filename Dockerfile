# TODO: background mode
# TODO: CMake by Repo
# ~/CSMI/GitHub/monitoring_interface/docker# time docker build -t csmi_nest_node:at230130ground .

# syntax=docker/dockerfile:1
FROM ubuntu:20.04
LABEL maintainer "rudnick@uni-trier.de"
RUN mkdir /work
WORKDIR /work
COPY ./ /work
####COPY docker/ /work

ENV TICS_PER_MS=1000
ENV TICS_PER_STEP=100
ENV TZ=Europe/Amsterdam

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    apt-utils \
    cython3 \
    g++ \
    git \
    gsl-bin \
    libboost1.71-dev \
    libboost-atomic-dev \
    libboost-chrono-dev \
    libboost-date-time-dev \
    libboost-filesystem-dev \
    libboost-random-dev \
    libboost-regex-dev \
    libboost-serialization-dev \
    libboost-system-dev \
    libboost-thread-dev \
    libgsl-dev \
    libltdl-dev \
    libopenmpi-dev \
    libssl-dev \
    libtool \
    libwebsocketpp-dev  \
    make \
    netcat \
    ninja-build \
    openmpi-bin \
    openssl \
    pandoc \
    python3-dev \
    python3-mock \
    python3-pip \
    python3-venv \
    wget \
    build-essential \
    doxygen \
    libgslcblas0 \
    libreadline-dev \
    tzdata

RUN python3 -m pip install \
    python-dateutil>=2.8.2 \
    Pygments>=2.4.1 \
    packaging>=21.3 \
    docutils>=0.18.0 \
    flask \
    flask-cors \
    RestrictedPython \
    uwsgi \
    connexion==2.6.0 \
    flask_cors \
    more-itertools \
    numpy \
    orjson \
    requests \
    setuptools>=21.0.0 \
    Image \
    PyYAML>=4.2b1 \
    csvkit \
    cython \
    docutils \
    example \
    ipykernel \
    jupyter \
    matplotlib \
    mock \
    nbsphinx \
    numpydoc \
    path.py \
    pathlib \
    pytest \
    recommonmark \
    scipy \
    seaborn \
    sphinx>=4.0.2 \
    sphinx_autobuild \
    sphinx_gallery \
    statsmodels \
    tqdm \
    yamllint
###    sphinx_rtd_theme \
###    sphinx-tabs \
###    python_dateutil==2.6.0 \

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

RUN wget https://github.com/nest/nest-simulator/archive/refs/tags/v3.2.tar.gz
RUN wget https://github.com/nest/nest-simulator/releases/download/v3.2/nest-simulator-3.2-p1-VersionNumber.patch

RUN tar fvxz v3.2.tar.gz
RUN mkdir nest-simulator-3.2/BUILD && \
    cd nest-simulator-3.2 && \
    patch -p1 < ../nest-simulator-3.2-p1-VersionNumber.patch && \
    cd BUILD && \
    cmake  \
          -G Ninja \
          -DCMAKE_INSTALL_PREFIX:PATH=/usr/local \
          -Dwith-mpi=ON \
          -Dwith-python=ON \
          -Dtics_per_ms=$TICS_PER_MS \
          -Dtics_per_step=$TICS_PER_STEP \
        .. && \
    ninja && \
    ninja install
###    ninja && \
###    ninja html && \
###    ninja install

RUN apt-get update && \
    apt-get install -y gunicorn python3-gunicorn && \
    apt-get install -y mc net-tools

RUN ln -s /usr/local/lib/python3.8/site-packages/nest \
          /usr/local/lib/python3.8/dist-packages

# curl -fsSL https://deb.nodesource.com/setup_18.x
ADD NodeAptInstall220909.sh .
RUN bash NodeAptInstall220909.sh && \
    apt-get install -y nodejs && \
	npm install --global @vue/cli && \
	vue --version


RUN npm install --global @vue/cli-service
RUN npm install --global @vue/cli-plugin-babel
RUN npm install --global @vue/cli-plugin-e2e-cypress
RUN npm install --global @vue/cli-plugin-eslint
RUN npm install --global @vue/cli-plugin-typescript
RUN npm install --global @vue/cli-plugin-unit-jest

# RUN npm config set strict-ssl false
# RUN npm config set registry http://registry.npmjs.org/
# RUN npm config rm proxy 
# RUN npm config rm https-proxy --tried removing npm proxy 

RUN npm install --global pinia

# RUN npm config set strict-ssl true
# RUN npm config set registry https://registry.npmjs.org/

RUN npm install --global vue-cli-plugin-pinia
RUN npm install --global vue-cli-plugin-vuetify
RUN npm install --global @vue/cli-service
RUN npm install

EXPOSE 7777
#### CMD ["npm","run","serve","--","--port","7777","--host","0.0.0.0"]
CMD ["/bin/bash"]
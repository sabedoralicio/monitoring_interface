FROM ubuntu:20.04
LABEL maintainer "rudnick@uni-trier.de"

# TODO: Dependencies on bare Ubuntu 20.04
# TODO: background mode

ENV NUM_WORKERS=4
ENV NEST_SERVER_HOST=127.0.0.1
ENV NEST_SERVER_PORT=7777
ENV TICS_PER_MS=1000
ENV TICS_PER_STEP=100

ADD https://github.com/nest/nest-simulator/archive/refs/tags/v3.3.tar.gz

RUN mkdir nest-simulator-3.3/BUILD && \
    cd nest-simulator-3.3/BUILD && \
    cmake -Dwith-cpp-std=c++17 \
          -DCMAKE_INSTALL_PREFIX:PATH=/usr/local \
          -Dwith-mpi=ON \
          -Dtics_per_ms=$TICS_PER_MS \
          -Dtics_per_step=$TICS_PER_STEP \
        .. && \
    make && \
    sudo make install

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib/nest

# RUN nest-server start -p 7777 -o
# RUN mpirun -np 1 nest-server-mpi --host 127.0.0.1 --port 7777
RUN nest-server start -h $NEST_SERVER_HOST -p $NEST_SERVER_PORT -d
RUN mpirun -np $NUM_WORKERS nest-server-mpi --host $NEST_SERVER_HOST --port $NEST_SERVER_PORT

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
    sudo apt-get install -y nodejs
# > node --version
# v18.7.0
# > npm --version
# 8.15.0

# RUN sudo npm install -g @vue/cli
# > vue -V 
# @vue/cli 5.0.8

# RUN vue create monitoring_interface
# <code>Manually select features</code>

# <code>Babel</code>
# <code>TypeScript</code>
# <code>Router</code>
# <code>Vuex</code>
# <code>CSS Pre-processors</code>
# <code>Linter / Formatter</code>
# <code>Unit Testing</code>
# <code>E2E Testing</code>

# Version <code>3.x</code>
# Use class-style component syntax? <code>Y</code>
# Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? <code>Y</code>
# Use history mode for router? (Requires proper server setup for index fallback in production) <code>Y</code>
# Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): <code>Sass/SCSS (with dart-sass)</code>
# Pick a linter / formatter config: <code>ESLint + Prettier</code>
# Pick additional lint features: <code>Lint on save</code>
# Pick a unit testing solution: <code>Jest</code>
# Pick an E2E testing solution: <code>Cypress (Test in Chrome, Firefox, MS Edge, and Electron)</code>
# Where do you prefer placing config for Babel, ESLint, etc.? <code>In dedicated config files</code>
# Save this as a preset for future projects? <code>Y</code>
# Save preset as: <code>PRESET.220731</code>

# 👉  Get started with the following commands:
#  $ cd monitoring_interface
#  $ npm run serve

# cd monitoring_interface

# vue add vuetify
 
# Choose a preset: <code>Vuetify 3 Preview (Vuetify 3)</code>
# Would you like to install Vuetify 3 nightly build? (WARNING: Nightly builds are intended for development testing and may include bugs or other issues.) <code>N</code>

RUN npm run serve

# http://localhost:8081

CMD ["/bin/bash"]

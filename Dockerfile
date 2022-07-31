FROM ubuntu:20.04
LABEL maintainer "rudnick@uni-trier.de"

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
    sudo apt-get install -y nodejs
# > node --version
# v18.7.0
# > npm --version
# 8.15.0

# RUN npm init vue@latest
# ✔ Project name: … CSMI_2
# ✔ Package name: … csmi-2
# ✔ Add TypeScript? … Yes
# ✔ Add JSX Support? … No
# ✔ Add Vue Router for Single Page Application development? … No
# ✔ Add Pinia for state management? … No
# ✔ Add Vitest for Unit Testing? … Yes
# ✔ Add Cypress for End-to-End testing? … Yes
# ✔ Add ESLint for code quality? … Yes
# ✔ Add Prettier for code formatting? … Yes
# RUN cd CSMI_2
RUN npm install && \
    npm run lint && \
    npm run dev

# http://localhost:5173

CMD ["/bin/bash"]

# syntax=docker/dockerfile:1

FROM ubuntu:23.10

# install tools
RUN \
    --mount=type=cache,target=/var/lib/apt/lists \
    --mount=type=cache,target=/var/cache/apt/archives \
    apt-get update && \
    apt-get install -y build-essential curl unzip git wget gnupg

# install deno
RUN \
    curl -fsSL https://deno.land/x/install/install.sh | sh

# install llvm
RUN \
    --mount=type=cache,target=/var/lib/apt/lists \
    --mount=type=cache,target=/var/cache/apt/archives \
    echo 'deb http://apt.llvm.org/mantic/ llvm-toolchain-mantic-17 main' >> /etc/apt/sources.list && \
    echo 'deb-src http://apt.llvm.org/mantic/ llvm-toolchain-mantic-17 main' >> /etc/apt/sources.list && \
    wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | apt-key add - && \
    apt-get update && \
    apt-get install -y clang-17 lld-17 llvm-17 llvm-17-dev 

# set pass
RUN echo 'export PATH=$PATH:/root/.deno/bin' >> /root/.bashrc

ENV LLDENO_17=/usr/lib/llvm-17/lib/libLLVM.so
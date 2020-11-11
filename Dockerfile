FROM cypress/browsers:chrome69
WORKDIR /home/node/app

# dependencies will be installed only if the package files change
COPY package.json .
COPY package-lock.json .
COPY cypress.json .
# Use artifactory
ENV NODE_TLS_REJECT_UNAUTHORIZED=0



# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
# install NPM dependencies and Cypress binary
RUN npm ci


# check if the binary was installed successfully
RUN $(npm bin)/cypress verify

COPY . .




## Getting started

Make sure proxy is off and NODE_TLS_REJECT_UNAUTHORIZED is off.

```
proxy_off
export NODE_TLS_REJECT_UNAUTHORIZED=0
nvm use
yarn
yarn open
```


# Bypassing Datapower authentication

Download NGINX

For mac `brew install nginx`

```
For killing the proxy run the following in command line.
ps -ef | grep -i nginx


Following similar output will be generated
427805193 80185     1   0  9:53am ??         0:00.00 nginx: master process nginx -c {path}/nginx.conf
427805193 80186 80185   0  9:53am ??         0:00.03 nginx: worker process
427805193 80980 79797   0  9:57am ttys001    0:00.00 grep -i nginx

capture first process id like 80815 and run  the command kill 80815 in the command line.
```

# Running tests

`node runner.js -b electron`

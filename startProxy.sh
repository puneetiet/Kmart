#!/bin/bash
set -e
# Quit any existing nginx processes but dont fail if there are none.
! nginx -s quit
nginx -c $PWD/nginx.conf
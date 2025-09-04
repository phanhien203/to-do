#!/bin/sh

set -ex

find /usr/share/nginx/html -type f \( -name "*.js" -o -name "*.html" \) | while read file; do
    sed -i "s|%BASE_URL%|$BASE_URL|g" "$file"
    envsubst '$BASE_URL' < "$file" > "$file.tmp"
done

exec "$@"

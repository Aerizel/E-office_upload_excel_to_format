#!/bin/sh

echo "Injecting environment variables..."
for file in $(find .next -type f -name "*.js"); do
  sed -i "s|NEXT_PUBLIC_BACKEND_API_PLACEHOLDER|$NEXT_PUBLIC_BACKEND_API|g" $file
done

exec "$@"

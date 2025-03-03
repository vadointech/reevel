#!/bin/bash

OUTPUT_FILE="./public/next-static.json"
FOLDER=".next/static"
PREFIX="/_next/static"

echo '[' > $OUTPUT_FILE

FILES=$(find $FOLDER -type f)

COUNT=$(echo "$FILES" | wc -l)

CURRENT=0

echo "$FILES" | while read -r FILE; do
  RELATIVE_PATH="${FILE#$FOLDER}"

  CURRENT=$((CURRENT + 1))

  if [ "$CURRENT" -eq "$COUNT" ]; then
    echo "  \"$PREFIX$RELATIVE_PATH\"" >> $OUTPUT_FILE
  else
    echo "  \"$PREFIX$RELATIVE_PATH\"," >> $OUTPUT_FILE
  fi
done

echo ']' >> $OUTPUT_FILE
#!/usr/bin/env sh

input=$(cat "$1")

len=${#input}

i=1
level=0

while [ $i -le "$len" ]; do
	char=$(echo "$input" | cut -c "$i")
	if [ "$char" = "(" ]; then
		level=$((level + 1))
	elif [ "$char" = ")" ]; then
		level=$((level - 1))
	fi
	i=$((i + 1))
done

echo "$level"

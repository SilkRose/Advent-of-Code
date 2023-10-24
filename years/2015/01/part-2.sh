#!/usr/bin/env sh

input=$(cat "$1")

i=1
level=0

until [ $level -eq -1 ]; do
	char=$(echo "$input" | cut -c "$i")
	if [ "$char" = "(" ]; then
		level=$((level + 1))
	elif [ "$char" = ")" ]; then
		level=$((level - 1))
	fi
	i=$((i + 1))
done

i=$((i - 1))
echo "$i"

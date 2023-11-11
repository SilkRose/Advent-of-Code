#!/usr/bin/env sh

input=$(sh ./get-input.sh 2015 1)

len=${#input}

i=1
level=0
basement=0

while [ $i -le "$len" ]; do
	char=$(echo "$input" | cut -c "$i")
	if [ "$char" = "(" ]; then
		level=$((level + 1))
	elif [ "$char" = ")" ]; then
		level=$((level - 1))
	fi
	if [ $level -eq -1 ] && [ $basement -eq 0 ]; then
		basement=$i
	fi
	i=$((i + 1))
done

echo "Part 1: $level"
echo "Part 2: $basement"

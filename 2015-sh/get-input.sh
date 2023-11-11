#!/usr/bin/env sh

year="$1"
day="$2"

if [ ! -d "./input" ]; then
	mkdir ./input
fi

file="./input/$year-$day.txt"

if test -f "$file"; then
	cat "$file"
else
	curl -b "../cookies" "https://adventofcode.com/$year/day/$day/input" > "$file"
	cat "$file"
fi

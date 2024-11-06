#!/bin/bash

# Run Cucumber with the JSON format and output to usage_report.json
echo "Generating Cucumber usage report in txt format..."
npx cucumber-js --format usage > usage_details.txt

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Usage report successfully generated: usage_details.txt"
else
  echo "Failed to generate usage report."
  exit 1
fi

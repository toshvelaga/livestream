#!/bin/bash

# list env variables in linux in alphabaletical order
env -0 | sort -z | tr '\0' '\n'
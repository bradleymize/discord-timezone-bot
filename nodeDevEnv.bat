docker run ^
  -it ^
  --rm ^
  --name bot ^
  --volume %cd%:/usr/src/app ^
  --workdir /usr/src/app ^
  node:18 /bin/bash
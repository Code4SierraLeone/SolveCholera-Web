# Solve-Cholera Client
Solve-Cholera Client is a javascript client for Solve-Cholera REST API server.

## Setup

Client requires `nodejs` installed and a few steps:
```
npm install -g grunt-cli
npm install # install other node dependencies
```
After you can start local dev server on port `9000`:
```
grunt server
```

### Running with docker
This also will start frontend on localhost:9000.
Change `http://localhost:5000` to an actual backend server.
```
docker build -t Solve-Cholera-client:devel ./
docker run -i -p 9000:9000 -t Solve-Cholera-client:devel grunt server --server=http://localhost:5000 --force
```

Also u can start it with default parameters using vagrant:
```
vagrant up --provider=docker
```

## Info for contributors

### Commit messages

Every commit has to have a meaningful commit message in form:

```
Title
[<empty line>
Description]
[<empty line>
JIRA ref]
```

Where [JIRA ref](https://confluence.atlassian.com/display/FISHEYE/Using+smart+commits) is at least Issue code eg. ```LBSD-13```.

For trivial changes you can ommit JIRA ref or Description or both: ```Fix typo in Solve-Cholera.translate docs.```

### CI

You can test your code before sending a PR via: ```grunt ci```

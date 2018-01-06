# Solve Cholera
[Download](https://github.com/liveblog/liveblog/archive/master.zip) •
[Fork](https://github.com/Code4SierraLeone/SolveCholera-Web) •
[License](https://github.com/Code4SierraLeone/SolveCholera-Web/blob/master/LICENSE) •


## Installation

### How to install Solve-Cholera locally (recommended)

Here I'm assuming you are running Ubuntu Linux 16.04 

#### Install the dependencies

First we need to install the necessary dependencies:

```bash
sudo apt-get install mongodb redis-server
```

We currently require a specific version of elastic search (not sure why we need that, but it might come in a handy later on):

```bash
wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb http://packages.elastic.co/elasticsearch/1.7/debian stable main" | sudo tee --append /etc/apt/sources.list.d/elastic.list
sudo apt-get update
sudo apt-get install openjdk-8-jre elasticsearch
```

Remove the elasticsearch node discovery functionality:

```bash
echo "discovery.zen.ping.multicast.enabled: false" | sudo tee --append /etc/default/elasticsearch
```

Install Node.js LTS version:

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs
```

Install The various Python requirements

```bash
sudo apt-get install \
python3 python3-dev python3-pip python3-lxml \
build-essential libffi-dev git \
libtiff5-dev libjpeg8-dev zlib1g-dev \
libfreetype6-dev liblcms2-dev libwebp-dev \
curl libfontconfig virtualenv libssl-dev
```

Install the required npm tools:

```bash
sudo npm install -g grunt-cli
```

#### Configure the server

Now we can create the python virtual environment and install the server dependencies:

```bash
cd server
virtualenv -p python3 env
source env/bin/activate
pip install --upgrade setuptools
pip install -r requirements.txt
```

Add the default data:

```bash
python3 manage.py app:initialize_data;
python3 manage.py users:create -u admin -p admin -e 'admin@example.com' --admin ;
python3 manage.py register_local_themes ;
```

Still in the virtualenv, you can now start the server

```bash
honcho -f ../docker/Procfile-dev start
```

If you encounter any connection errors from elastic search:

```bash
elasticsearch.exceptions.ConnectionError: ConnectionError(<urllib3.connection.HTTPConnection object at 0x7f9434838358>: Failed to establish a new connection: [Errno 111] Connection refused) caused by: NewConnectionError(<urllib3.connection.HTTPConnection object at 0x7f9434838358>: Failed to establish a new connection: [Errno 111] Connection refused)
```

You will need to restart and elasticsearch and wait 10 seconds before starting honcho.

```bash
sudo service elasticsearch restart
sleep 10
honcho -f ../docker/Procfile-dev start
```

#### Configure the client

Now we can install the dependencies for the client

```bash
cd client
npm install
```

We can now run the client server:

```bash
grunt --force server --server='http://localhost:5000/api' --ws='ws://localhost:5100'
```

You can now access your local copy at http://localhost:9000 (user: admin, password: admin)

### Docker Install

Use [docker-compose](http://fig.sh "") and the config from `docker` folder or build docker images manually from the [Dockerfile](./Dockerfile).

##### install docker

```sh
$ sudo apt-get install docker.io
```

and make sure you can run [docker without sudo](http://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo).

##### create python virtualenv

```sh
$ sudo apt-get install python-virtualenv
$ virtualenv env
```

##### install docker compose and run app

```sh
$ . env/bin/activate
$ pip install -r docker/requirements.txt
$ ./scripts/docker-local-demo.sh
```

### Testing

How to run the behaviore tests for the syndication feature:

```
cd server
behave --format progress2 --logging-level ERROR features/syndication.feature
```

### Vagrant LXC Installation

#### Setting things up

This will only work on Linux

```
cd /tmp
wget -c https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6_x86_64.deb
sudo dpkg -i vagrant_1.8.6_x86_64.deb
rm vagrant_1.8.6_x86_64.deb
vagrant plugin install vagrant-lxc
```

We need to create the configuration file for the frontend:

```
cd ~/code/liveblog
cp client/config.sample.js client/config.js
```

Start the virtual machine

```
cd ~/code/liveblog
sudo rm -rf client/data client/dist/* client/.tmp server/src
vagrant destroy
vagrant up
vagrant ssh
```

Once in the virtual machine:

```
/opt/liveblog/scripts/vagrant-provision.sh
```

Once the provisioning done whil still in the virtual machine:

```
/opt/liveblog/scripts/vagrant-start-dev.sh
```

### Miscellaneous

**Run liveblog front end in production mode**

```shell
cd client
grunt build --force
grunt connect:build
```

# Dash - For Data Visualization

#### Dash is a Python framework for building analytical web applications. No JavaScript required. This is the framework we intent to use for Visualising Cholera Statistical Data on the Browser.

Build on top of Plotly.js, React, and Flask, Dash ties modern UI elements like dropdowns, sliders, and graphs directly to your analytical python code.

[![CircleCI](https://circleci.com/gh/plotly/dash.svg?style=svg)](https://circleci.com/gh/plotly/dash)

Here’s a 43-line example of a Dash App that ties a Dropdown to a D3.js Plotly Graph.
As the user selects a value in the Dropdown, the application code dynamically
exports data from Google Finance into a Pandas DataFrame. This app was written in just 43 lines of code ([view the source](https://gist.github.com/chriddyp/3d2454905d8f01886d651f207e2419f0)).

![Sample Dash App](https://user-images.githubusercontent.com/1280389/30086128-9bb4a28e-9267-11e7-8fe4-bbac7d53f2b0.gif)

Dash app code is declarative and reactive, which makes it easy to build complex apps that contain many interactive elements. Here’s an example with 5 inputs, 3 outputs, and cross filtering. This app was composed in just 160 lines of code, all of which were Python.

![crossfiltering dash app](https://user-images.githubusercontent.com/1280389/30086123-97c58bde-9267-11e7-98a0-7f626de5199a.gif)

Dash uses [Plotly.js](https://github.com/plotly/plotly.js) for charting. Over 35 chart types are supported, including maps.

 ![Dash app with Mapbox map showing walmart store openings](https://user-images.githubusercontent.com/1280389/30086299-768509d0-9268-11e7-8e6b-626ac9ca512c.gif)
 
Dash isn't just for dashboards. You have full control over the look and feel of your applications. Here's a Dash app that's styled to look like a PDF report.

![goldman sachs report](https://user-images.githubusercontent.com/1280389/30086373-d076a372-9268-11e7-99df-d84fa69f3e20.gif)

To learn more about Dash, read the [extensive announcement letter](https://medium.com/@plotlygraphs/introducing-dash-5ecf7191b503) or [jump in with the user guide](https://plot.ly/dash).

### Documentation

View the [Dash User Guide](https://plot.ly/dash). It's chock-full of examples, pro tips, and guiding principles.

### Licensing

Dash is licensed under MIT.

Plotly offers an enterprise-ready deployment and permissioning server teams that are working with Dash apps behind-the-firewall. [Learn more about Dash On-Premises](https://plot.ly/products/on-premise).

***

![image](https://user-images.githubusercontent.com/1280389/30084008-9fbc68fc-925e-11e7-891c-18a9b8f6ac6b.png)

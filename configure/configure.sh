#!/bin/bash
sudo apt-get update

sudo apt-get install --yes git-core curl build-essential openssl libssl-dev python-pip python-dev python-dev python-m2crypto

curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -

sudo apt-get install --yes nodejs
cd ..
cd ..
git clone https://github.com/gggin/depoly-site-node
cd depoly-site-node
npm install
read -p 'Username: ' uservar
read -sp 'Password: ' passvar
echo -e $uservar'\n'$passvar | node index.js
cd ..
cd site-node
cd configure

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password 123456'

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password 123456'

sudo apt-get install --yes mysql-server mysql-client

sudo pip install cymysql

USERNAME="root"
PASSWORD="123456"
FILENAME="ss.sql"

mysql -u${USERNAME} -p${PASSWORD} < ${FILENAME}

sudo service mysql stop
sudo service mysql start

cd ..
npm install
node doSql.js
cd configure
git clone -b manyuser https://github.com/gggin/shadowsocks.git
cd shadowsocks

cd shadowsocks

sudo printf "#"'!'"/bin/sh -e\nexec 2> /tmp/rc.local.log\nexec 1>&2\nset -x\n\nsh /root/site-node/configure/shadowsocks/shadowsocks/run.sh\nexit 0" > /etc/rc.local

./run.sh


echo "SUCCESS!!"

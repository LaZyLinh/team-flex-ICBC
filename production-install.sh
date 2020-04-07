# this is script for installing ICBC Flex Work. Please read installation instruction for more detail.

echo 'Installing node ...'
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install -y nodejs
echo "node install finished!"
node --version
npm --version

echo "installing dependencies..."
npm install -g forever
cd frontend
npm install
npm run build
cd ../backend
npm install
echo "npm dependencies installed!"

echo "starting services..."
sudo forever start index.js
cd ../frontend
sudo forever start build_server.js
sudo forever list
echo "services started!"


echo "done"



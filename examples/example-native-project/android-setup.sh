# Install brew if not installed
if ! type "brew" > /dev/null; then
  ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)";
fi
brew tap phinze/homebrew-cask && brew install brew-cask
# brew cask install vagrant;
brew cask install virtualbox
brew cask install virtualbox-extension-pack
brew cask install android-platform-tools

# Create a docker-machine as follows
docker-machine create --driver "virtualbox" appium-test-machine

# Enable USB in created docker-machine

docker-machine stop appium-test-machine
vboxmanage modifyvm appium-test-machine --usb on --usbehci on
docker-machine start appium-test-machine


# this command allows the docker commands to be used in the terminal
eval "$(docker-machine env appium-test-machine)"

# USB setup (found in readme, move here soon)

docker-machine ssh appium-test-machine

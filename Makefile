init:
	npm install --save-dev electron

build:
	npm install --save-dev @electron-forge/cli
	npx electron-forge import
	npm run make

env:
	. ./venv/bin/activate

run:
	npm run .
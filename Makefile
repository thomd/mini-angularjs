all: clean main.js

main.js:
	browserify mini-angular.js -o main.js

clean:
	rm main.js

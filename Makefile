all: clean app.js

app.js:
	browserify main.js -o app.js

clean:
	rm app.js

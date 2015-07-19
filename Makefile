.PHONY: build clean publish

clean:
	rm -fr dist/

build: clean
	./node_modules/.bin/babel src/ --out-dir dist/ --no-comments

publish: build
	npm publish

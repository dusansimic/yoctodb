# YoctoDB - very small document based database
> Very much like MongoDB

# Core
The core of this module is a simple library that offers a set of functions to store objects (documents) into a simple database. Those objects can be inserted, queried, updated and deleted. The idea is to make this module as small as possible so it would be easy to run it on very small projects or Node.js apps.

## Contributing
If you would like to contribute you can send pull requests. The request should containt information about your changes and how they are going to make module work better.

## Installation
```bash
npm install --save yoctodb
```
Or
```bash
yarn add yoctodb
```

## Usage
Require YoctoDB into your app and make a db
```javascript
const YoctoDB = require('yoctodb');
const db = new YoctoDB();
```

Insert some data
```javascript
db.insert({foo: 'bar'}).then(docs => {
	console.log('This was inserted!');
	console.log(docs);
}).catch(err => {
	console.error('Could not insert data!');
});
```

Find that data
```javascript
db.find({foo: 'bar'}).then(docs => {
	console.log('This was found!');
	console.log(docs);
}).catch(err => {
	console.error('Nothing was found!');
});
```

Or find all data
```javascript
db.find({}).then(docs => {
	console.log('This was found!');
	console.log(docs);
}).catch(err => {
	console.error('Nothing was found!');
});
```

Update that data
```javascript
db.update({foo: 'bar'}, {foo: 'buzz'}).then(docs => {
	console.log('This was updated!');
	console.log(docs);
}).catch(err => {
	console.error('Nothing was updated!');
});
```

Delete that data
```javascript
db.delete({foo: 'bar'}).then(docs => {
	console.log('Heres whats left!');
	console.log(docs);
}).catch(err => {
	console.error('Nothing was deleted!');
});
```

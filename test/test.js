import test from 'ava';
import YoctoDB from 'this';

test.serial('YoctoDB is a porototype finction', t => {
	t.is(typeof YoctoDB, 'function');
	t.notThrows(() => new YoctoDB());
});

test.serial('Insert test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.is(docs.foo, 'bar');
	}).catch(err => {
		console.error(err);
	}));
});

test.serial('Find test', async t => {
	const db = new YoctoDB();
	let object;
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.is(docs.foo, 'bar');
		object = docs;
	}).catch(err => {
		console.error(err);
	}));

	await t.notThrows(db.find({
		foo: 'bar'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.deepEqual(docs[0], object);
	}).catch(err => {
		console.error(err);
	}));
});

test.serial('Update test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.is(docs.foo, 'bar');
	}).catch(err => {
		console.error(err);
	}));

	await t.notThrows(db.update({
		foo: 'bar'
	}, {
		foo: 'foo'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.is(docs[0].foo, 'foo');
	}).catch(err => {
		console.error(err);
	}));
});

test.serial('Delete test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.is(docs.foo, 'bar');
	}).catch(err => {
		console.error(err);
	}));

	await t.notThrows(db.delete({
		foo: 'bar'
	}).then(docs => {
		t.is(typeof docs, 'object');
		t.deepEqual(docs, [undefined]);
	}).catch(err => {
		console.error(err);
	}));
});

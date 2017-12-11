import test from 'ava';
import YoctoDB from 'this';

test.serial('YoctoDB is a class', t => {
	const db = new YoctoDB();
	t.is(db instanceof constructor, true);
	t.notThrows(() => new YoctoDB());
});

test.serial('Insert test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(docs instanceof Object, true);
		t.is(docs.foo, 'bar');
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));
});

test.serial('Insert many test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert([{foo: 'bar'}, {fizz: 'buzz'}]).then(docs => {
		t.is(Array.isArray(docs), true);
		t.is(docs[0].foo, 'bar');
		t.is(docs[1].fizz, 'buzz');
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));
});

test.serial('Find test', async t => {
	const db = new YoctoDB();
	let object;
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(docs instanceof Object, true);
		t.is(docs.foo, 'bar');
		object = docs;
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));

	await t.notThrows(db.find({
		foo: 'bar'
	}).then(docs => {
		t.is(object instanceof Object, true);
		t.deepEqual(docs[0], object);
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));
});

test.serial('Update test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(docs instanceof Object, true);
		t.is(docs.foo, 'bar');
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));

	await t.notThrows(db.update({
		foo: 'bar'
	}, {
		foo: 'foo'
	}).then(docs => {
		t.is(docs instanceof Object, true);
		t.is(docs[0].foo, 'foo');
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));
});

test.serial('Delete test', async t => {
	const db = new YoctoDB();
	await t.notThrows(db.insert({
		foo: 'bar'
	}).then(docs => {
		t.is(docs instanceof Object, true);
		t.is(docs.foo, 'bar');
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));

	await t.notThrows(db.delete({
		foo: 'bar'
	}).then(docs => {
		t.is(docs instanceof Object, true);
		t.deepEqual(docs, [undefined]);
	}).catch(err => {
		t.is(err instanceof Error, false);
	}));
});

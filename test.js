import test from 'ava';
import 'babel-core/register';
import levelgraph from 'levelgraph';
import setupQuery from './lib';

const db = levelgraph({});
const query = setupQuery(db);

test('input must be String', t => {
  t.throws(() => query(['this is an array']));
});

test('basic query', t => {
  const actual = query('foo-[connection]->bar');
  const expected = [{
    predicate: 'foo',
    subject: 'connection',
    object: 'bar'
  }];

  t.is(actual.length, 1);
  t.same(actual, expected);
});

test('variables', t => {
  const actual = query(':foo-[connection]->:bar');
  const expectedPredicateName = 'foo';
  const expectedSubject = 'connection';
  const expectedObjectName = 'bar';

  t.is(actual.length, 1);
  t.is(actual[0].predicate && actual[0].predicate.name, expectedPredicateName);
  t.is(actual[0].subject, expectedSubject);
  t.is(actual[0].object && actual[0].object.name, expectedObjectName);
});

test('left arrow', t => {
  const actual = query('foo<-[connection]-bar');
  const expected = [{
    predicate: 'bar',
    subject: 'connection',
    object: 'foo'
  }];

  t.is(actual.length, 1);
  t.same(actual, expected);
});

test('double arrows', t => {
  const actual = query('foo<-[connection]->bar');
  const expected = [{
    predicate: 'foo',
    subject: 'connection',
    object: 'bar'
  }, {
    predicate: 'bar',
    subject: 'connection',
    object: 'foo'
  }];

  t.is(actual.length, 2);
  t.same(actual, expected);
});

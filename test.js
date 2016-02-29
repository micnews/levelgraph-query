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
    subject: 'foo',
    predicate: 'connection',
    object: 'bar'
  }];

  t.same(actual, expected);
});

test('variables', t => {
  const actual = query(':foo-[connection]->:bar');
  const expectedSubjectName = 'foo';
  const expectedPredicate = 'connection';
  const expectedObjectName = 'bar';

  t.is(actual.length, 1);
  t.is(actual[0].subject && actual[0].subject.name, expectedSubjectName);
  t.is(actual[0].predicate, expectedPredicate);
  t.is(actual[0].object && actual[0].object.name, expectedObjectName);
});

test('left arrow', t => {
  const actual = query('foo<-[connection]-bar');
  const expected = [{
    subject: 'bar',
    predicate: 'connection',
    object: 'foo'
  }];

  t.same(actual, expected);
});

test('double arrows', t => {
  const actual = query('foo<-[connection]->bar');
  const expected = [{
    subject: 'foo',
    predicate: 'connection',
    object: 'bar'
  }, {
    subject: 'bar',
    predicate: 'connection',
    object: 'foo'
  }];

  t.same(actual, expected);
});

test('multiple', t => {
  const actual = query('foo-[connection1]->bar<-[connection2]-boop');
  const expected = [{
    subject: 'foo',
    predicate: 'connection1',
    object: 'bar'
  }, {
    subject: 'boop',
    predicate: 'connection2',
    object: 'bar'
  }];

  t.same(actual, expected);
});

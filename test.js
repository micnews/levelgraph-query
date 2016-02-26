import test from 'ava';
import 'babel-core/register';
import levelgraph from 'levelgraph';
import setupQuery from './lib';

const db = levelgraph({});
const query = setupQuery(db);

test('input must be array', t => {
  t.throws(() => query('this is not an array'));
});

test('basic query', t => {
  const actual = query(['foo -[connection]-> bar']);
  const expected = [{
    predicate: 'foo',
    subject: 'connection',
    object: 'bar'
  }];

  t.same(actual, expected);
});

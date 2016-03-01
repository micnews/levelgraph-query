import createQuery from 'levelgraph-query';
import levelgraph from 'levelgraph';
import level from 'level';

const db = levelgraph(level('yourdb'));
const query = createQuery(db);

// :subject -> db.v('subject')
// so the query below is translated to
// [{ subject: db.v('subject'), predicate: 'predicate', object: object }]
// so query(...) can be used in db.searchStream and/or db.search
db.searchStream(query(':subject-[predicate]->object'));

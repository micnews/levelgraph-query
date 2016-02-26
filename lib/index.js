import assert from 'assert';

const regex = /^(.+) -\[([^\]]+)\]-> (.+)$/;

const setup = db => {
  const parseNode = node =>
    node[0] === ':' ? db.v(node.slice(1)) : node;

  const parseRow = row => {
    const match = row.match(regex);

    const [predicate, subject, object] = match.slice(1);

    return {
      predicate: parseNode(predicate),
      subject: subject,
      object: parseNode(object)
    };
  };

  return input => {
    assert(Array.isArray(input), 'required: input is array');

    return input.map(row => parseRow(row));
  };
};

module.exports = setup;

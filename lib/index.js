import assert from 'assert';

const regex = /^(.+) -\[([^\]]+)\]-> (.+)$/;

const setup = db => {
  const parseNode = node =>
    node[0] === ':' ? db.v(node.slice(1)) : node;

  return input => {
    assert(typeof input === 'string', 'required: input is a String');

    const match = input.match(regex);

    const [predicate, subject, object] = match.slice(1);

    return [{
      predicate: parseNode(predicate),
      subject: subject,
      object: parseNode(object)
    }];
  };
};

module.exports = setup;

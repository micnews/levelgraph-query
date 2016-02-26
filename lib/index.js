import assert from 'assert';

const regex = /^([^<]+)(<?)-\[([^\]]+)\]-(>?)([^>]+)$/;

const setup = db => {
  const parseNode = node =>
    node[0] === ':' ? db.v(node.slice(1)) : node;

  return input => {
    assert(typeof input === 'string', 'required: input is a String');

    const match = input.match(regex);

    const [var1, leftArrow, subject, rightArrow, var2] = match.slice(1);

    const results = [];

    if (rightArrow) {
      results.push({
        predicate: parseNode(var1),
        subject: subject,
        object: parseNode(var2)
      });
    }

    if (leftArrow) {
      results.push({
        predicate: parseNode(var2),
        subject: subject,
        object: parseNode(var1)
      });
    }

    return results;
  };
};

module.exports = setup;

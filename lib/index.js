import assert from 'assert';

const setup = db => {
  const parseNode = node =>
    node[0] === ':' ? db.v(node.slice(1)) : node;

  return input => {
    assert(typeof input === 'string', 'required: input is a String');

    const results = [];

    let var1 = '';
    while (input[0] !== '<' && input[0] !== '>' && input[0] !== '-') {
      var1 += input[0];
      input = input.slice(1);
    }

    while (input.length) {
      let var2 = '';
      let subject = '';
      let rightArrow = false;
      let leftArrow = false;

      if (input[0] === '<') {
        leftArrow = true;
        input = input.slice(1);
      }

      if (input.slice(0, 2) !== '-[') {
        throw new Error('Badly formatted search query');
      }

      input = input.slice(2);

      while (input[0] !== ']') {
        subject += input[0];
        input = input.slice(1);
      }

      if (input.slice(0, 2) !== ']-') {
        throw new Error('Badly formatted search query');
      }

      input = input.slice(2);

      if (input[0] === '>') {
        rightArrow = true;
        input = input.slice(1);
      }

      while (input[0] && input[0] !== '<' && input[0] !== '>' && input[0] !== '-') {
        var2 += input[0];
        input = input.slice(1);
      }

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
      var1 = var2;
    }

    return results;
  };
};

module.exports = setup;

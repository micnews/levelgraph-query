import assert from 'assert';

const regex = /^(.+) -\[([^\]]+)\]-> (.+)$/;

const parseRow = row => {
  const match = row.match(regex);

  const [predicate, subject, object] = match.slice(1);

  return {
    subject,
    predicate,
    object
  };
};

const setup = db => input => {
  assert(Array.isArray(input), 'required: input is array');

  return input.map(row => parseRow(row));
};

module.exports = setup;

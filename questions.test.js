const assert = require('assert');
const questions = require('./questions');

// Test case 1: Check if the questions array is not empty
assert.ok(questions.length > 0, 'The questions array should not be empty.');

// Test case 2: Check if each question has a question, options, and answer property
questions.forEach((question, index) => {
  assert.ok(question.hasOwnProperty('question'), `Question ${index + 1} should have a 'question' property.`);
  assert.ok(question.hasOwnProperty('options'), `Question ${index + 1} should have an 'options' property.`);
  assert.ok(question.hasOwnProperty('answer'), `Question ${index + 1} should have an 'answer' property.`);
});

// Test case 3: Check if the answer property is a valid index for the options array
questions.forEach((question, index) => {
  assert.ok(question.answer >= 0 && question.answer < question.options.length, `Question ${index + 1} has an invalid answer index.`);
});

console.log('All tests passed!');
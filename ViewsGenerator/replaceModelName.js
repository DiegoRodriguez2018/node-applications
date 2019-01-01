function findAndReplace(originalContent, wordToSearch, wordToReplaceWith) {
    const regex = new RegExp(`${wordToSearch}`, 'g');
    const result = originalContent.replace(regex, wordToReplaceWith);
    return result;
}

const string = "just a test"

console.log(findAndReplace(string, 'test', 'app'));

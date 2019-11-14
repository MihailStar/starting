/* eslint-disable */
// author: Legostaev Vadim (legostaev.vadim@mail.ru)
// license: ISC

function pugbem(tokens) {
  let {
    blockRegExp = /^[a-z]/,

    elementRegExp = /^__/,
    elementSeparator = '__',

    modifierRegExp = /^_(?=[^_])/,
    modifierSeparator = '_',
  } = this;

  let tagLine;
  let tagColumn;
  let classLine;
  let classColumn;
  let blockLine;
  let blocks = [];
  let elementLine;
  let elementValue;
  let modifierLine;

  Object.defineProperty(blocks, 'last', {
    get() {
      if (!this.length) return false;
      return this[this.length - 1];
    },
  });

  tokens.forEach((token) => {
    if (token.type === 'tag') {
      tagLine = token.loc.start.line;
      tagColumn = token.loc.start.column;
    } else if (token.type === 'class') {
      classLine = token.loc.start.line;

      if (classLine === tagLine) classColumn = tagColumn;
      else classColumn = token.loc.start.column;

      if (classLine !== blocks.last.line) {
        blocks.forEach((elem, i, arr) => {
          if (classColumn <= elem.column) {
            arr.length = i;
            return;
          }
        });
      }

      // ----------- if Block -----------
      if (token.val.match(blockRegExp)) {
        if (
          classLine === blockLine ||
          classLine === elementLine ||
          classLine === modifierLine
        )
          return;

        blockLine = classLine;
        blocks.push({ line: blockLine, column: classColumn, val: token.val });
      }

      // ----------- if Element -----------
      else if (token.val.match(elementRegExp)) {
        if (!blocks.length || classLine === elementLine) return;

        elementLine = classLine;

        // ----------- the mix -----------
        if (elementLine === blocks.last.line) {
          for (const iter of [...blocks].reverse()) {
            if (elementLine !== iter.line) {
              token.val = token.val.replace(
                elementRegExp,
                iter.val + elementSeparator,
              );
              break;
            }
          }
        }

        // ----------- the element -----------
        else {
          token.val = token.val.replace(
            elementRegExp,
            blocks.last.val + elementSeparator,
          );
        }

        elementValue = token.val;
      }

      // ----------- if Modifier -----------
      else if (token.val.match(modifierRegExp)) {
        if (!blocks.length) return;

        modifierLine = classLine;

        if (classLine === elementLine) {
          if (blocks.length === 1 && elementLine === blocks.last.line) return;
          token.val = token.val.replace(
            modifierRegExp,
            elementValue + modifierSeparator,
          );
        } else if (classLine === blocks.last.line) {
          token.val = token.val.replace(
            modifierRegExp,
            blocks.last.val + modifierSeparator,
          );
        }
      }
    }
  });

  return tokens;
}

export default {
  postLex: pugbem,
};

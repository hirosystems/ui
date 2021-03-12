const is = require('unist-util-is');
const visit = require('unist-util-visit');

const sigils = {
  '=>': 'success',
  '->': 'info',
  '~>': 'warning',
  '!>': 'danger',
};

module.exports = function paragraphCustomAlertsPlugin() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (pNode, _, parent) => {
      visit(pNode, 'text', textNode => {
        Object.keys(sigils).forEach(sigil => {
          if (textNode.value.startsWith(`${sigil} `)) {
            // Remove the literal sigil symbol from string contents
            textNode.value = textNode.value.replace(`${sigil} `, '');

            // Wrap matched nodes with <div> (containing proper attributes)
            parent.children = parent.children.map(node => {
              return is(pNode, node)
                ? {
                    type: 'wrapper',
                    children: [node],
                    data: {
                      hName: 'blockquote',
                      hProperties: {
                        className: ['alert', `alert-${sigils[sigil]}`],
                        role: 'alert',
                      },
                    },
                  }
                : node;
            });
          }
        });
      });
    });
  };
};

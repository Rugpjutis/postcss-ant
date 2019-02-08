import postcss from 'postcss'

// This wrapper makes adding rules and rulesets a bit easier to declare/read.

// Usage:
// ruleSetter('.foo', ['width: 100px', 'height: 200px'], decl)

export default (selector, rules, decl, next) => {
  // Creates .selector:nth-child(3n + 1) ... (3n + 2) ... (3n + 3) ... rules.
  // We typically add  these before so the user can override generate-grid easily if need be.
  // But offer a next param for explicitly placing these in an intuitive place.
  if (next !== undefined) {
    var add = postcss.rule({
      selector: selector
    });
    decl.parent.parent.insertAfter(decl.parent, add);

    rules.map(rule => {
      const propVal = rule.split(':')

      decl.parent.next().append(
        decl.clone({
          prop: propVal[0].trim(),
          value: propVal[1].trim()
        })
      );
    })
  } else {
    var add = postcss.rule({
      selector: selector
    });
    decl.parent.parent.insertBefore(decl.parent, add);

    rules.map(rule => {
      const propVal = rule.split(':')
      decl.parent.prev().append(
        decl.clone({
          prop: propVal[0].trim(),
          value: propVal[1].trim()
        })
      );
    })
  }
}

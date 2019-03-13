# 👾 Konami Code

`1 KB` Konami Code, bundled for modern browsers.

## Usage

This library listens for one thing, and one thing only—[The Konami Code][konami-code].

<kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd>
<kbd>←</kbd> <kbd>→</kbd> <kbd>B</kbd> <kbd>A</kbd> <kbd>return</kbd>

This flavor of the Konami Code uses [Promises][mdn-promise], so a polyfill
may be required to make it work in older browsers (not provided).

### Install

```bash
npm i --save @manifoldco/konami
```

### One-time usage

This will fire once, then stop listening for subsequent inputs.

```js
import konamiCode from '@manifoldco/konami';

konamiCode().then(() => alert('👾 Konami Code successfully entered!'));
```

### Recursive usage

This will fire every time the code is successfully input, and continue
listening:

```js
import konamiCode from '@manifoldco/konami';

function setUpKonamiCode() {
  konamiCode().then(() => {
    alert('👾 Konami Code successfully entered!');
    setUpKonamiCode();
  });
}

setUpKonamiCode();
```

### Recursive async/await

[Async/await][mdn-async] may also be used (browser polyfill not included).

```js
import konamiCode from '@manifoldco/konami';

async function setUpKonamiCode() {
  await konamiCode();
  alert('👾 Konami Code successfully entered!');
  setUpKonamiCode();
}

setUpKonamiCode();
```

## Options

| Name     |   Type    | Default | Description                                                                                                                                      |
| :------- | :-------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `delay`  | `number`  | `2000`  | Time, in milliseconds, to allow between each keypress                                                                                            |
| `return` | `boolean` | `true`  | Should the <kbd>return</kbd> key be required at the end?                                                                                         |
| `reject` | `boolean` | `false` | Should it `reject` the promise if user failed to input correctly? _Note: you’ll have to call `konamiCode()` again if you want to keep listening_ |

### Example

```js
import konamiCode from '@manifoldco/konami';

const options = {
  delay: 200,
  reject: true,
};

konamiCode(options)
  .then(() => alert('👾 Konami Code successfully entered!'))
  .catch(() => alert('👹 Too slow! You should have entered the code faster!'));

// Note: without reject: true, the function normally will never .catch()
```

[konami-code]: https://en.wikipedia.org/wiki/Konami_Code
[mdn-async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

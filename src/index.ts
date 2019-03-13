/* Constants */

const RETURN = 13;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const A = 65;
const B = 66;

const KONAMI_CODE = [
  UP,
  UP,
  DOWN,
  DOWN,
  LEFT,
  RIGHT,
  LEFT,
  RIGHT,
  B,
  A,
  RETURN,
];
const KONAMI_CODE_LENGTH = KONAMI_CODE.length;
const KONAMI_CODE_NO_RETURN = KONAMI_CODE_LENGTH - 1;

/* Settings */

interface Options {
  delay?: Number;
  reject?: Boolean;
  return?: Boolean;
}

const DEFAULT_OPTIONS = {
  delay: 2000, // time between keystrokes allowed
  return: true, // is return needed at the end?
  reject: false, // should promise reject if incorrect code supplied?
};

/* Main */

interface State {
  keysPressed: number[];
}

function konamiCode(options: Options = {}): Promise<void> {
  let userOptions = DEFAULT_OPTIONS;
  let keypressTimer: number;

  // Set options
  if (typeof options.delay === 'number') userOptions.delay = options.delay;
  if (typeof options.reject === 'boolean') userOptions.reject = options.reject;
  if (typeof options.return === 'boolean') userOptions.return = options.return;

  let state: State = { keysPressed: [] };

  function setState(nextState: State) {
    state = { ...state, ...nextState };
  }

  return new Promise((resolve, reject) => {
    document.addEventListener('keydown', addKey);

    function reset() {
      setState({ keysPressed: [] });
      if (userOptions.reject === true) reject();
    }

    function addKey(e: KeyboardEvent) {
      const nextCorrectKey = KONAMI_CODE[state.keysPressed.length];

      // 1. If the sequence is broken, clear the input
      if (e.keyCode !== nextCorrectKey) {
        reset();
        return;
      }

      // 2. Otherwise, the next correct key was pressed. Add it to the series.
      setState({
        keysPressed: [...state.keysPressed, nextCorrectKey],
      });

      // 3. Restart the timer
      clearTimeout(keypressTimer);
      keypressTimer = setTimeout(() => reset(), userOptions.delay);

      // 4. Check if the sequence is complete
      const isComplete =
        userOptions.return === true &&
        state.keysPressed.length === KONAMI_CODE_LENGTH;
      const isCompleteWithoutReturn =
        userOptions.return === false &&
        state.keysPressed.length === KONAMI_CODE_NO_RETURN;

      // 5. If complete, fire success event & teardown. Otherwise, do nothing.
      if (isComplete || isCompleteWithoutReturn) {
        document.removeEventListener('keydown', addKey);
        resolve();
      }
    }
  });
}

export default konamiCode;

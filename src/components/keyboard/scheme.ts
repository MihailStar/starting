type Language = 'en' | 'ru';

type ControlKey =
  | 'canCapsLock'
  | 'switchAlt'
  | 'switchCapsLock'
  | 'switchControl'
  | 'switchLanguage'
  | 'switchShift';

type Modifier =
  | 'alt-left'
  | 'alt-right'
  | 'backspace'
  | 'caps-lock'
  | 'control-left'
  | 'control-right'
  | 'delete'
  | 'enter'
  | 'language'
  | 'shift-left'
  | 'shift-right'
  | 'space'
  | 'tab';

type Button = {
  chars: [string] | [string, string];
  keys: [string] | [string, string];
  controlKeys?: ControlKey[];
  modifiers?: Modifier[];
};

type Scheme = {
  [Key in Language]: Button[][];
};

// prettier-ignore
const scheme: Scheme = {
  en: [
    [
      { chars: ['⎋'], keys: ['Escape'] },
      { chars: ['`', '~'], keys: ['`', '~'] },
      { chars: ['1', '!'], keys: ['1', '!'] },
      { chars: ['2', '@'], keys: ['2', '@'] },
      { chars: ['3', '#'], keys: ['3', '#'] },
      { chars: ['4', '$'], keys: ['4', '$'] },
      { chars: ['5', '%'], keys: ['5', '%'] },
      { chars: ['6', '^'], keys: ['6', '^'] },
      { chars: ['7', '&'], keys: ['7', '&'] },
      { chars: ['8', '*'], keys: ['8', '*'] },
      { chars: ['9', '('], keys: ['9', '('] },
      { chars: ['0', ')'], keys: ['0', ')'] },
      { chars: ['-', '_'], keys: ['-', '_'] },
      { chars: ['=', '+'], keys: ['=', '+'] },
      { chars: ['⌫'], keys: ['Backspace'], modifiers: ['backspace'] },
    ],
    [
      { chars: ['⇥'], keys: ['Tab'], modifiers: ['tab'] },
      { chars: ['q', 'Q'], keys: ['q', 'Q'], controlKeys: ['canCapsLock'] },
      { chars: ['w', 'W'], keys: ['w', 'W'], controlKeys: ['canCapsLock'] },
      { chars: ['e', 'E'], keys: ['e', 'E'], controlKeys: ['canCapsLock'] },
      { chars: ['r', 'R'], keys: ['r', 'R'], controlKeys: ['canCapsLock'] },
      { chars: ['t', 'T'], keys: ['t', 'T'], controlKeys: ['canCapsLock'] },
      { chars: ['y', 'Y'], keys: ['y', 'Y'], controlKeys: ['canCapsLock'] },
      { chars: ['u', 'U'], keys: ['u', 'U'], controlKeys: ['canCapsLock'] },
      { chars: ['i', 'I'], keys: ['i', 'I'], controlKeys: ['canCapsLock'] },
      { chars: ['o', 'O'], keys: ['o', 'O'], controlKeys: ['canCapsLock'] },
      { chars: ['p', 'P'], keys: ['p', 'P'], controlKeys: ['canCapsLock'] },
      { chars: ['[', '{'], keys: ['[', '{'] },
      { chars: [']', '}'], keys: [']', '}'] },
      { chars: ['\\', '|'], keys: ['\\', '|'] },
      { chars: ['⌦'], keys: ['Delete'], modifiers: ['delete'] },
    ],
    [
      { chars: ['⇪'], keys: ['CapsLock'], controlKeys: ['switchCapsLock'], modifiers: ['caps-lock'] },
      { chars: ['a', 'A'], keys: ['a', 'A'], controlKeys: ['canCapsLock'] },
      { chars: ['s', 'S'], keys: ['s', 'S'], controlKeys: ['canCapsLock'] },
      { chars: ['d', 'D'], keys: ['d', 'D'], controlKeys: ['canCapsLock'] },
      { chars: ['f', 'F'], keys: ['f', 'F'], controlKeys: ['canCapsLock'] },
      { chars: ['g', 'G'], keys: ['g', 'G'], controlKeys: ['canCapsLock'] },
      { chars: ['h', 'H'], keys: ['h', 'H'], controlKeys: ['canCapsLock'] },
      { chars: ['j', 'J'], keys: ['j', 'J'], controlKeys: ['canCapsLock'] },
      { chars: ['k', 'K'], keys: ['k', 'K'], controlKeys: ['canCapsLock'] },
      { chars: ['l', 'L'], keys: ['l', 'L'], controlKeys: ['canCapsLock'] },
      { chars: [';', ':'], keys: [';', ':'] },
      { chars: ["'", '"'], keys: ["'", '"'] },
      { chars: ['↵'], keys: ['Enter'], modifiers: ['enter'] },
    ],
    [
      { chars: ['⇧'], keys: ['Shift'], controlKeys: ['switchShift'], modifiers: ['shift-left'] },
      { chars: ['z', 'Z'], keys: ['z', 'Z'], controlKeys: ['canCapsLock'] },
      { chars: ['x', 'X'], keys: ['x', 'X'], controlKeys: ['canCapsLock'] },
      { chars: ['c', 'C'], keys: ['c', 'C'], controlKeys: ['canCapsLock'] },
      { chars: ['v', 'V'], keys: ['v', 'V'], controlKeys: ['canCapsLock'] },
      { chars: ['b', 'B'], keys: ['b', 'B'], controlKeys: ['canCapsLock'] },
      { chars: ['n', 'N'], keys: ['n', 'N'], controlKeys: ['canCapsLock'] },
      { chars: ['m', 'M'], keys: ['m', 'M'], controlKeys: ['canCapsLock'] },
      { chars: [',', '<'], keys: [',', '<'] },
      { chars: ['.', '>'], keys: ['.', '>'] },
      { chars: ['/', '?'], keys: ['/', '?'] },
      { chars: ['↑'], keys: ['ArrowUp'] },
      { chars: ['⇧'], keys: ['Shift'], controlKeys: ['switchShift'], modifiers: ['shift-right'] },
    ],
    [
      { chars: ['⌃'], keys: ['Control'], controlKeys: ['switchControl'], modifiers: ['control-left'] },
      { chars: [''], keys: [''] },
      { chars: [''], keys: [''] },
      { chars: ['⌥'], keys: ['Alt'], controlKeys: ['switchAlt'], modifiers: ['alt-left'] },
      { chars: [' '], keys: [' '], modifiers: ['space'] },
      { chars: ['⌥'], keys: ['Alt'], controlKeys: ['switchAlt'], modifiers: ['alt-right'] },
      { chars: ['⌃'], keys: ['Control'], controlKeys: ['switchControl'], modifiers: ['control-right'] },
      { chars: ['←'], keys: ['ArrowLeft'] },
      { chars: ['↓'], keys: ['ArrowDown'] },
      { chars: ['→'], keys: ['ArrowRight'] },
      { chars: ['ru'], keys: ['Language'], controlKeys: ['switchLanguage'], modifiers: ['language'] },
    ],
  ],
  ru: [
    [
      { chars: ['⎋'], keys: ['Escape'] },
      { chars: ['ё', 'Ё'], keys: ['ё', 'Ё'], controlKeys: ['canCapsLock'] },
      { chars: ['1', '!'], keys: ['1', '!'] },
      { chars: ['2', '"'], keys: ['2', '"'] },
      { chars: ['3', '№'], keys: ['3', '№'] },
      { chars: ['4', ';'], keys: ['4', ';'] },
      { chars: ['5', '%'], keys: ['5', '%'] },
      { chars: ['6', ':'], keys: ['6', ':'] },
      { chars: ['7', '?'], keys: ['7', '?'] },
      { chars: ['8', '*'], keys: ['8', '*'] },
      { chars: ['9', '('], keys: ['9', '('] },
      { chars: ['0', ')'], keys: ['0', ')'] },
      { chars: ['-', '_'], keys: ['-', '_'] },
      { chars: ['=', '+'], keys: ['=', '+'] },
      { chars: ['⌫'], keys: ['Backspace'], modifiers: ['backspace'] },
    ],
    [
      { chars: ['⇥'], keys: ['Tab'], modifiers: ['tab'] },
      { chars: ['й', 'Й'], keys: ['й', 'Й'], controlKeys: ['canCapsLock'] },
      { chars: ['ц', 'Ц'], keys: ['ц', 'Ц'], controlKeys: ['canCapsLock'] },
      { chars: ['у', 'У'], keys: ['у', 'У'], controlKeys: ['canCapsLock'] },
      { chars: ['к', 'К'], keys: ['к', 'К'], controlKeys: ['canCapsLock'] },
      { chars: ['е', 'Е'], keys: ['е', 'Е'], controlKeys: ['canCapsLock'] },
      { chars: ['н', 'Н'], keys: ['н', 'Н'], controlKeys: ['canCapsLock'] },
      { chars: ['г', 'Г'], keys: ['г', 'Г'], controlKeys: ['canCapsLock'] },
      { chars: ['ш', 'Ш'], keys: ['ш', 'Ш'], controlKeys: ['canCapsLock'] },
      { chars: ['щ', 'Щ'], keys: ['щ', 'Щ'], controlKeys: ['canCapsLock'] },
      { chars: ['з', 'З'], keys: ['з', 'З'], controlKeys: ['canCapsLock'] },
      { chars: ['х', 'Х'], keys: ['х', 'Х'], controlKeys: ['canCapsLock'] },
      { chars: ['ъ', 'Ъ'], keys: ['ъ', 'Ъ'], controlKeys: ['canCapsLock'] },
      { chars: ['\\', '/'], keys: ['\\', '/'] },
      { chars: ['⌦'], keys: ['Delete'], modifiers: ['delete'] },
    ],
    [
      { chars: ['⇪'], keys: ['CapsLock'], controlKeys: ['switchCapsLock'], modifiers: ['caps-lock'] },
      { chars: ['ф', 'Ф'], keys: ['ф', 'Ф'], controlKeys: ['canCapsLock'] },
      { chars: ['ы', 'Ы'], keys: ['ы', 'Ы'], controlKeys: ['canCapsLock'] },
      { chars: ['в', 'В'], keys: ['в', 'В'], controlKeys: ['canCapsLock'] },
      { chars: ['а', 'А'], keys: ['а', 'А'], controlKeys: ['canCapsLock'] },
      { chars: ['п', 'П'], keys: ['п', 'П'], controlKeys: ['canCapsLock'] },
      { chars: ['р', 'Р'], keys: ['р', 'Р'], controlKeys: ['canCapsLock'] },
      { chars: ['о', 'О'], keys: ['о', 'О'], controlKeys: ['canCapsLock'] },
      { chars: ['л', 'Л'], keys: ['л', 'Л'], controlKeys: ['canCapsLock'] },
      { chars: ['д', 'Д'], keys: ['д', 'Д'], controlKeys: ['canCapsLock'] },
      { chars: ['ж', 'Ж'], keys: ['ж', 'Ж'], controlKeys: ['canCapsLock'] },
      { chars: ['э', 'Э'], keys: ['э', 'Э'], controlKeys: ['canCapsLock'] },
      { chars: ['↵'], keys: ['Enter'], modifiers: ['enter'] },
    ],
    [
      { chars: ['⇧'], keys: ['Shift'], controlKeys: ['switchShift'], modifiers: ['shift-left'] },
      { chars: ['я', 'Я'], keys: ['я', 'Я'], controlKeys: ['canCapsLock'] },
      { chars: ['ч', 'Ч'], keys: ['ч', 'Ч'], controlKeys: ['canCapsLock'] },
      { chars: ['с', 'С'], keys: ['с', 'С'], controlKeys: ['canCapsLock'] },
      { chars: ['м', 'М'], keys: ['м', 'М'], controlKeys: ['canCapsLock'] },
      { chars: ['и', 'И'], keys: ['и', 'И'], controlKeys: ['canCapsLock'] },
      { chars: ['т', 'Т'], keys: ['т', 'Т'], controlKeys: ['canCapsLock'] },
      { chars: ['ь', 'Ь'], keys: ['ь', 'Ь'], controlKeys: ['canCapsLock'] },
      { chars: ['б', 'Б'], keys: ['б', 'Б'], controlKeys: ['canCapsLock'] },
      { chars: ['ю', 'Ю'], keys: ['ю', 'Ю'], controlKeys: ['canCapsLock'] },
      { chars: ['.', ','], keys: ['.', ','] },
      { chars: ['↑'], keys: ['ArrowUp'] },
      { chars: ['⇧'], keys: ['Shift'], controlKeys: ['switchShift'], modifiers: ['shift-right'] },
    ],
    [
      { chars: ['⌃'], keys: ['Control'], controlKeys: ['switchControl'], modifiers: ['control-left'] },
      { chars: [''], keys: [''] },
      { chars: [''], keys: [''] },
      { chars: ['⌥'], keys: ['Alt'], controlKeys: ['switchAlt'], modifiers: ['alt-left'] },
      { chars: [' '], keys: [' '], modifiers: ['space'] },
      { chars: ['⌥'], keys: ['Alt'], controlKeys: ['switchAlt'], modifiers: ['alt-right'] },
      { chars: ['⌃'], keys: ['Control'], controlKeys: ['switchControl'], modifiers: ['control-right'] },
      { chars: ['←'], keys: ['ArrowLeft'] },
      { chars: ['↓'], keys: ['ArrowDown'] },
      { chars: ['→'], keys: ['ArrowRight'] },
      { chars: ['en'], keys: ['Language'], controlKeys: ['switchLanguage'], modifiers: ['language'] },
    ],
  ],
};

export type { Language, ControlKey, Modifier };
export { scheme };

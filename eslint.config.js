import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

export default [
  {
    ignores: ['dist/**/*']
  },
  {
    files: ['firestore.rules'],
    plugins: {
      'firebase-security-rules': firebaseRulesPlugin
    }
  },
  ...firebaseRulesPlugin.configs['flat/recommended']
];

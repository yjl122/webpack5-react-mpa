module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
				"react-hooks"
    ],
		// 0是忽略，1是警告，2是报错
    "rules": {
			"quotes": 2,                        // 非双引号报错
			"semi": 1,                          // 无分号就警告
			"no-console": 0,                    // 有console.log就警告
			"space-before-function-paren": 0    // 函数前空格忽略
    }
}

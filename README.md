# leetcph Extension

A visual studio code extension for leetcode. This powerful extension streamlines your LeetCode experience by allowing you to effortlessly fetch problem details and run multiple test cases all within the convenience of Visual Studio Code.

## Features

- **Fetch Test Cases**: Fetch input and output test cases from a LeetCode problem URL.
- **Create Solution File**: Create a C++ or Python file with a basic template to start solving the problem.
- **Run Test Cases**: Run your solution against the fetched test cases and compare the results.

## Installation

- `open vs code -> go to search extension -> search leetcph ->install extension`
 But this only works when all the dependencied have been already installed
- `open github https://github.com/MoulikBansal/leetcph , then clone the repo , then start debugging and then run the commands`

### Fetch Test Cases

Use the command `CPH: Fetch Test Cases` to fetch test cases from a LeetCode problem URL. You will be prompted to enter the URL and select the file type (C++ or Python).

### Create Solution File

A solution file (`solution.cpp` or `solution.py`) will be created in your workspace with a basic template.

### Run Test Cases

Use the command `CPH: Run Test Cases` to run your solution against the fetched test cases. The results will be compared with the expected output, and you will see a `PASSED` or `FAILED` message.
If the message is `FAILED` then it also shows the wrong output and the expected output.

## Requirements

- Ensure the langauage you are coding in (Python or C++) is installed in your system.
- Ensure that npm is installed in your system.
- Install puppereer in your system by `npm install puppeteer`

## Extension Settings

This extension does not add any VS Code settings.

## Usage

1. Open a folder in VS Code where you want to save the test cases and solution files.
2. Use the command `CPH: Fetch Test Cases` to fetch test cases from a LeetCode problem URL.
3. Write your solution in the created `solution.cpp` or `solution.py` file.
4. Use the command `CPH: Run Test Cases` to run your solution against the fetched test cases.

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Run `CPH: Fetch Test Cases`.
3. Enter the LeetCode problem URL (e.g., `https://leetcode.com/problems/roman-to-integer/description/`).
4. Select the file type (C++ or Python).
5. Write your solution in the created `solution.cpp` or `solution.py` file.
6. Run `CPH: Run Test Cases` to test your solution.

## Future enhancements

1. Automated input size addition for better user workflow.
2. Add support for more languages.

## Contributing

If you have any suggestions or improvements, feel free to create an issue or submit a pull request.

## License
This extension is licensed under the [MIT License](LICENSE).
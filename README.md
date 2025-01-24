# leetcph Extension

A visual studio code extension for leetcode. This powerful extension streamlines your LeetCode experience by allowing you to effortlessly fetch problem details and run multiple test cases all within the convenience of Visual Studio Code.

## Features

- **Fetch Test Cases**: Fetch input and output test cases from a LeetCode problem URL.
- **Create Solution File**: Create a C++ or Python file with a basic template to start solving the problem.
- **Run Test Cases**: Run your solution against the fetched test cases and compare the results.

## Installation

- Option 1: Install from VS Code Marketplace: 
`open vs code -> go to extensions view -> search for leetcph ->install the extension`
 
    But this only works when all the dependencied(for creating an extension) have been already installed on your device
- Option 2: Install from GitHub:
 If the first method doesn't work do the following


    git clone https://github.com/MoulikBansal/leetcph

### Fetch Test Cases

Use the command `CPH: Fetch Test Cases` to fetch test cases from a LeetCode problem URL. You will be prompted to enter the URL and select the file type (C++ or Python).

### Create Solution File

A solution file (`solution.cpp` or `solution.py`) will be created in your workspace with a basic template.

### Run Test Cases

Use the command `CPH: Run Test Cases` to run your solution against the fetched test cases. The results will be compared with the expected output, and you will see a `PASSED` or `FAILED` message.
If the message is `FAILED` then it also shows the wrong output and the expected output.

## Requirements

- Ensure the langauage you are coding in (Python or C++) is installed in your system.

### If you are downloading from vs code extension view
- Ensure that npm is installed in your system
- Install puppereer in your system by `npm install puppeteer`

## Extension Settings

This extension does not add any VS Code settings.

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Run `CPH: Fetch Test Cases`.
3. Enter the LeetCode problem URL (e.g., `https://leetcode.com/problems/roman-to-integer/description/`).
4. Select the file type (C++ or Python).
5. Write your solution in the created `solution.cpp` or `solution.py` file.
6. Run `CPH: Run Test Cases` and select the file type to test your solution.

## Future enhancements
1. Fix issue of extension downloaded directly from vs code doesn't work on all devices.
2. Automated input size addition(for vectors) for better user workflow.
3. Add support for more languages.

## Contributing

If you have any suggestions or improvements, feel free to create an issue or submit a pull request.

## License
This extension is licensed under the [MIT License](LICENSE).
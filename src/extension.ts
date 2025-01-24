import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import * as vscode from 'vscode';
import path from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "leetcph" is now active!');

    const fetchTestCasesCommand = vscode.commands.registerCommand('leetcph.fetchTestCases', async () => {
        const url = await vscode.window.showInputBox({
            prompt: 'Enter the LeetCode problem URL',
            placeHolder: 'https://leetcode.com/problems/roman-to-integer/description/',
        });

        if (!url) {
            vscode.window.showErrorMessage('No URL provided.');
            return;
        }

        const fileType = await vscode.window.showQuickPick(['C++', 'Python'], {
            placeHolder: 'Select the file type to create',
        });

        if (!fileType) {
            vscode.window.showErrorMessage('No file type selected.');
            return;
        }

        try {
            await fetchAndSaveTestCases(url);
            await createFile(fileType);
            vscode.window.showInformationMessage('Test cases fetched and saved successfully!');
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Failed to fetch test cases.');
        }
    });

    context.subscriptions.push(fetchTestCasesCommand);

    const runTestCasesCommand = vscode.commands.registerCommand('leetcph.runTestCases', async () => {
        const dirPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!dirPath) {
            vscode.window.showErrorMessage("Please open a folder in VS Code");
            return;
        }

        const fileType = await vscode.window.showQuickPick(['C++', 'Python'], {
            placeHolder: 'Select the file type to run',
        });

        if (!fileType) {
            vscode.window.showErrorMessage('No file type selected.');
            return;
        }

        try {
            const inputFilePath = path.join(dirPath, 'input.txt');
            const outputFilePath = path.join(dirPath, 'output.txt');
            const input = await fs.readFile(inputFilePath, 'utf8');
            const expectedOutput = await fs.readFile(outputFilePath, 'utf8');

            let command: string;
            if (fileType === 'C++') {
                if (process.platform === 'win32') {
                    command = `g++ -std=c++17 -o solution solution.cpp && solution < input.txt`;
                }
                else{// Added -Wall flag for warning messages
                    command = `g++ -std=c++17 -Wall -o solution solution.cpp && ./solution < input.txt`;
                }
            } 
            else if (fileType === 'Python') {
                if (process.platform === 'win32'){
                    command = `python solution.py < input.txt`;
                }
                else{
                    command = `python3 solution.py < input.txt`;
                }
            } 
            else {
                vscode.window.showErrorMessage('Unsupported file type.');
                return;
            }

            exec(command, { cwd: dirPath }, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Error: ${stderr}`);
                    return;
                }


                /////
                // const result = stdout.trim();
                // const expectedLines = expectedOutput.trim().split('\n');
                //     const resultLines = result.split('\n');

                //     let passed = true;
                //     let message = '';

                //     for (let i = 0; i < expectedLines.length; i++) {
                //         if (expectedLines[i] !== resultLines[i]) {
                //             passed = false;
                //             message += `Line ${i + 1}:\nExpected: ${expectedLines[i]}\nGot: ${resultLines[i]}\n\n`;
                //         }
                //     }

                //     if (passed) {
                //         vscode.window.showInformationMessage('PASSED');
                //     } else {
                //         vscode.window.showErrorMessage(`FAILED\n${message}`);
                //     }
                /////

                const result = stdout.trim();
                if (result === expectedOutput.trim()) {
                    vscode.window.showInformationMessage('PASSED');
                } else {
                    vscode.window.showErrorMessage(`FAILED\nExpected: ${expectedOutput}\nGot: ${result}`);
                }
            });
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Failed to run test cases.');
        }
    });

    context.subscriptions.push(runTestCasesCommand);
}

async function createFile(fileType: string) {
    const dirPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!dirPath) {
        vscode.window.showErrorMessage("Please open a folder in VS Code");
        return;
    }

    let filePath: string = '';
    let fileContent: string = '';

    if (fileType === 'C++') {
        filePath = path.join(dirPath, 'solution.cpp');
        fileContent = `#include<bits/stdc++.h>
using namespace std;

// Your solution class/function goes here
class Solution {
public:
    // Add your solution method here
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    Solution sol;
    int t ;
    cin>>t ;
    while(t--){
    }
    return 0;
}`;
    } else if (fileType === 'Python') {
        filePath = path.join(dirPath, 'solution.py');
        fileContent = `import sys
from typing import List
class Solution:
    def your_method(self, nums: List[int]) -> int:
        # Add your solution here
        pass

def main():
    # Create solution instance
    input = sys.stdin.read
    data = input().splitlines()
    
    # Process each test case
    sol = Solution()
    t = int(data[0])
    for i in range(1, t + 1):
        s = data[i]

if __name__ == "__main__":
    main()`;
    }

    if (filePath && fileContent) {
        await fs.writeFile(filePath, fileContent, 'utf8');
        console.log(`${fileType} file created at ${filePath}`);
    }
}

async function fetchAndSaveTestCases(url: string) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".elfjS", { timeout: 5000 });

        const content = await page.evaluate(() => {
            const element = document.querySelector(".elfjS");
            return (element as HTMLElement) ? (element as HTMLElement).innerText : "Element not found";
        });

        console.log("Content of .elfjS:", content);

        const inputRegex = /Input:\s*(.*?)(?=Output:|$)/gs;
        const outputRegex = /Output:\s*(.*?)(?=Explanation:|Example|Constraints:|$)/gs;

        const inputs: string[] = [];
        const outputs: string[] = [];

        let match;
        while ((match = inputRegex.exec(content)) !== null) {
            inputs.push(saaf_safai(match[1].trim()));
        }

        while ((match = outputRegex.exec(content)) !== null) {
            outputs.push(saaf_safai(match[1].trim()));
        }

        if (inputs.length === 0 || outputs.length === 0) {
            throw new Error("Failed to extract inputs or outputs");
        }

        const dirPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!dirPath) {
            vscode.window.showErrorMessage("Please open a folder in VS Code");
            return;
        }

        const inputFilePath = path.join(dirPath, 'input.txt');
        const outputFilePath = path.join(dirPath, 'output.txt');
        
        await fs.writeFile(inputFilePath, `${inputs.length}\n${inputs.join('\n')}`, 'utf8');
        console.log(`inputs size: ${inputs.length}`);
        
        // await fs.writeFile(inputFilePath, inputs.join('\n'), 'utf8');
        await fs.writeFile(outputFilePath, outputs.join('\n'), 'utf8');

        console.log("Test cases saved successfully");
    } catch (error) {
        console.error("Error fetching test cases:", error);
        throw error;
    } finally {
        await browser.close();
    }
}

///
function saaf_safai(rawData: string): string {
    let ans = rawData
      .split(/\b[a-zA-Z_0-9]+\s*=\s*/) 
      .filter(part => part.trim() !== "") 
      .map(part => part.trim()) 
      .map(part => part
        .replace(/"/g, '') 
        .replace(/[\[\]]/g, '') 
        .replace(/,/g, ' ') 
      )
      .join('\n');
    return ans;
}

///

export function deactivate() {}
# qrportal
![npm badge](https://img.shields.io/npm/v/qrportal?style=flat-square)
![issues badge](https://img.shields.io/github/issues/keesvv/qrportal?style=flat-square)

🔮 Terminal utility for generating QR codes for files/folders.

# Installation
Type `npm install -g qrportal` and you're done. For Yarn users: `yarn global add qrportal`.

# Syntax
`qrportal <filename>` &mdash; transfer a single file

`qrportal <dirname>` &mdash; transfer a folder

`qrportal <file1> <file2> [...]` &mdash; transfer multiple inputs

### Quick example
`qrportal image.jpg note.txt node_modules` will transfer two files and one folder

A QR code will be displayed in the Terminal window which you can scan using your phone.

# License
This project is licensed under a MIT license.


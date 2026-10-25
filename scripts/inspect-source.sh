#!/usr/bin/env bash
set -eu
if [ "$#" -ne 1 ]; then echo 'Usage: npm run inspect:source -- "/private/path/source.pdf"' >&2; exit 1; fi
if [ "$(uname)" != Darwin ]; then echo 'This optional local OCR helper requires macOS Apple Vision and Xcode Command Line Tools.' >&2; exit 1; fi
mkdir -p .local/source-pages
clang -fobjc-arc -fno-modules -framework Foundation -framework PDFKit -framework AppKit -framework Vision scripts/inspect-source.m -o .local/ocr
.local/ocr "$1" .local/ocr.json
